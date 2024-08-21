import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TripDetails, tripServer } from "@/server/trip-server";
import { CircleCheck, MapPin, Plus, Settings2 } from "lucide-react-native";
import { colors } from "@/styles/color";
import { useEffect, useState } from "react";
import { activitiesServer } from "@/server/activities-server";
import { router, useLocalSearchParams } from "expo-router";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

interface ActivitiesProps {
  reloadActivity: boolean;
  setReloadActivity: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Activity {
  id: string;
  title: string;
  accurs_at: string;
}

interface DayActivities {
  date: string;
  activies: Activity[];
}

export default function Activities(props: ActivitiesProps) {
  const tripId = useLocalSearchParams<{ id: string }>().id;
  const [activities, setActivities] = useState<DayActivities[]>([]);
  async function getActivitiesDetails() {
    try {
      if (!tripId) {
        return router.back();
      }

      const activitiesResponse = await activitiesServer.getActivities(tripId);
      setActivities(activitiesResponse);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getActivitiesDetails();
  }, []);

  useEffect(() => {
    getActivitiesDetails();
    console.log("atualizou");
    props.setReloadActivity(false);
  }, [props.reloadActivity]);

  return (
    <>
      <View className="space-y-5">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <View className="space-y-3" key={activity.date}>
              <View className="flex flex-row items-baseline space-x-3">
                <Text className="text-xl text-zinc-100 font-bold">
                  Dia {dayjs(activity.date).format("DD")}
                </Text>
                <Text className="text-sm text-zinc-500">
                  {dayjs(activity.date).format("dddd")}
                </Text>
              </View>
              {activity.activies && activity.activies.length > 0 ? (
                activity.activies.map((detail) => (
                  <View
                    className="bg-zinc-900 border border-zinc-700 rounded-lg items-center flex flex-row py-2 px-4 space-x-3"
                    key={detail.id}
                  >
                    <CircleCheck color={colors.lime[300]} size={20} />
                    <Text className="text-zinc-100 text-lg truncate flex-1">
                      {detail.title}
                    </Text>
                    <Text className="text-sm text-zinc-400">
                      {dayjs(detail.accurs_at).format("HH:mm")}h
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-zinc-400 text-base">
                  Nenhuma atividade para este dia.
                </Text>
              )}
            </View>
          ))
        ) : (
          <Text>Nenhuma atividade para este dia.</Text>
        )}
      </View>
    </>
  );
}
