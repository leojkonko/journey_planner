import { colors } from "@/styles/color";
import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, Text, View, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";

interface CalendarModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onDatesSelected: (dates: {
    startDate: string | null;
    endDate: string | null;
  }) => void;
}

const CalendarModal = (props: CalendarModalProps) => {
  const [selectedDates, setSelectedDates] = useState<any>({});

  const handleDayPress = (day: any) => {
    const { dateString } = day;

    if (selectedDates.startDate && !selectedDates.endDate) {
      if (dateString < selectedDates.startDate) {
        setSelectedDates({ startDate: dateString });
      } else {
        setSelectedDates({ ...selectedDates, endDate: dateString });
      }
    } else {
      setSelectedDates({ startDate: dateString, endDate: null });
    }
  };

  const getMarkedDates = () => {
    const markedDates: any = {};
    if (selectedDates.startDate) {
      markedDates[selectedDates.startDate] = {
        startingDay: true,
        color: "#84cc16",
        textColor: "black",
      };
    }
    if (selectedDates.endDate) {
      markedDates[selectedDates.endDate] = {
        endingDay: true,
        color: "#84cc16",
        textColor: "black",
      };

      let startDate = new Date(selectedDates.startDate);
      let endDate = new Date(selectedDates.endDate);
      let currentDate = new Date(startDate);

      while (currentDate < endDate) {
        currentDate.setDate(currentDate.getDate() + 1);
        const formattedDate = currentDate.toISOString().split("T")[0];
        if (formattedDate !== selectedDates.endDate) {
          markedDates[formattedDate] = {
            color: "#a3e635",
            textColor: "black",
          };
        }
      }
    }
    return markedDates;
  };

  const handleSave = () => {
    props.onDatesSelected(selectedDates);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(!props.modalVisible);
      }}
    >
      <View className="h-max absolute bottom-0 left-0 w-full justify-center items-center bg-zinc-800 p-8 pb-10">
        <View className="bg-transparent rounded w-full">
          <View className="flex flex-row justify-between">
            <View>
              <Text className="mb-1 text-xl font-bold text-zinc-100">
                Selecionar datas
              </Text>
              <Text className="mb-4 text-zinc-400">
                Selecione a data de ida e volta da viagem:
              </Text>
            </View>
            <TouchableOpacity onPress={() => props.setModalVisible(false)}>
              <X color={colors.zinc[500]} size={20} />
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={handleDayPress}
            markingType={"period"}
            markedDates={getMarkedDates()}
            className="w-full border-none"
            theme={{
              backgroundColor: "transparent",
              calendarBackground: "transparent",
              textSectionTitleColor: "white",
              selectedDayBackgroundColor: "blue",
              selectedDayTextColor: "white",
              todayTextColor: "blue",
              dayTextColor: "white",
              textDisabledColor: "gray",
              dotColor: "blue",
              selectedDotColor: "white",
              arrowColor: "white",
              monthTextColor: "white",
              indicatorColor: "white",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "500",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />
          <View className="my-4 space-y-2">
            <Text className="text-center text-zinc-100">
              Data de Início: {selectedDates.startDate || "Não selecionada"}
            </Text>
            <Text className="text-center text-zinc-100">
              Data Final: {selectedDates.endDate || "Não selecionada"}
            </Text>
          </View>
          <TouchableOpacity
            className="mt-4 p-3 bg-lime-400 rounded-lg"
            // onPress={() => props.setModalVisible(false)}
            onPress={handleSave}
          >
            <Text className="text-zinc-900 text-center">Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarModal;
