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
import { BlogProvider } from "@/context/BlogProvider";
import { ExperienceProvider } from "@/context/ExperienceProvider";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>af.dev</title>
        <meta name="description" content="Alex Fischman's developer portfolio" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ThemeProvider theme={theme}>
        <VisibilityProvider>
          <ExperienceProvider>
            <BlogProvider>
              <PageLayout>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={router.asPath}
                    initial={{ opacity: 0, y: 50 }}      // Start 50px below final position
                    animate={{ opacity: 1, y: 0 }}         // Animate upward to its natural position
                    exit={{ opacity: 0, y: 50 }}           // Animate downward as it fades out
                    transition={{ duration: 0.2 }}
                    style={{ height: "100%" }}
                  >
                    <Component {...pageProps} />
                  </motion.div>
                </AnimatePresence>
              </PageLayout>
            </BlogProvider>
          </ExperienceProvider>
        </VisibilityProvider>
      </ThemeProvider>
    </>
  );
}