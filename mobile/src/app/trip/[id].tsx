import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { TripDetails, tripServer } from "@/server/trip-server";
import Loader from "../loader";
import { MapPin, Settings2 } from "lucide-react-native";
import { colors } from "@/styles/color";
import dayjs from "dayjs";
import ModalUpdateTripDetails from "../components/modal-update-trip-details";
import { useNavigation } from "@react-navigation/native";

type TripData = TripDetails & { when: string };

export default function Trip() {
  // console.log(useLocalSearchParams()); -> ID
  const [isLoadingTrip, setIsLoadingTrip] = useState(true);
  const [openModalUpdateTripDetails, setOpenModalUpdateTripDetails] =
    useState(false);
  const [tripDetails, setTripDetails] = useState({} as TripData);
  const [reload, setReload] = useState(false);

  const tripId = useLocalSearchParams<{ id: string }>().id;
  const validTripId: string = tripId!;

  // const reload = () => {
  //   window.document.location.reload();
  // };

  async function getTripDetails() {
    try {
      setIsLoadingTrip(true);

      if (!tripId) {
        return router.back();
      }

      const trip = await tripServer.getById(tripId);

      const maxLengthDestination = 14;
      const destination =
        trip.destination.length > maxLengthDestination
          ? trip.destination.slice(0, maxLengthDestination) + "..."
          : trip.destination;

      setTripDetails({
        ...trip,
        when: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingTrip(false);
    }
  }

  const startDate = dayjs(tripDetails.starts_at);
  const endDate = dayjs(tripDetails.ends_at);
  // Formatar as datas
  const formattedDate = `${startDate.format("DD")} de ${startDate.format(
    "MMM"
  )} a ${endDate.format("DD")} de ${endDate.format("MMM")}.`;

  useEffect(() => {
    getTripDetails();
  }, []);

  useEffect(() => {
    getTripDetails();
  }, [reload]);

  if (isLoadingTrip) {
    return <Loader />;
  }

  return (
    <>
      <View className="flex-1 px-5 pt-16">
        <View className="w-full bg-zinc-900 py-3 px-4 space-y-5 rounded-xl my-8 border border-zinc-800">
          <View className="flex w-100 flex-row items-center space-x-2">
            <MapPin color={colors.zinc[500]} size={20} />
            <TextInput
              className="text-zinc-100 flex-1 text-lg flex pb-1"
              // placeholder={tripDetails.destination}
              readOnly={true}
            >
              <Text className="text-zinc-400 text-lg truncate">
                {tripDetails.destination}
              </Text>
            </TextInput>
            <Text className="text-zinc-400 text-sm w-20">{formattedDate}</Text>
            <TouchableOpacity
              onPress={() => setOpenModalUpdateTripDetails(true)}
              activeOpacity={0.7}
              className="w-9 h-9 bg-zinc-800 items-center justify-center flex rounded"
            >
              <Settings2 color={colors.zinc[500]} size={20} />
            </TouchableOpacity>
            <ModalUpdateTripDetails
              // formattedDate={formattedDate}
              openModalUpdateTripDetails={openModalUpdateTripDetails}
              setOpenModalUpdateTripDetails={setOpenModalUpdateTripDetails}
              tripDetails={tripDetails}
              setTripDetails={setTripDetails}
              tripId={validTripId}
              setReload={setReload}
            />
          </View>
        </View>
      </View>
    </>
  );
}
