//import { FlashList } from '@shopify/flash-list';
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";

import { Text, View, TouchableOpacity } from "~/components/ui";
import { ActivityOut, EntryOut } from "~/lib/plant_tracker/model";

interface listProps {
  entryData: EntryOut[];
  activityData: ActivityOut[];
}

export default function ActivityList({ entryData, activityData }: listProps) {
  const router = useRouter();

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }}
      data={entryData}
      renderItem={({ item, index }: { item: EntryOut; index: number }) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => {
            router.navigate(`/entry/${item.id}`);
          }}
        >
          <View className=' flex-1 m-2 rounded-xl bg-background  p-2'>
            <View className='flex-1 flex flex-row justify-between'>
              <View className='basis-5/8 flex-1'>
                <FlatList
                  data={item.activities}
                  renderItem={({ item: a }) => {
                    let match = activityData!.find((act) => act.id === a);
                    if (match) {
                      return <Text>{`\u2022  ${match!.name}`}</Text>;
                    } else {
                      return <Text>{a}</Text>;
                    }
                  }}
                />
              </View>
              <View className='basis-3/8  items-center justify-center justify-items-center justify-self-center'>
                <Text className='pb-2'>{item.Timestamp.split("T")[0]}</Text>
                <StarRating
                  rating={item.plant_health}
                  starSize={15}
                  onChange={() => {}}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id!}
      numColumns={1}
      //estimatedItemSize={10}
      //refreshing={isFetching}
      //onRefresh={loadMoreCats}
      //onEndReached={loadMoreCats}
      //onEndReachedThreshold={0.1}
      //contentContainerStyle={{ paddingVertical: 12 }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 0,
    //flexGrow: 1,
    //flexShrink: 1,
    //flexBasis: 0,
  },
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  /** Header */
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  /** Card */
  card: {
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: "absolute",
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#232425",
    marginRight: "auto",
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#232425",
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: "#595a63",
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: "#232425",
  },
});
