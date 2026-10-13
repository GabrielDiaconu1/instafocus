import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";

const INBOX_URL = "https://www.instagram.com/direct/inbox/";
const HOME_REGEX = /^https:\/\/www\.instagram\.com\/?(\?.*)?$/;

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);

  const handleNavigation = (navState: WebViewNavigation) => {
    // After logging in, Instagram sends you to the home feed.
    // Redirect to the DMs inbox instead.
    if (HOME_REGEX.test(navState.url)) {
      webViewRef.current?.injectJavaScript(
        `window.location.href = "${INBOX_URL}"; true;`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insta Focus</Text>

      <View style={styles.browser}>
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#E879F9"
          />
        )}

        <WebView
          ref={webViewRef}
          source={{ uri: INBOX_URL }}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={handleNavigation}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          style={styles.webview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101014",
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    padding: 16,
  },
  browser: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loader: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    zIndex: 1,
  },
});