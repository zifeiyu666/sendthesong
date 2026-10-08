import { GlobalMusicController } from "@/components/music/GlobalMusicController";
import { siteConfig } from "@/config/site";
import { englishMessages } from "@/i18n/messages";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";

export const viewport: Viewport = {
  themeColor: siteConfig.themeColors,
};

export const metadata: Metadata = {
  other: {
    "launchscaler-verify": "0dd0bddaebcb5ce31e41469d5a731026",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" style={{ colorScheme: "light" }}>
      <head>
        <meta
          name="launchscaler-verify"
          content="0dd0bddaebcb5ce31e41469d5a731026"
        />
      </head>
      <body>
        <NextIntlClientProvider locale="en" messages={englishMessages}>
          {children}
          <GlobalMusicController />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
