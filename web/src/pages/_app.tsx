// web/src/pages/_app.tsx
import React from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import "./globals.css";
import { VisibilityProvider } from "@/context/VisibilityProvider";
import theme from "../theme";
import type { AppProps } from "next/app";
import { roboto } from "@/lib/fonts";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  // If it's the admin page, don't wrap it in any site layout
  if (isAdminPage) {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <title>Alex Fischman | Senior Software Engineer & Founder</title>
        <meta name="description" content="Senior software engineer and founder of Smarter Weather. 10+ years at Microsoft building products used by millions. Expert in full stack, product development, and weather technology." />
        <meta name="keywords" content="Alex Fischman, software engineer, senior developer, Microsoft, Smarter Weather, weather technology, full stack development, product development" />
        <meta name="author" content="Alex Fischman" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.alexfischman.dev" />
        <link rel="icon" href="/af.ico" />
        <link rel="apple-touch-icon" href="/af_large.png" />
      </Head>
      <GoogleAnalytics />
      <ThemeProvider theme={theme}>
        <VisibilityProvider>
          <PageLayout className={roboto.variable}>
            <AnimatePresence mode="wait">
              <motion.div
                key={router.asPath}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.2 }}
                style={{ height: "100%" }}
              >
                <Component {...pageProps} />
              </motion.div>
            </AnimatePresence>
          </PageLayout>
        </VisibilityProvider>
      </ThemeProvider>
    </>
  );
}