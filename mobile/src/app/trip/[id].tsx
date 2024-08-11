import { ActivityIndicator, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { TripDetails } from "@/server/trip-server";
import Loader from "../loader";

type TripData = TripDetails & { when: string };

export default function Trip() {
  // console.log(useLocalSearchParams()); -> ID
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);
  const [tripDetails, setTripDetails] = useState({} as TripData);

  const tripId = useLocalSearchParams<{ id: string }>().id;

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrip(false);
    }
  }

  if (isLoadingTrip) {
    return <Loader />;
  }

  return (
    <>
      <View className="flex-1 px-5 pt-16">
        <View>
          {/* <ActivityIndicator /> */}
          <Text className="text-white">Trip</Text>
        </View>
      </View>
    </>
  );
}
