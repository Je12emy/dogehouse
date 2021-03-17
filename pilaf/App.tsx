/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { fontFamily } from "./src/constants/GlobalStyles";
import { useTokenStore } from "./src/module/auth/useTokenStore";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./src/navigators/rootNavigator";

// TODO: Implement logic for switching between storybook UI and app UI, check: https://pusher.com/tutorials/storybook-react-native#setting-up-storybook
// To *show* the storybook UI uncomment line 21 and comment line 85, to *hide* the storybook UI comment line 21 and uncomment line 85.
// The Welcome story was causing some trouble so it has been commented out from: storybook/stories/index.js
export { default } from "./storybook";

export const App: React.FC = () => {
  const loadTokens = useTokenStore((state) => state.loadTokens);
  const isTokenStoreReady = useTokenStore(
    (s) => s.accessToken !== undefined && s.refreshToken !== undefined
  );
  if (!isTokenStoreReady) {
    loadTokens();
  }

  useEffect(() => {
    if (isTokenStoreReady) {
      SplashScreen.hide();
    }
  }, [isTokenStoreReady]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </NavigationContainer>
  );
};

StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

// export default App;
