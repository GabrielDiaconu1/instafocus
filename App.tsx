
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

const STORIES_URL = "https://www.instagram.com/";
const DMS_URL = "https://www.instagram.com/direct/inbox/";

export default function App() {
  const [tab, setTab] = useState<"stories" | "messages">("stories");

  const storiesFilter = `
    (function() {
      if (location.pathname.startsWith('/direct/')) return;

      const styleId = 'insta-focus-filter';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = 'article { display: none !important; }';
        document.head.appendChild(style);
      }
    })();
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Insta Focus</Text>

      <View style={styles.tabs}>
        <Pressable
          style={[styles.tab, tab === "stories" && styles.active]}
          onPress={() => setTab("stories")}
        >
          <Text style={styles.tabText}>Stories</Text>
        </Pressable>

        <Pressable
          style={[styles.tab, tab === "messages" && styles.active]}
          onPress={() => setTab("messages")}
        >
          <Text style={styles.tabText}>DMs</Text>
        </Pressable>
      </View>

      <WebView
        key={tab}
        source={{ uri: tab === "stories" ? STORIES_URL : DMS_URL }}
        injectedJavaScriptBeforeContentLoaded={storiesFilter}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        setSupportMultipleWindows={false}
        style={styles.webview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101014",
  },
  title: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingBottom: 10,
    gap: 10,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#25252d",
  },
  active: {
    backgroundColor: "#6541d9",
  },
  tabText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  webview: {
    flex: 1,
    backgroundColor: "#101014",
  },
});
