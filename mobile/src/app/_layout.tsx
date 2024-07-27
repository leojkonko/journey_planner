import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
// import {
//   useFonts,
//   Inter_500Medium,
//   Inter_400Regular,
//   Inter_600SemiBold,
// } from "@expo-google-fonts/inter";
// import AppLoading from "expo-app-loading";

export default function Layout() {
  //   const [fontsLoaded] = useFonts({
  //     Inter_500Medium,
  //     Inter_400Regular,
  //     Inter_600SemiBold,
  //   });

  //   if (!fontsLoaded) {
  //     return <AppLoading />;
  //   }

  return (
    <View className="flex-1 bg-zinc-950">
      <StatusBar barStyle={"light-content"} backgroundColor="#000" />
      <Slot />
    </View>
  );
}
