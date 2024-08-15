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
import { CircleCheck, MapPin, Plus, Settings2 } from "lucide-react-native";
import { colors } from "@/styles/color";
import dayjs from "dayjs";
import ModalUpdateTripDetails from "../components/modal-update-trip-details";
import TripDetailsPage from "../components/trip-details";
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

  const today = new Date();
  const day = today.getDate(); // Dia do mês
  const month = today.getMonth() + 1; // Mês (começa em 0, por isso somamos 1)
  const year = today.getFullYear();
  const formattedDateToday = `${day}/${month}/${year}`;

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
      <View className="flex-1 px-5 pt-10">
        <TripDetailsPage
          tripDetails={tripDetails}
          setTripDetails={setTripDetails}
          formattedDate={formattedDate}
          setOpenModalUpdateTripDetails={setOpenModalUpdateTripDetails}
        />
        <ModalUpdateTripDetails
          // formattedDate={formattedDate}
          openModalUpdateTripDetails={openModalUpdateTripDetails}
          setOpenModalUpdateTripDetails={setOpenModalUpdateTripDetails}
          tripDetails={tripDetails}
          setTripDetails={setTripDetails}
          tripId={validTripId}
          setReload={setReload}
        />
        <View className="space-y-4">
          <View className="flex justify-between flex-row items-center">
            <Text className="text-2xl font-bold text-zinc-100">Atividades</Text>
            <TouchableOpacity className="bg-lime-300 py-2 px-4 space-x-2 rounded-lg flex flex-row items-center">
              <Text className="text-lg">Nova atividade</Text>
              <Plus color={colors.zinc[500]} size={20} />
            </TouchableOpacity>
          </View>
          <Text className="text-lg text-zinc-100">
            Data de hoje: {formattedDateToday}
          </Text>

          {/* atividades */}
          <View className="space-y-3">
            <View className="flex flex-row items-baseline space-x-3">
              <Text className="text-xl text-zinc-100 font-bold">Dia 17</Text>
              <Text className="text-sm text-zinc-500">Sábado</Text>
            </View>
            <View className="bg-zinc-900 border border-zinc-700 rounded-lg items-center flex flex-row py-2 px-4 space-x-3">
              <CircleCheck color={colors.lime[300]} size={20} />
              <Text className="text-zinc-100 text-lg truncate flex-1">
                Academia
              </Text>
              <Text className="text-sm text-zinc-400">08:00h</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
