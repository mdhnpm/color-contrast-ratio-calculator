# color-contrast-ratio-calculator

Node module to calculate the contrast of two colors for accessibity based on Web Contenet Accessibility Guideline (WCAG).

## Example

`colorContrastRatioCalculator` takes two argument.
- foregroundColor: a hexadecimal string (with or without #) or an array of RBG.
- backgroundColor: a hexadecimal string (with or without #) or an array of RBG. 

```js
import { colorContrastRatioCalculator } from '@mdhnpm/color-contrast-ratio-calculator';

colorContrastRatioCalculator('11AA55', 'AA8811'); // return 1.11

colorContrastRatioCalculator('#E9FAF5', '#FFFFFF'); // return 1.08

colorContrastRatioCalculator([0, 0, 0], [255, 255, 255]); // return 21
```

## Color Contrast

As part of web accessibility requirements, we need to have the color contrast between background and foreground content (usually text) should be great enough to ensure legibility (see [here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable/Color_contrast))

WCAG 2.0 level AA requires a contrast ratio of at least `4.5:1` for normal text and `3:1` for large text. WCAG 2.1 requires a contrast ratio of at least `3:1` for graphics and user interface components (such as form input borders). WCAG Level AAA requires a contrast ratio of at least `7:1` for normal text and `4.5:1` for large text.

Large text is defined as 14 point (typically `18.66px`) and bold or larger, or 18 point (typically `24px`) or larger.

Contrast ratio is calculated as `(L1 + 0.05) / (L2 + 0.05)` where
- L1 is the relative luminance of the lighter of the colors, and
- L2 is the relative luminance of the darker of the colors.

See Contrast Ration [here](https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio)

According to WCAG, the relative luminance of a color for the sRGB colorspace is defined as `L = 0.2126 * R + 0.7152 * G + 0.0722 * B` where R, G and B are defined as:

- if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
- if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
- if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4

and RsRGB, GsRGB, and BsRGB are defined as:

- RsRGB = R8bit/255
- GsRGB = G8bit/255
- BsRGB = B8bit/255


See [here](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance) for the details.
