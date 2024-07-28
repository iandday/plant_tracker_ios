import React from "react";

import { Text, View } from "~/components/ui";
import { AreaOut, PlantOut } from "~/lib/plant_tracker/model";

interface plantCountProps {
  plantData: PlantOut;
  areaData: AreaOut;
}

interface plantInfo {
  label: string;
  value: string;
}

export default function plantInfo({ plantData, areaData }: plantCountProps) {
  const items: plantInfo[] = [
    { label: "Common Name", value: plantData.common_name! },
    { label: "Scientific Name", value: plantData.scientific_name! },
    { label: "Area", value: areaData?.name },
    { label: "Purchase Date", value: plantData.purchase_date! },
    { label: "Death Date", value: plantData.death_date! },
    { label: "Notes", value: plantData.notes! },
  ];

  return (
    <View className='pl-2'>
      {items.map((item: plantInfo, index) =>
        item.value ? (
          <View key={index}>
            <Text className='text-left text-primary'>{item.label} </Text>

            <View className='align-center self-center    rounded-lg border-2 border-primaryDark bg-secondaryDark  '>
              <Text className='align-center items-baseline py-1 text-center'>{item.value}</Text>
            </View>
          </View>
        ) : null
      )}
    </View>
  );
}
