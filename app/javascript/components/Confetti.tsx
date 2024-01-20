import React, { useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";

export type Particle = {
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleY: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
};

export type ConfettiProps = {
  amount?: number;
  respawn?: boolean;
  colors?: string[];
  drag?: number;
  gravity?: number;
  sway?: number;
  flutter?: number;
  rotate?: boolean;
  extendGenerateParticle?: (
    particle: Particle,
    context: CanvasRenderingContext2D
  ) => Particle;
  renderParticle?: (
    particle: Particle,
    context: CanvasRenderingContext2D
  ) => void;
  resizeDebounceTimeout?: number;
  className?: string;
};

function Confetti({
  amount = 100,
  respawn = true,
  colors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "white",
  ],
  drag = 0.05,
  gravity = 0.01,
  sway = 1,
  flutter = 0.1,
  rotate = true,
  extendGenerateParticle,
  renderParticle,
  resizeDebounceTimeout = 250,
  className,
  ...rest
}: ConfettiProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particles = useRef<Particle[]>([]);

  const generateParticle = React.useCallback(
    (context: CanvasRenderingContext2D): Particle => {
      const particle = {
        color: colors[Math.floor(Math.random() * colors.length)],
        x: Math.random() * context.canvas.width,
        y:
          gravity > 0
            ? -Math.random() * context.canvas.height
            : Math.random() * context.canvas.height + context.canvas.height,
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        scaleY: 1,
        rotation: rotate ? Math.random() * 2 * Math.PI : 0,
        velocityX: Math.random() * sway * 50 - sway * 25,
        velocityY: Math.random() * gravity * 500,
      };

      return extendGenerateParticle
        ? extendGenerateParticle(particle, context)
        : particle;
    },
    [colors, gravity, rotate, sway]
  );

  const generateParticles = React.useCallback(
    (context: CanvasRenderingContext2D, amount: number): Particle[] => {
      const particles = [];

      for (let i = 0; i < amount; ++i) {
        particles.push(generateParticle(context));
      }

      return particles;
    },
    [generateParticle]
  );

  const draw = useCallback(
    (context: CanvasRenderingContext2D) => {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      particles.current = particles.current.map((particle) => {
        // Slow down x-velocity over time
        particle.velocityX -= particle.velocityX * drag;

        // Add randomly positive/negative value to make the particle sway
        particle.velocityX +=
          (Math.random() > 0.5 ? 1 : -1) * Math.random() * sway;

        // Increase y-velocity with gravity
        particle.velocityY += gravity;

        // Spin/flutter particle as it falls
        particle.scaleY = Math.cos(particle.y * flutter);

        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        const width = particle.width,
          height = particle.height * particle.scaleY;

        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        renderParticle
          ? renderParticle(particle, context)
          : context.fillRect(-width / 2, -height / 2, width, height);
        context.restore();

        const buffer = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
        const outOfBounds =
          gravity > 0
            ? particle.y - buffer > context.canvas.height
            : particle.y + buffer < 0;

        return respawn && outOfBounds ? generateParticle(context) : particle;
      });
    },
    [amount, colors, drag, gravity, sway, flutter, rotate, generateParticle]
  );

  const updateCanvasSize = React.useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  /* Keep canvas size updated with window */
  useEffect(() => {
    updateCanvasSize();

    let timeout: number | null = null;
    const handleResize = () => {
      timeout !== null && window.clearTimeout(timeout);
      timeout = window.setTimeout(updateCanvasSize, resizeDebounceTimeout);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resizeDebounceTimeout]);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (!context) return;

      particles.current = generateParticles(context, amount);

      let animationFrameId: number;

      const render = () => {
        draw(context);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();

      return () => window.cancelAnimationFrame(animationFrameId);
    }
  }, [colors, amount, sway, gravity, rotate, draw]);

  return ReactDOM.createPortal(
    <canvas
      ref={canvasRef}
      className={classNames(
        "z-50 fixed inset-0 w-screen h-screen pointer-events-none",
        className
      )}
      {...rest}
    ></canvas>,
    document.body
  );
}

export default React.memo(Confetti);
