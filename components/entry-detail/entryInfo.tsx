import React from "react";
import StarRating from "react-native-star-rating-widget";

import { Text, View } from "~/components/ui";
import { ActivityOut, EntryOut } from "~/lib/plant_tracker/model";

interface activityInfoProps {
  entryData: EntryOut;
  activityData: ActivityOut[];
}

export default function entryInfo({ entryData, activityData }: activityInfoProps) {
  return (
    <View className='px-3'>
      <View key={"date"}>
        <Text className='text-left text-primary'>Date</Text>

        <View className='align-center self-center rounded-lg border-2 border-primaryDark bg-secondaryDark px-4 '>
          <Text className='align-center items-baseline py-1 text-center'>{entryData.Timestamp}</Text>
        </View>
      </View>

      <View key={"activities"}>
        <Text className='text-left text-primary'>Activities</Text>

        <View className='align-center self-center rounded-lg border-2 border-primaryDark bg-secondaryDark px-4 '>
          <Text className='align-center items-baseline py-1 text-center'>
            {" "}
            {entryData?.activities
              .map((a) => {
                let match = activityData.find((act) => act.id === a);
                return match!.name;
              })
              .join(", ")}
          </Text>
        </View>
      </View>

      <View key={"health"}>
        <Text className='text-left text-primary'>Health</Text>

        <View className='align-center self-center rounded-lg border-2 border-primaryDark bg-secondaryDark px-4 '>
          <StarRating
            rating={entryData.plant_health}
            starSize={20}
            onChange={() => {}}
          />
        </View>
      </View>

      <View key={"notes"}>
        <Text className='text-left text-primary'>Notes</Text>

        <View className='align-center self-center rounded-lg border-2 border-primaryDark bg-secondaryDark px-4 '>
          <Text className='align-center items-baseline py-1 text-center'>{entryData.notes}</Text>
        </View>
      </View>
    </View>
  );
}
