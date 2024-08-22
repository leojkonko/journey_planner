import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import {
  CalendarArrowDown,
  // Calendar,
  CircleCheck,
  Clock,
  DatabaseBackup,
  Hourglass,
  MapPin,
  Newspaper,
  NewspaperIcon,
  Plus,
  RefreshCcw,
  Settings2,
  Tag,
  X,
} from "lucide-react-native";
import { colors } from "@/styles/color";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import CalendarDayModal from "./calendar-day-modal";
import { useState } from "react";
import { TripDetails } from "@/server/trip-server";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { activitiesServer } from "@/server/activities-server";
dayjs.locale("pt-br");

type TripData = TripDetails & { when: string };

interface ModalCreateActivityProps {
  setOpenModalCreateActivity: React.Dispatch<React.SetStateAction<boolean>>;
  openModalCreateActivity: boolean;
  tripDetails: TripData;
  setReloadActivity: React.Dispatch<React.SetStateAction<boolean>>;
  // saveActivity: Promise<void>;
}

export default function ModalCreateActivity(props: ModalCreateActivityProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setHour(formattedTime);
    // Loga a hora formatada
    hideDatePicker();
  };

  async function saveActivity() {
    const accurs_at = date + " " + hour;
    if (!accurs_at) {
      return Alert.alert("opss", "data ou hora não definida!");
    }
    if (!activityTitle) {
      return Alert.alert("opss", "título não definido!");
    }
    try {
      const activity = await activitiesServer.createActivities(
        props.tripDetails.id,
        activityTitle,
        accurs_at
      );
      setDate("");
      setHour("");
      props.setOpenModalCreateActivity(false);
      props.setReloadActivity(true);
    } catch (error) {}
    return;
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.openModalCreateActivity}
        // onRequestClose={() => {
        //   props.setOpenModalUpdateTripDetails(
        //     !props.openModalUpdateTripDetails
        //   );
        // }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-end"
        >
          <View className="h-max w-full justify-center items-center bg-zinc-800 p-8 pb-10">
            <View className="flex flex-row justify-between w-full">
              <View>
                <Text className="mb-1 text-xl font-bold text-zinc-100">
                  Cadastrar atividade
                </Text>
                <Text className=" text-zinc-400 text-base">
                  Todos convidados podem visualizar as atividades.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.setOpenModalCreateActivity(false);
                }}
              >
                <X color={colors.zinc[500]} size={20} />
              </TouchableOpacity>
            </View>

            <View className="h-px bg-zinc-700 w-full my-6"></View>
            <View className="flex flex-row items-center bg-zinc-950 rounded-lg border border-zinc-700 px-4 w-full text-lg space-x-2">
              <Tag color={colors.zinc[100]} size={20} />
              <TextInput
                keyboardType="default"
                className="text-zinc-100 flex-1 text-lg rounded h-12 mb-2"
                placeholderTextColor="#F4F4F5"
                placeholder="Qual a atividade?"
                // value={props.tripDetails.destination}
                onChangeText={(text) => setActivityTitle(text)}
              ></TextInput>
            </View>
            <View className="flex flex-row space-x-2 mt-2">
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="flex flex-row items-center bg-zinc-950 rounded-lg border border-zinc-700 px-4 w-1/2 text-lg space-x-2"
              >
                <CalendarArrowDown color={colors.zinc[100]} size={20} />
                <Text
                  // readOnly
                  // keyboardType="default"
                  className="text-zinc-100 flex-1 text-base rounded "
                  // placeholderTextColor="#F4F4F5"
                  // placeholder="Data"
                  // value={props.tripDetails.destination}
                  // onChangeText={(text) => setNewTripDestination(text)}
                >
                  {date ? date : "Data"}
                </Text>
              </TouchableOpacity>
              <CalendarDayModal
                tripDetails={props.tripDetails}
                date={date}
                setDate={setDate}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
              />

              <View className="flex flex-row items-center bg-zinc-950 rounded-lg border border-zinc-700 px-4 w-1/2 text-lg space-x-2">
                <Clock color={colors.zinc[100]} size={20} />
                <TouchableOpacity
                  onPress={() => setDatePickerVisibility(true)}
                  className="text-zinc-100 flex items-center text-lg rounded h-12 mb-2"
                  // value={props.tripDetails.destination}
                  // onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
                >
                  <Text className="text-gray-200 text-lg pt-3">
                    {hour.toString() ? hour.toString() : "Hora"}
                  </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  mode="time"
                  isVisible={isDatePickerVisible}
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            </View>
            <TouchableOpacity
              className="bg-lime-400 flex w-full items-center space-x-2  flex-row justify-center py-3 rounded-lg mt-4"
              onPress={saveActivity}
            >
              {/* <Add color={colors.zinc[900]} size={20} /> */}
              <Text className="text-zinc-900 text-lg">Salvar atividade</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
