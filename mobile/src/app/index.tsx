import {
  Image,
  StatusBar,
  Text,
  View,
  TextInput,
  //   Button,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { Link } from "expo-router";
import { ArrowRight, Calendar, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { colors } from "@/styles/color";
import CalendarDate from "./components/calendar";

export default function Index() {
  const [destination, setDestination] = React.useState("");
  //   const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="flex-1 flex items-center h-100 justify-center px-6">
        <Image
          source={require("@/assets/logo.png")}
          className="h-8"
          resizeMode="contain"
        />
        <Image source={require("@/assets/bg.png")} className="absolute" />

        <Text className="text-zinc-400 text-center text-lg mt-3">
          Convide seus amigos e planeje sua{"\n"}próxima viagem
        </Text>

        <View className="w-full bg-zinc-900 py-3 px-4 space-y-4 rounded-xl my-8 border border-zinc-800">
          <View className="flex w-100 flex-row items-end space-x-2">
            <MapPin color={colors.zinc[500]} size={20} />
            <TextInput
              className="text-lg text-zinc-100 placeholder:text-zinc-400 flex-1"
              placeholder="Para onde?"
              onChangeText={setDestination}
              value={destination}
            ></TextInput>
          </View>
          <View className="flex w-100 flex-row items-end space-x-2 mb-2">
            <Calendar color={colors.zinc[500]} size={20} />
            <TextInput
              className="text-lg text-zinc-100 placeholder:text-zinc-400 flex-1"
              placeholder="Quando?"
              onChangeText={setDestination}
              value={destination}
            ></TextInput>
          </View>
          <TouchableOpacity className="bg-lime-400 flex w-full items-center space-x-2  flex-row justify-center py-3 rounded-lg">
            <Text className="text-zinc-900 text-lg">Continuar</Text>
            <ArrowRight color={colors.zinc[900]} size={20} />
          </TouchableOpacity>
        </View>
        <Text className="text-zinc-500 text-center text-base">
          Ao planejar sua viagem pela plann.er você automaticamente concorda com
          nossos{" "}
          <Text className="text-zinc-300 underline">
            termos de uso e políticas de privacidade.
          </Text>
        </Text>
      </View>
    </>
  );
}
