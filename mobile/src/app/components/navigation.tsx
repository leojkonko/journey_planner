import { colors } from "@/styles/color";
import { useRoute } from "@react-navigation/native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { CalendarRange, Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface NavigationProps {
  tripId: string | undefined;
}

export default function Navigation(props: NavigationProps) {
  const params = useLocalSearchParams();
  const router = useRouter();
  const route = useRoute();

  console.log(route.name);

  const activities =
    route.name == "trip/[id]"
      ? "bg-lime-300 text-zinc-900"
      : "bg-zinc-700 text-zinc-100";

  const details =
    route.name == "trip/detail"
      ? "bg-lime-300 text-zinc-900"
      : "bg-zinc-700 text-zinc-100";

  console.log(details);

  return (
    <>
      <View className="pb-9 pt-6">
        <View className="p-6 bg-zinc-800 flex flex-row justify-center space-x-3 rounded-lg border border-zinc-700">
          <TouchableOpacity
            className={`${activities} w-1/2 flex-row justify-center flex items-center rounded-lg space-x-2 py-2`}
            onPress={() => router.push("/trip/" + props.tripId)}
          >
            <CalendarRange className={activities} size={20} />
            <Text className={`text-zinc-100 ${activities} text-lg`}>
              Atividades
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`${details} w-1/2 flex-row justify-center flex items-center rounded-lg space-x-2 py-2 `}
            onPress={() => router.push(`/trip/detail?id=${props.tripId}`)}
          >
            <Plus className={details} size={20} />
            <Text className={`text-zinc-100 ${details} text-lg`}>Detalhes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
