# Persian Language Processing Instructions

## Understanding Persian Text

### Character Sets
- **Persian/Farsi**: Uses specific Unicode ranges (U+06xx)
- **Arabic**: Shares some characters but has differences
- **Mixed content**: Often contains both Persian and English

### Key Differences: Persian vs Arabic
```typescript
// Persian-specific characters
const PERSIAN_CHARS = ['پ', 'چ', 'ژ', 'گ', 'ی', 'ک'];
// Arabic characters that visually resemble Persian-specific characters (not direct equivalents)
const ARABIC_CHARS = ['ب', '', '', '', 'ي', 'ك'];
/**
 * Persian to Arabic character mapping for normalization purposes
 */
const PERSIAN_TO_ARABIC_MAP: Record<string, string> = {
  'پ': 'ب', // Persian Peh to Arabic Beh
  'چ': '',  // No direct Arabic equivalent for Persian Cheh
  'ژ': '',  // No direct Arabic equivalent for Persian Jeh
  'گ': '',  // No direct Arabic equivalent for Persian Gaf
  'ی': 'ي', // Persian Yeh to Arabic Yeh
  'ک': 'ك', // Persian Kaf to Arabic Kaf
};
```

### Persian Digits
```typescript
// Persian/Farsi digits
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
// Arabic-Indic digits (different from Persian)
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
```

## Text Processing Guidelines

### Direction Handling (RTL)
- Persian text flows right-to-left
- Numbers and English text within Persian flow left-to-right
- Handle mixed content properly

### Normalization
```typescript
// Common normalization patterns
export function normalizePersianText(text: string): string {
  return text
    .replace(/ي/g, 'ی')  // Arabic ya to Persian ya
    .replace(/ك/g, 'ک')  // Arabic kaf to Persian kaf
    .replace(/\u200C+/g, '\u200C')  // Normalize ZWNJ (half-space)
    .trim();
}
```

### Half-Space (ZWNJ) Handling
- Zero Width Non-Joiner (U+200C) is crucial in Persian
- Used between word parts that shouldn't be joined
- Example: می‌خواهم (I want) vs میخواهم (incorrect)

### Common Persian Patterns

#### Names and Titles
```typescript
// Persian name patterns
const PERSIAN_NAME_PREFIXES = ['آقا', 'خانم', 'دکتر', 'مهندس'];
const PERSIAN_NAME_SUFFIXES = ['زاده', 'پور', 'نژاد', 'آبادی'];
```

#### Numbers in Persian Context
```typescript
// Ordinal suffixes in Persian
const ORDINAL_SUFFIXES = ['ام', 'م', 'ین', 'ست'];

// Number to words conversion
function convertToFarsiWords(num: number): string {
  // Implementation for Persian number words
  // یک، دو، سه، چهار، پنج...
}
```

#### Banking and Financial
```typescript
// Iranian banking specifics
interface IranianBankAccount {
  shebaCode: string;    // IR + 24 digits
  cardNumber: string;   // 16 digits
  bankCode: string;     // 3 digits
}
```

## Cultural Context

### Calendar Systems
- **Jalali (Persian) Calendar**: Official calendar in Iran
- **Gregorian Calendar**: International standard
- Need conversion utilities between both

### Geographic Context
```typescript
// Iranian provinces and cities
interface IranProvince {
  name: string;
  persianName: string;
  capital: string;
  coordinates: [number, number];
}
```

### Phone Numbers
- Iranian mobile: +98 9xx xxx xxxx
- Landline patterns vary by province
- Handle both formats properly

## Best Practices

1. **Always test with real Persian text**
2. **Consider both formal and informal Persian**
3. **Handle mixed Persian/English content**
4. **Respect cultural conventions**
5. **Use appropriate Unicode normalization**
6. **Test with various Persian fonts and renderers**

## Common Pitfalls to Avoid

- Don't confuse Persian and Arabic characters
- Don't ignore half-space (ZWNJ) importance
- Don't assume left-to-right text flow
- Don't hardcode Persian text without proper encoding
- Don't forget about Persian number systems
