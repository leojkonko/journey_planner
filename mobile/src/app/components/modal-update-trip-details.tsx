import { TripDetails, tripServer } from "@/server/trip-server";
import { colors } from "@/styles/color";
import { AtSign, DatabaseBackup, MapPin, Plus, X } from "lucide-react-native";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarModal from "./calendar-modal2";
import { useState } from "react";
import dayjs from "dayjs";

type TripData = TripDetails & { when: string };

interface ModalUpdateTripDetailsProps {
  setOpenModalUpdateTripDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  openModalUpdateTripDetails: boolean;
  tripDetails: TripData;
  setTripDetails: React.Dispatch<React.SetStateAction<TripData>>;
  tripId: string;
  // reload: () => void;
  // formattedDate: string;
}

export default function ModalUpdateTripDetails(
  props: ModalUpdateTripDetailsProps
) {
  var [newTripDestination, setNewTripDestination] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: props.tripDetails.starts_at,
    endDate: props.tripDetails.ends_at,
  });
  // const [selectedDates, setSelectedDates] = useState<any>({});

  const handleDatesSelected = (dates: any) => {
    setSelectedDates(dates);
    setModalVisible(false);
  };

  const stringStartDate = dayjs(selectedDates.startDate);
  const stringEndDate = dayjs(selectedDates.endDate);
  // Formatar as datas
  const formattedDate = `${stringStartDate.format(
    "DD"
  )} de ${stringStartDate.format("MMM")} a ${stringEndDate.format(
    "DD"
  )} de ${stringEndDate.format("MMM")}.`;

  async function updateTrip() {
    props.setReload(false);
    if (!newTripDestination) {
      newTripDestination = props.tripDetails.destination;
    }
    try {
      await tripServer.update({
        id: props.tripId,
        destination: newTripDestination,
        starts_at: dayjs(selectedDates.startDate).format("YYYY-MM-DD HH:mm:ss"),
        ends_at: dayjs(selectedDates.endDate).format("YYYY-MM-DD HH:mm:ss"),
      });
    } catch (error) {
      console.log(error);
      // console.log(error.message);
    }
    // props.reload;
    props.setReload(true);
    props.setOpenModalUpdateTripDetails(false);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.openModalUpdateTripDetails}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <View className="h-max w-full justify-center items-center bg-zinc-800 p-8 pb-10">
            <View className="flex flex-row justify-between w-full">
              <View>
                <Text className="mb-1 text-xl font-bold text-zinc-100">
                  Atualizar viagem
                </Text>
                <Text className=" text-zinc-400 text-base">
                  Atualize os dados da sua viagem:
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.setOpenModalUpdateTripDetails(false);
                }}
              >
                <X color={colors.zinc[500]} size={20} />
              </TouchableOpacity>
            </View>

            <View className="h-px bg-zinc-700 w-full my-6"></View>
            <View className="flex flex-row items-center bg-zinc-950 rounded-lg border border-zinc-700 px-4 w-full text-lg space-x-2">
              <MapPin color={colors.zinc[100]} size={20} />
              <TextInput
                keyboardType="default"
                className="text-zinc-100 flex-1 text-lg rounded h-12 mb-2"
                placeholderTextColor="#F4F4F5"
                placeholder={props.tripDetails.destination}
                onChangeText={(text) => setNewTripDestination(text)}
              ></TextInput>
            </View>
            <View className="flex flex-row items-center bg-zinc-950 rounded-lg border border-zinc-700 px-4 w-full text-lg space-x-2">
              <MapPin color={colors.zinc[100]} size={20} />
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="text-zinc-100 flex items-center text-lg rounded h-12 mb-2"
              >
                <Text className="text-gray-200 text-lg pt-3">
                  {formattedDate}
                </Text>
              </TouchableOpacity>
            </View>
            <CalendarModal
              onDatesSelected={handleDatesSelected}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
            <TouchableOpacity
              className="bg-lime-400 flex w-full items-center space-x-2  flex-row justify-center py-3 rounded-lg mt-4"
              onPress={updateTrip}
            >
              <DatabaseBackup color={colors.zinc[900]} size={20} />
              <Text className="text-zinc-900 text-lg">Atualizar</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
