import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
// Opcional: Para persistir la selección del usuario entre sesiones
// import AsyncStorage from '@react-native-async-storage/async-storage';

// (Opcional) Define una clave para guardar la preferencia si decides hacerlo manualmente
// const THEME_PREFERENCE_KEY = '@MyApp:themePreference';

export default function ThemeSelector() {
  // Obtenemos las funciones y el estado actual resuelto de NativeWind
  const { colorScheme, setColorScheme } = useColorScheme();

  // --- Gestión del estado de la preferencia seleccionada ---
  // Necesitamos saber cuál fue la *última opción seleccionada* por el usuario
  // ('light', 'dark', o 'system'), no solo el tema activo actual ('light' o 'dark').
  // NativeWind no expone directamente esta preferencia almacenada ('system' inclusive).
  // Así que la manejaremos localmente o podríamos usar AsyncStorage/Context si fuera necesario
  // compartirla o persistirla de forma más robusta más allá de lo que NativeWind hace internamente.

  // Estado para saber qué botón está "activo" en nuestra UI
  const [selectedPreference, setSelectedPreference] = useState("system"); // Asumimos 'system' por defecto

  // Opcional: Cargar la preferencia guardada al montar el componente
  // useEffect(() => {
  //   const loadPreference = async () => {
  //     try {
  //       const storedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
  //       if (storedPreference !== null) {
  //         setSelectedPreference(storedPreference as 'light' | 'dark' | 'system');
  //         // OJO: No llames a setColorScheme aquí directamente al cargar,
  //         // NativeWind ya debería haber cargado su propia preferencia persistida.
  //         // Esto es más para sincronizar el estado de *nuestra UI* (qué botón resaltar).
  //       }
  //     } catch (e) {
  //       console.error("Failed to load theme preference.", e);
  //     }
  //   };
  //   loadPreference();
  // }, []);

  // Función para manejar la selección y actualizar NativeWind y nuestro estado local
  const handleSetPreference = async (
    preference: "light" | "dark" | "system"
  ) => {
    setColorScheme(preference); // Actualiza NativeWind (y su persistencia interna)
    setSelectedPreference(preference); // Actualiza el estado de nuestra UI

    // Opcional: Guardar manualmente la preferencia si necesitas más control
    // try {
    //   await AsyncStorage.setItem(THEME_PREFERENCE_KEY, preference);
    // } catch (e) {
    //   console.error("Failed to save theme preference.", e);
    // }
  };

  return (
    // Aplicamos clases de NativeWind al contenedor si queremos que cambie con el tema
    <View className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg my-4">
      <Text className="text-lg font-semibold mb-3 dark:text-white">
        Seleccionar Tema
      </Text>
      <View className="flex-row justify-around">
        {/* Botón Claro */}
        <TouchableOpacity
          onPress={() => handleSetPreference("light")}
          // Estilo condicional para resaltar el botón activo
          className={`py-2 px-4 rounded ${
            selectedPreference === "light"
              ? "bg-blue-500" // Estilo activo
              : "bg-gray-200 dark:bg-gray-600" // Estilo inactivo
          }`}
        >
          <Text
            className={`${
              selectedPreference === "light"
                ? "text-white"
                : "text-black dark:text-white"
            }`}
          >
            Claro
          </Text>
        </TouchableOpacity>

        {/* Botón Oscuro */}
        <TouchableOpacity
          onPress={() => handleSetPreference("dark")}
          className={`py-2 px-4 rounded ${
            selectedPreference === "dark"
              ? "bg-blue-500" // Estilo activo
              : "bg-gray-200 dark:bg-gray-600" // Estilo inactivo
          }`}
        >
          <Text
            className={`${
              selectedPreference === "dark"
                ? "text-white"
                : "text-black dark:text-white"
            }`}
          >
            Oscuro
          </Text>
        </TouchableOpacity>

        {/* Botón Sistema */}
        <TouchableOpacity
          onPress={() => handleSetPreference("system")}
          className={`py-2 px-4 rounded ${
            selectedPreference === "system"
              ? "bg-blue-500" // Estilo activo
              : "bg-gray-200 dark:bg-gray-600" // Estilo inactivo
          }`}
        >
          <Text
            className={`${
              selectedPreference === "system"
                ? "text-white"
                : "text-black dark:text-white"
            }`}
          >
            Sistema
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Preferencia: {selectedPreference} / Tema Activo: {colorScheme}
      </Text>
    </View>
  );
}
