import { ActivityIndicator, Image, StatusBar, Text, View } from "react-native";

export default function Loader() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor="#000" />
      <View className="flex-1 bg-zinc-950 flex items-center h-100 justify-center">
        <Image
          source={require("@/assets/logo.png")}
          className="h-8"
          resizeMode="contain"
        />
        <ActivityIndicator className="mt-6" size="large" />
      </View>
    </>
  );
}
