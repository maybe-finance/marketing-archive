import React, { useEffect, useRef, useState } from "react";

import logoUrl from "../../helpers/logo-url";

const colors = {
  border: {
    default: "border-black",
  },
};

const maxPreviewSymbols = 4;

export interface SymbolsLogoProps {
  symbols: string[];
}

export default function SymbolsLogo({
  symbols,
}: SymbolsLogoProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [borderColor, setBorderColor] = useState(colors.border.default);
  const options = symbols.slice(0, maxPreviewSymbols);
  const additionalNumber = symbols.length - options.length;

  useEffect(() => {
    if (!ref && !ref.current) return;

    const li = ref.current?.closest("li");

    if (!li) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const bgClassName = [...mutation.target.classList].find((className) =>
            className.startsWith("bg-gray")
          );

          if (bgClassName) {
            setBorderColor(`border-${bgClassName.slice(3)}`);
          } else {
            setBorderColor(colors.border.default);
          }
        }
      });
    });

    observer.observe(li, {
      attributes: true,
    });
  }, [ref.current]);

  return (
    <div className="flex -space-x-1 justify-start overflow-hidden" ref={ref}>
      {options.map((symbol, index) => (
        <img
          key={symbol}
          className={`rounded-full inline-block w-8 h-8 ${borderColor}`}
          src={logoUrl(symbol)}
          style={{ zIndex: options.length - index, borderWidth: 3 }}
        />
      ))}

      {additionalNumber > 0 && (
        <div
          className={`rounded-full min-w-8 w-8 h-8 z-0 bg-gray-900 text-gray-500 text-xs flex justify-center items-center ${borderColor}`}
          style={{ borderWidth: 3 }}
        >
          {`+${additionalNumber}`}
        </div>
      )}
    </div>
  );
}
