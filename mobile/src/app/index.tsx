import {
  Image,
  StatusBar,
  Text,
  View,
  TextInput,
  //   Button,
  TouchableOpacity,
  Modal,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { Link, router } from "expo-router";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Settings2,
  User2,
} from "lucide-react-native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { colors } from "@/styles/color";
import CalendarModal from "./components/calendar-modal";
import { format } from "date-fns";
import InviteGuestsModal from "./components/guest-invite-modal";
import { tripStorage } from "@/storage/trip";
import { tripServer } from "@/server/trip-server";
import { api } from "@/server/api";
import axios from "axios";
import Loader from "./loader";
// import { ptBR } from "date-fns/locale";

export default function Index() {
  const [destination, setDestination] = React.useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [guestInviteVisible, setGuestInviteVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [inviteGuests, setInviteGuests] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isGettingTrip, setIsGettingTrip] = useState(true);

  //loading
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);

  const handleDatesSelected = (dates: any) => {
    setSelectedDates(dates);
    setModalVisible(false);
  };

  const formatDate = (date: string) => {
    if (!date) return "Não selecionada";

    const options = { day: "2-digit", month: "short" };
    const formattedDate = new Date(date).toLocaleDateString("pt-BR", options);
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  // function TripDestination() {
  //   if (
  //     destination.trim().length === 0 ||
  //     !selectedDates.startDate ||
  //     !selectedDates.endDate
  //   ) {
  //     return Alert.alert(
  //       "Detalhes da viagem",
  //       "Preencha todos as informações da viagem para seguir."
  //     );
  //   }

  //   if (destination.length < 4) {
  //     return Alert.alert(
  //       "Detalhes da viagem",
  //       "O destino deve ter pelo menos 4 caracteres."
  //     );
  //   }
  //   return setInviteGuests(true);
  // }

  function loadingCreateTrip() {
    return Alert.alert("Nova viagem", "Confirmar viagem?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: createTrip,
      },
    ]);
  }
  async function createTrip() {
    try {
      setIsCreatingTrip(true);

      const newTrip = await tripServer.create({
        destination,
        starts_at: dayjs(selectedDates.startDate).format("YYYY-MM-DD HH:mm:ss"),
        ends_at: dayjs(selectedDates.endDate).format("YYYY-MM-DD HH:mm:ss"),
        emails_to_invite: emailsToInvite,
      });

      setIsCreatingTrip(false);
      Alert.alert("Nova viagem", "Viagem criada com sucesso!", [
        {
          text: "OK, Continuar.",
          onPress: () => saveTrip(newTrip.tripId),
          // onPress: () => saveTrip("1"),
        },
      ]);
    } catch (error) {
      console.error("Erro ao criar viagem:", error);
    }
  }

  async function saveTrip(tripId: string) {
    try {
      await tripStorage.save(tripId);
      router.navigate("/trip/" + tripId);
    } catch (error) {
      Alert.alert(
        "Salvar vaigem",
        "não foi possível salvar o id da viagem no dispositivo"
      );
      console.log(error);
    }
  }

  async function getTrip() {
    try {
      const tripID = await tripStorage.get();

      if (!tripID) {
        return setIsGettingTrip(false);
      }

      const trip = await tripServer.getById(tripID);

      if (trip) {
        return router.navigate("/trip/" + trip.id);
      }
    } catch (error) {
      setIsGettingTrip(false);
    }
  }

  useEffect(() => {
    getTrip();
  }, []);

  if (isGettingTrip) {
    return <Loader />;
  }
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
        <View className="w-full bg-zinc-900 py-3 px-4 space-y-5 rounded-xl my-8 border border-zinc-800">
          <View className="flex w-100 flex-row items-end space-x-2">
            <MapPin color={colors.zinc[500]} size={20} />
            <TextInput
              className="text-lg text-zinc-100 flex-1"
              editable={!inviteGuests}
              placeholder="Para onde?"
              onChangeText={setDestination}
              value={destination}
            ></TextInput>
          </View>
          <View className="flex w-100 flex-row items-center space-x-2 mb-1">
            <Calendar color={colors.zinc[500]} size={20} />
            <TouchableOpacity
              disabled={inviteGuests}
              className="flex-1 flex flex-row"
              onPress={() => setModalVisible(true)}
            >
              <View className="text-zinc-400 text-lg">
                {selectedDates.startDate && selectedDates.endDate ? (
                  <Text className="text-zinc-100 text-lg">
                    {formatDate(selectedDates.startDate)} até{" "}
                    {formatDate(selectedDates.endDate)}
                  </Text>
                ) : (
                  <Text className="text-zinc-500 text-lg">Quando?</Text>
                )}
              </View>
            </TouchableOpacity>
            <CalendarModal
              onDatesSelected={handleDatesSelected}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </View>
          {inviteGuests ? (
            <>
              <View className="my-4">
                <TouchableOpacity
                  onPress={() => setInviteGuests(false)}
                  className="bg-zinc-800 rounded-lg w-full flex items-center flex-row justify-center py-3"
                >
                  <Text className="text-zinc-100 text-lg mr-2">
                    Alterar local/data
                  </Text>
                  <Settings2 color={colors.zinc[300]} size={20} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                className="flex flex-row w-full items-center space-x-2 py-1"
                onPress={() => setGuestInviteVisible(true)}
              >
                <User2 color={colors.zinc[500]} size={20} />
                {emailsToInvite.length > 0 ? (
                  <Text className="text-zinc-100 text-lg flex-1">
                    {emailsToInvite.length} pessoa(s) convidada(s)
                  </Text>
                ) : (
                  <Text className="text-zinc-100 text-lg flex-1">
                    Quem estará na viagem?
                  </Text>
                )}
              </TouchableOpacity>
              <InviteGuestsModal
                guestInviteVisible={guestInviteVisible}
                setGuestInviteVisible={setGuestInviteVisible}
                emailsToInvite={emailsToInvite}
                setEmailsToInvite={setEmailsToInvite}
              />
              <TouchableOpacity
                disabled={isCreatingTrip}
                onPress={loadingCreateTrip}
                className="bg-lime-400 flex w-full items-center space-x-2  flex-row justify-center py-3 rounded-lg mt-4"
              >
                <Text className="text-zinc-900 text-lg">
                  {isCreatingTrip ? "Carregando" : "Confirmar viagem"}
                </Text>
                <ArrowRight color={colors.zinc[900]} size={20} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              // onPress={loadingCreateTrip}
              // onPress={createTrip}
              onPress={() => setInviteGuests(true)}
              className="bg-lime-400 flex w-full items-center space-x-2  flex-row justify-center py-3 rounded-lg"
            >
              <Text className="text-zinc-900 text-lg">Continuar</Text>
              <ArrowRight color={colors.zinc[900]} size={20} />
            </TouchableOpacity>
          )}
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
