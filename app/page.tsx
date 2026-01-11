import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import LocaleHomePage from "./[locale]/page";

export default async function Home() {
  setRequestLocale("en");
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <main>
        <LocaleHomePage />
      </main>
    </NextIntlClientProvider>
  );
}