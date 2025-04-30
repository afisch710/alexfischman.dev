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
        <title>Alex Fischman</title>
        <meta name="description" content="Software Engineering Portfolio" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
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