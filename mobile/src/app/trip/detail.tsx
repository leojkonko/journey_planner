import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Navigation from "../components/navigation";
import { useLocalSearchParams } from "expo-router";
import { CircleCheck, Link2, Plus, UserCog } from "lucide-react-native";
import { colors } from "@/styles/color";

export default function Trip() {
  const tripId = useLocalSearchParams<{ id: string }>().id;
  return (
    <>
      <View className="flex-1 px-5 pt-10 mt-10">
        <ScrollView className="space-y-8">
          <View className="">
            <Text className="text-2xl font-bold text-zinc-100">
              Links importantes
            </Text>
          </View>
          <View className="space-y-5">
            <View className="flex flex-row items-center justify-between">
              <View className="flex">
                <Text className="text-xl text-zinc-100 font-bold">
                  Reserva do AirBnB
                </Text>
                <Text className="text-sm text-zinc-500 mt-2">
                  https://www.airbnb.com.br/rooms/104700011
                </Text>
              </View>
              <Link2 className="shrink-0" color={colors.zinc[400]} size={20} />
            </View>
            <TouchableOpacity className="bg-zinc-800 rounded-lg flex flex-row justify-center items-center space-x-2 py-3 px-3">
              <Plus color={colors.zinc[400]} size={20} />
              <Text className="text-lg text-zinc-100">Cadastrar novo link</Text>
            </TouchableOpacity>
          </View>
          <View className="h-px bg-zinc-700 w-full"></View>
          <View className="">
            <Text className="text-2xl font-bold text-zinc-100">Convidados</Text>
          </View>
          <View className="space-y-5">
            <View className="flex flex-row items-center justify-between">
              <View className="flex">
                <Text className="text-xl text-zinc-100 font-bold">
                  Dr. Rita Pacocha
                </Text>
                <Text className="text-sm text-zinc-500 mt-2">
                  Lacy.Stiedemann@gmail.com
                </Text>
              </View>
              <CircleCheck
                className="shrink-0"
                color={colors.lime[300]}
                size={20}
              />
            </View>
            <TouchableOpacity className="bg-zinc-800 rounded-lg flex flex-row justify-center items-center space-x-2 py-3 px-3">
              <UserCog color={colors.zinc[400]} size={20} />
              <Text className="text-lg text-zinc-100">
                Gerenciar convidados
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Navigation tripId={tripId} />
      </View>
    </>
  );
}
