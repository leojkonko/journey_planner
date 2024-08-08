import { colors } from "@/styles/color";
import { ArrowRight, AtSign, MapPin, Plus, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { validateInput } from "@/utils/validateInput";

interface InviteGuestsModalProps {
  guestInviteVisible: boolean;
  setGuestInviteVisible: React.Dispatch<React.SetStateAction<boolean>>;
  emailsToInvite: string[];
  setEmailsToInvite: React.Dispatch<React.SetStateAction<string[]>>;
}

const InviteGuestsModal = ({
  emailsToInvite,
  setEmailsToInvite,
  guestInviteVisible,
  setGuestInviteVisible,
}: InviteGuestsModalProps) => {
  const [emailToInvite, setEmailToInvite] = useState("");
  // const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  function removeEmail(emailToRemove: string) {
    setEmailsToInvite((prevState) =>
      prevState.filter((email) => email !== emailToRemove)
    );
  }

  function addNewEmailToInvite() {
    if (!validateInput.email(emailToInvite)) {
      return Alert.alert("Convidado", "E-mail inválido!");
    }

    const emailAlreadyExists = emailsToInvite.find(
      (email) => email === emailToInvite
    );

    if (emailAlreadyExists) {
      return Alert.alert("Convidado", "E-mail já inserido!");
    }

    setEmailsToInvite((prevState) => [...prevState, emailToInvite]);
    setEmailToInvite("");
    // setEmailsToInvite((prevState) =>
    //   // prevState.filter((email) => email !== emailToRemove)

    // )
    console.log(emailToInvite);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={guestInviteVisible}
      onRequestClose={() => {
        setGuestInviteVisible(!guestInviteVisible);
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end"
      >
        <View className="h-max w-full justify-center items-center bg-zinc-800 p-8 pb-10">
          <View className="flex flex-row justify-between">
            <View>
              <Text className="mb-1 text-xl font-bold text-zinc-100">
                Selecionar convidados
              </Text>
              <Text className="mb-4 text-zinc-400 text-base">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem
              </Text>
            </View>
            <TouchableOpacity onPress={() => setGuestInviteVisible(false)}>
              <X color={colors.zinc[500]} size={20} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap gap-2 justify-start w-full">
            {emailsToInvite.length > 0 ? (
              emailsToInvite.map((email) => (
                <View
                  key={email}
                  className="bg-zinc-700 rounded px-2 py-1 flex flex-row items-center space-x-2"
                >
                  <Text className="text-zinc-100 text-lg">{email}</Text>
                  <TouchableOpacity onPress={() => removeEmail(email)}>
                    <X color={colors.zinc[100]} size={20} />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text className="text-zinc-400 text-base">
                Nenhum email adicionado
              </Text>
            )}
          </View>
          <View className="h-px bg-zinc-700 w-full my-6"></View>
          <View className="flex flex-row items-center bg-zinc-950 rounded-lg border border-zinc-700 px-4 w-full text-lg space-x-2">
            <AtSign color={colors.zinc[100]} size={20} />
            <TextInput
              keyboardType="email-address"
              className="text-zinc-100 flex-1 text-lg rounded h-12 mb-2"
              placeholderTextColor="#F4F4F5"
              placeholder="Digite o e-mail do convidado"
              onChangeText={(text) => setEmailToInvite(text.toLowerCase())}
              value={emailToInvite}
            ></TextInput>
          </View>
          <TouchableOpacity
            className="bg-lime-400 flex w-full items-center space-x-2  flex-row justify-center py-3 rounded-lg mt-4"
            onPress={addNewEmailToInvite}
          >
            <Text className="text-zinc-900 text-lg">Convidar</Text>
            <Plus color={colors.zinc[900]} size={20} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default InviteGuestsModal;
