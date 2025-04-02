import { useColorScheme } from "nativewind";
import { Pressable, Switch, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
      <Text className="mb-1 text-xl font-mono text-black dark:text-white">
        Medium NativeWind
      </Text>
      <Text className="mb-6 font-mono font-bold capitalize text-2xl text-black dark:text-white">
        {colorScheme} mode on
      </Text>
      <Switch value={isDarkMode} onChange={toggleColorScheme} />
      <Link href="/login" asChild>
        <Pressable className="dark:bg-white bg-[#1E1E1E] w-full py-3 rounded-2xl items-center justify-center">
          <Text className="text-white dark:text-black font-bold">
            Iniciar sesión
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
