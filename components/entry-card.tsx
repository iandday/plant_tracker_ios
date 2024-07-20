import { Link, router } from "expo-router";
import React from "react";

import { Text, Image } from "./ui";
import { TouchableOpacity, View } from "react-native";

import { PlantPhoto } from "./plant-photo";
import { storage } from "~/core/storage";
import { EntryOut, PlantOut } from "~/lib/plant_tracker/model";
import StarRating from "react-native-star-rating-widget";
import { ActivityOut } from "~/lib/api/requests";
import plantInfo from "./plant-detail/plantInfo";
type Props = {
  entry: EntryOut;
  activityData: ActivityOut[];
  plantData: PlantOut;
};

export const EntryCard = ({ entry, activityData, plantData }: Props) => {
  const baseURL = storage.getString("base_url");

  return (
    <Link
      href={`/entry/${entry.id}`}
      asChild
    >
      <TouchableOpacity>
        <View className='m-2 overflow-hidden items-center flex flex-col rounded-xl  border border-border bg-secondary text-secondary-foreground pt-2'>
          <TouchableOpacity
            key={entry.id}
            className=''
            onPress={() => {
              router.navigate(`/entry/${entry.id}`);
            }}
          >
            <View className='flex flex-col w-full py-3 m-1'>
              <Text className='text-primary text-center text-2xl'>{plantData.name}</Text>
              <View className='flex flex-row'>
                <View className='w-1/2 pl-4 m-1'>
                  <Text className='pb-2  text-primary text-center'>{entry.Timestamp.split("T")[0]}</Text>
                  <Text className='pb-2  text-primary text-center'>{entry.Timestamp.split("T")[1]}</Text>
                  <StarRating
                    rating={entry.plant_health}
                    starSize={15}
                    onChange={() => {}}
                    style={{ alignSelf: "center" }}
                  />
                </View>
                <View className='w-1/2 m-1 pr-4'>
                  {entry.activities?.map((a, a_index) => {
                    let match = activityData!.find((act) => act.id === a);
                    if (match) {
                      return (
                        <Text
                          className='pt-2 text-wrap'
                          key={a_index}
                        >{`\u2022  ${match.name}`}</Text>
                      );
                    } else {
                      return <Text key={a_index}>{a}</Text>;
                    }
                  })}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
