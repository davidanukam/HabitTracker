import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function RouteGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuth();
  const segments = useSegments();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (hasMounted && !user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    } else if (hasMounted && user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments]);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider>
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="auth" options={{ headerShown: false }} />
            </Stack>
          </RouteGuard>
        </SafeAreaProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
