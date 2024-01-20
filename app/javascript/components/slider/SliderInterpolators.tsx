import { scaleLinear } from "d3-scale";
import type { SliderProps } from ".";

/**
 * Returns an interpolator for sliders with linear interpolation between
 * [fraction, value] stop points
 */
export const LinearRanges = (
  stops: [number, number][],
  roundToNearest: number | ((value: number) => number) = 1
): SliderProps["interpolator"] => {
  const scale = scaleLinear()
    .domain(stops.map((stop) => stop[0]))
    .range(stops.map((stop) => stop[1]));

  return {
    getPercentageForValue: (value) =>
      value <= stops[stops.length - 1][1] ? scale.invert(value) * 100 : 100,
    getValueForClientX: (clientX, trackDims) => {
      const { left, width } = trackDims as { left: number; width: number };
      const fraction = (clientX - left) / width;
      const value = scale(fraction);
      const roundToNearestValue =
        typeof roundToNearest === "number"
          ? roundToNearest
          : roundToNearest(value);

      return Math.round(value / roundToNearestValue) * roundToNearestValue;
    },
  };
};
