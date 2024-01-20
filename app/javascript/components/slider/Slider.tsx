/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from "react";
import { useRanger } from "react-ranger";
import { RangerOptions } from "react-ranger";
import classNames from "classnames";
import { Tooltip } from "../../components/tooltip";

export enum SliderVariant {
  Teal,
  Blue,
  Purple,
  Red,
  Orange,
  White,
}

const SliderVariantClassNames = Object.freeze({
  [SliderVariant.Teal]: "bg-teal",
  [SliderVariant.Blue]: "bg-blue",
  [SliderVariant.Purple]: "bg-purple",
  [SliderVariant.Red]: "bg-red",
  [SliderVariant.Orange]: "bg-orange",
  [SliderVariant.White]: "bg-white",
});

const preventDefault = (e: Event) => e.preventDefault();

export interface SliderProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: SliderVariant;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  innerMin?: number; // An optional minimum value inside the slider (has to be more than `min`)
  innerMax?: number; // An optional maximum value inside the slider (has to be less than `max`)
  stepSize?: number;
  interpolator?: RangerOptions["interpolator"];
  disabled?: boolean;
  trackClassName?: string;
  handleClassName?: string;
  displayValue?: boolean;
  displayValueFormat?: (value: number) => React.ReactNode;
  displayTooltip?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

export default function Slider({
  variant = SliderVariant.Blue,
  value,
  setValue,
  min,
  max,
  innerMin,
  innerMax,
  stepSize = 1,
  interpolator,
  disabled = false,
  trackClassName,
  handleClassName,
  displayValue = false,
  displayValueFormat = (value) => value,
  displayTooltip = false,
  onFocus,
  onBlur,
  onDragStart,
  onDragEnd,
  ...rest
}: SliderProps): JSX.Element {
  const actualMin = innerMin !== undefined ? Math.max(min, innerMin) : min;
  const actualMax = innerMax !== undefined ? Math.min(max, innerMax) : max;

  const [internalValue, setInternalValue] = useState(value);

  const setValueWithConstraints = (value: number) => {
    const constrainedValue = Math.max(actualMin, Math.min(actualMax, value));
    setInternalValue(constrainedValue);
    setValue(constrainedValue);
  };

  const [isHoveringHandle, setIsHoveringHandle] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingViaKeyboard, setIsDraggingViaKeyboard] = useState(false);

  const startDragging = () => {
    if (!isDragging) {
      setIsDragging(true);
      onDragStart?.();
    }
  };

  const isDraggingViaKeyboardTimeout = useRef<number | null>(null);

  const startDraggingViaKeyboard = () => {
    if (!isDraggingViaKeyboard) {
      setIsDraggingViaKeyboard(true);
      onDragStart?.();
    }
    if (isDraggingViaKeyboardTimeout.current) {
      clearTimeout(isDraggingViaKeyboardTimeout.current);
    }
    isDraggingViaKeyboardTimeout.current = window.setTimeout(() => {
      setIsDraggingViaKeyboard(false);
      onDragEnd?.();
    }, 500);
  };

  const { getTrackProps, segments, handles } = useRanger({
    values: [internalValue],
    onChange: (values: number[]) => {
      setValueWithConstraints(values[0]);
      if (isDragging) {
        setIsDragging(false);
        onDragEnd?.();
      }
    },
    onDrag: (values: number[]) => setValueWithConstraints(values[0]),
    min,
    max,
    stepSize,
    tickSize: max, // We don't use ticks, so set to max for best performance
    interpolator,
  });

  // Update `internalValue` when `value` prop changes and handle isn't being dragged
  useEffect(() => {
    if (!isDragging) setInternalValue(value);
  }, [value]);

  // Update the cursor and disable mobile scrolling when dragging the handle
  useEffect(() => {
    const resetCursor = () => {
      document.body.classList.remove("dragging");
      document.removeEventListener("touchmove", preventDefault);
    };
    if (isDragging) {
      document.body.classList.add("dragging");
      document.addEventListener("touchmove", preventDefault, {
        passive: false,
      });
      return resetCursor;
    } else {
      resetCursor();
    }
  }, [isDragging]);

  return (
    <div
      className={classNames(
        "flex items-center h-5",
        disabled ? "cursor-not-allowed" : ""
      )}
    >
      <div
        {...getTrackProps({
          className: classNames(
            "flex-1 h-1.5 rounded-full bg-gray-800",
            trackClassName
          ),
          ...rest,
        })}
      >
        {innerMax !== undefined && innerMax < max && (
          <div
            className="absolute inset-y-0 right-0 border-l border-gray-600 bg-black bg-opacity-40 rounded-r-full"
            style={{ left: `${((min + innerMax) / (max - min)) * 100}%` }}
          />
        )}
        <div
          {...segments[0].getSegmentProps({
            className: classNames(
              disabled ? "bg-gray-600" : SliderVariantClassNames[variant],
              "h-full rounded-full"
            ),
          })}
        />
        {handles.map(({ getHandleProps }, index) => (
          <Tooltip
            key={index}
            content={`Set ${displayValueFormat(
              actualMin
            )} to ${displayValueFormat(actualMax)}`}
            disabled={!displayTooltip}
            visible={
              isHoveringHandle ||
              isFocused ||
              isDragging ||
              isDraggingViaKeyboard
            }
          >
            <button
              {...getHandleProps({
                type: "button",
                disabled: disabled,
                className: classNames(
                  "group flex justify-center items-center w-9 h-9 focus:outline-none",
                  disabled ? "pointer-events-none" : ""
                ),
                style: {
                  cursor: isDragging ? "grabbing" : "grab",
                },
                onPointerEnter: () => setIsHoveringHandle(true),
                onPointerLeave: () => setIsHoveringHandle(false),
                onFocus: () => {
                  setIsFocused(true);
                  onFocus?.();
                },
                onBlur: () => {
                  setIsFocused(false);
                  onBlur?.();
                },
                onMouseDown: (e) => {
                  // Prevent selecting other elements/text
                  e.preventDefault();
                  startDragging();
                },
                onTouchStart: startDragging,
                onKeyDown: (e) => {
                  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                    startDraggingViaKeyboard();
                  }
                },
              })}
            >
              <span
                className={classNames(
                  "w-5 h-5 rounded-full shadow",
                  "group-focus:ring group-focus:ring-teal group-focus:ring-opacity-50",
                  disabled ? "bg-gray-600" : SliderVariantClassNames[variant],
                  handleClassName
                )}
              />
            </button>
          </Tooltip>
        ))}
      </div>
      {displayValue && (
        <div className="ml-5 relative">
          <div className="invisible">{displayValueFormat(max)}</div>
          <div className="absolute inset-0 text-center">
            {displayValueFormat(value)}
          </div>
        </div>
      )}
    </div>
  );
}
