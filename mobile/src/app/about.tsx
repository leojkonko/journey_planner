import { Image, StatusBar, Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { Link, Slot } from "expo-router";
import { useEffect } from "react";

export default function About() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor="#000" />
      <View className="flex-1 bg-zinc-950 flex items-center h-100 justify-center">
        <Text className="text-red-500">Hello worlddddd</Text>
        <Image
          source={require("@/assets/logo.svg")}
          className="h-8"
          resizeMode="contain"
        />
        <Link href="/about">About</Link>
        {/* ...other links */}
        {/* <Link href="/user/bacon">View user</Link> */}
        {/* <StatusBar barStyle="dark-content" backgroundColor="red" translucent /> */}
        <Slot />
      </View>
    </>
  );
}
