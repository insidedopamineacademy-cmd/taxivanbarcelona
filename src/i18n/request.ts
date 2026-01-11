// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'es', 'it', 'de'] as const;
export type Locale = (typeof locales)[number];

const messageLoaders: Record<Locale, () => Promise<any>> = {
  en: () => import('../../messages/en.json'),
  es: () => import('../../messages/es.json'),
  it: () => import('../../messages/it.json'),
  de: () => import('../../messages/de.json')
};

export default getRequestConfig(async ({requestLocale}) => {
  const candidate = await requestLocale;
  const base = (candidate || '').split('-')[0];

  const resolvedLocale: Locale = locales.includes(base as Locale)
    ? (base as Locale)
    : 'en';

  return {
    locale: resolvedLocale,
    messages: (await messageLoaders[resolvedLocale]()).default
  };
});