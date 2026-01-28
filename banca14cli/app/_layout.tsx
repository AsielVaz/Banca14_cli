import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const tokenApp = await AsyncStorage.getItem("tokenApp");

      // 🚫 NO autenticado
      if (!tokenApp) {
        // ⚠️ solo redirige si NO estamos ya en login
        if (pathname !== "/login") {
          router.replace("/login");
        }
      }

      // ✅ autenticado y está en login → mándalo a home
      if (tokenApp && pathname === "/login") {
        router.replace("/");
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [pathname]);

  // 🌀 Loader solo mientras se valida auth
  if (checkingAuth) {
    return (
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
    );
  }

  // ✅ Stack SIEMPRE visible
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="retiros" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
