export const enNums: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;
export const faNums: Array<string> = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"] as const;
export const arNums: Array<string> = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

export const enDigitsRegex: RegExp = /[0-9]/g;
export const faDigitsRegex: RegExp = /[۰۱۲۳۴۵۶۷۸۹]/g;
export const arDigitsRegex: RegExp = /[٠١٢٣٤٥٦٧٨٩]/g;
