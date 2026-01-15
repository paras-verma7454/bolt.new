import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/app/components/theme-provider"
import Header from "./components/Header";
import React from "react";
import { ConvexWrapper } from "./components/ConvexWrapper";
import { ModelProvider } from "@/data/context/ModelContext";

export const metadata: Metadata = {
  title: "bolt.new",
  description: "Create Fullstack apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="shortcut icon" href="https://bolt.new/static/favicon.svg" type="image/svg+xml" />
      </head>
      <body >
      <ConvexWrapper>
        <ModelProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange >
                <Header/>
              {children}
            </ThemeProvider>
        </ModelProvider>
      </ConvexWrapper>
      </body>
    </html>
  );
}
