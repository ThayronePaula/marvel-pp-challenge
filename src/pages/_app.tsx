import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme/theme";
import createEmotionCache from "../utils/createEmotionCache";
import { AuthProvider } from "../context/data";
import { Box } from "@mui/material";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <AuthProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Marvel Challenge</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box sx={{ background: "#0E0333", minHeight: "100vh" }}>
            <Component {...pageProps} />
          </Box>
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}
