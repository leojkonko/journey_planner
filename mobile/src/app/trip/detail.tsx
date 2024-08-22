import { Text, View } from "react-native";
import Navigation from "../components/navigation";
import { useLocalSearchParams } from "expo-router";

export default function Trip() {
  const tripId = useLocalSearchParams<{ id: string }>().id;
  return (
    <>
      <View className="flex-1 px-5 pt-10">
        <View>
          <Text className="text-white">Trip</Text>
        </View>
      </View>
      <Navigation tripId={tripId} />
    </>
  );
}
