import { convertHexToRgb } from '@mdhnpm/rgb-hex-converter';

export type ColorContrastRatioCalculatorInput = string | Array<number>;

export const colorContrastRatioCalculator = (foregroundColor: ColorContrastRatioCalculatorInput,
  backgroundColor: ColorContrastRatioCalculatorInput): number => {
  const l1 = calculateRelativeLuminance(foregroundColor);
  const l2 = calculateRelativeLuminance(backgroundColor);
  if (l2 < l1) {
    const ratio = (l1 + 0.05) / (l2 + 0.05);
    return Math.round((ratio*100))/100;

  } else {
    const ratio = (l2 + 0.05) / (l1 + 0.05);
    return Math.round((ratio*100))/100;
  }
};

const calculateRelativeLuminanceComponent1 = (rgbValue: number) => {
  const relativeRgb = rgbValue/255;
  if (relativeRgb <=  0.03928) {
    return relativeRgb/12.92;
  }
  return ((relativeRgb + 0.055) / 1.055) ** 2.4;

};

const calculateRelativeLuminanceComponent2 = (input: Array<number>) => {
  return  0.2126 * calculateRelativeLuminanceComponent1(input[0])
    + 0.7152 * calculateRelativeLuminanceComponent1(input[1])
    + 0.0722 * calculateRelativeLuminanceComponent1(input[2]);
};

const calculateRelativeLuminance = (input: ColorContrastRatioCalculatorInput): number => {

  if (Array.isArray(input) && input.length === 3) {
    return  calculateRelativeLuminanceComponent2(input);
  } else if (typeof input === 'string') {
    const rgb = convertHexToRgb(input);
    return  calculateRelativeLuminanceComponent2(rgb);
  } else {
    throw new Error('Input must be array of number or string');
  }
};
