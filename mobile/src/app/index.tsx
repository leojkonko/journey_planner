import { Image, Text, View } from "react-native";
import { NativeWindStyleSheet } from "nativewind";

// Certifique-se de que os estilos NativeWind são carregados corretamente
NativeWindStyleSheet.create({});
export default function Index() {
  return (
    <View>
      <Text className="text-red-500">Hello world</Text>
    </View>
  );
}
