import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "AiMed",
  description: "Your AI med assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
