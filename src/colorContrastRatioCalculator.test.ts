import { colorContrastRatioCalculator, ColorContrastRatioCalculatorInput } from './colorContrastRatioCalculator';

type TestData = {
  foregroundColor: ColorContrastRatioCalculatorInput;
  backgroundColor: ColorContrastRatioCalculatorInput;
  expectedRatio: number;
}

const testData: TestData[] = [
  {
    foregroundColor: '11AA55',
    backgroundColor: 'AA8811',
    expectedRatio: 1.11
  },
  {
    foregroundColor: '#E9FAF5',
    backgroundColor: '#FFFFFF',
    expectedRatio: 1.08
  },
  {
    foregroundColor: [0, 0, 0],
    backgroundColor: [255, 255, 255],
    expectedRatio: 21
  },
  {
    foregroundColor: [0, 0, 0],
    backgroundColor: [0, 0, 0],
    expectedRatio: 1
  },
];

describe('calculator', () => {
  it('should return correct ratio', () => {
    testData.map(data => {
      const ratio = colorContrastRatioCalculator(data.foregroundColor, data.backgroundColor);
      expect(ratio).toBe(data.expectedRatio);
    });
  });

  it('should throw an error with wrong input', () => {
    try {
      colorContrastRatioCalculator('FFFFFF', [1, 2]);
    } catch (e) {
      expect(e.message).toBe('Input must be array of number or string');
    }
  });
});
