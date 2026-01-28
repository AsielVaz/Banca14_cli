import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

 return (
  <Tabs
    screenOptions={{
      tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      headerShown: false,
      tabBarButton: HapticTab,
    }}>

    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size ?? 26} color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name="movimientos"
      options={{
        title: 'Movimientos',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="swap-horizontal" size={size ?? 26} color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name="contactos"
      options={{
        title: 'Contactos',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" size={size ?? 26} color={color} />
        ),
      }}
    />

  </Tabs>
);

}
