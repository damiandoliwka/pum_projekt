import { Stack } from "expo-router";

export default function RootLayout() {
  return (
     <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#4f46e5",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Ekran główny" }}
      />
      <Stack.Screen
        name="settings"
        options={{ title: "Ustawienia" }}
      />
    </Stack>
  );
}
