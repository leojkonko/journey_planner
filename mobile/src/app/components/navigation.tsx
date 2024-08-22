import { colors } from "@/styles/color";
import { router, useLocalSearchParams } from "expo-router";
import { CalendarRange, Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface NavigationProps {
  tripId: string | undefined;
}

export default function Navigation(props: NavigationProps) {
  const tripId = useLocalSearchParams<{ id: string }>().id;

  return (
    <>
      <View className="pb-9 pt-6">
        <View className="p-6 bg-zinc-800 flex flex-row justify-center space-x-3 rounded-lg border border-zinc-700">
          <TouchableOpacity
            className="bg-lime-300 w-1/2 flex-row justify-center flex items-center rounded-lg space-x-2 py-2 "
            onPress={() => router.push("/trip/" + props.tripId)}
          >
            <CalendarRange color={colors.zinc[800]} size={20} />
            <Text className="text-lg">Atividades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-zinc-700 w-1/2 flex-row justify-center flex items-center rounded-lg space-x-2 py-2 "
            onPress={() => router.push(`/trip/detail?id=${props.tripId}`)}
          >
            <Plus color={colors.zinc[100]} size={20} />
            <Text className="text-lg text-zinc-100">Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
