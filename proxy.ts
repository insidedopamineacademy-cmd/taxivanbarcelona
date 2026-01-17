import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'it', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',

  // IMPORTANT: URL decides locale (no auto detection)
  localeDetection: false,

  // IMPORTANT: do NOT store locale in cookies
  localeCookie: false
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};