import { AuthProvider } from "@/lib/auth-context";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

function RouteGuard({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const isAuth = false;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && !isAuth) {
      router.replace("/auth");
    }
  }, [hasMounted, isAuth, router]);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <AuthProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
    </AuthProvider>
  );
}
