import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TripDetails, tripServer } from "@/server/trip-server";
import { CircleCheck, MapPin, Plus, Settings2 } from "lucide-react-native";
import { colors } from "@/styles/color";

type TripData = TripDetails & { when: string };

interface TripDestinationProps {
  tripDetails: TripData;
  setTripDetails: React.Dispatch<React.SetStateAction<TripData>>;
  formattedDate: string;
  setOpenModalUpdateTripDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TripDestination(props: TripDestinationProps) {
  return (
    <>
      <View className="w-full bg-zinc-900 py-3 px-4 space-y-5 rounded-xl my-8 border border-zinc-800">
        <View className="flex w-100 flex-row items-center space-x-2">
          <MapPin color={colors.zinc[500]} size={20} />
          <TextInput
            className="text-zinc-100 flex-1 text-lg flex pb-1"
            readOnly={true}
          >
            <Text className="text-zinc-400 text-lg truncate">
              {props.tripDetails.destination}
            </Text>
          </TextInput>
          <Text className="text-zinc-400 text-sm w-20">
            {props.formattedDate}
          </Text>
          <TouchableOpacity
            onPress={() => props.setOpenModalUpdateTripDetails(true)}
            activeOpacity={0.7}
            className="w-9 h-9 bg-zinc-800 items-center justify-center flex rounded"
          >
            <Settings2 color={colors.zinc[500]} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
