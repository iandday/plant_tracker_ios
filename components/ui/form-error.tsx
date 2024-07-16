import { View } from "react-native";
import { Text } from "~/components/ui";

interface FormErrorProps {
  message: string | undefined;
}

export function FormError({ message }: FormErrorProps) {
  return (
    <View className='flex flex-row'>
      <View className='w-1/4'></View>
      <View className='w-1/2'>
        <Text className='bg-destructive text-destructive-foreground p-2 font-bold rounded-full text-center'>
          {message}
        </Text>
      </View>
      <View className='w-1/4'></View>
    </View>
  );
}
