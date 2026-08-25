export const languages = {
  en: 'English',
  pt: 'Português',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';
export const locales = Object.keys(languages) as Locale[];
