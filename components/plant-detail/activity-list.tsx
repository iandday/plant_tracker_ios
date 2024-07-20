import { useRouter } from "expo-router";
import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { Text, View, TouchableOpacity, SafeAreaView } from "~/components/ui";
import { ActivityOut, EntryOut } from "~/lib/plant_tracker/model";
import PagerView, { PagerViewOnPageScrollEventData } from "react-native-pager-view";
import { SlidingDot } from "react-native-animated-pagination-dots";

interface listProps {
  entryData: EntryOut[];
  activityData: ActivityOut[];
}

export default function ActivityList({ entryData, activityData }: listProps) {
  const router = useRouter();
  const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
  const width = Dimensions.get("window").width;
  const ref = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, entryData.length];
  const scrollX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
    inputRange,
    outputRange: [0, entryData.length * width],
  });

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: -40 }}>
      <AnimatedPagerView
        initialPage={0}
        style={{ height: 200 }}
        scrollEnabled={true}
        orientation='horizontal'
        ref={ref}
        onPageScroll={onPageScroll}
      >
        {entryData.map((item, index) => (
          <View
            className='bg-background mx-10 '
            key={index}
          >
            <View className='h-full w-full items-center flex flex-col border-2 rounded-xl border-primary pt-5 '>
              <TouchableOpacity
                className=''
                onPress={() => {
                  router.navigate(`/entry/${item.id}`);
                }}
              >
                <Text className='pb-2  text-primary text-center'>{item.Timestamp}</Text>
                <StarRating
                  rating={item.plant_health}
                  starSize={15}
                  onChange={() => {}}
                />
                {item.activities?.map((a, a_index) => {
                  let match = activityData!.find((act) => act.id === a);
                  if (match) {
                    return (
                      <Text
                        className='pt-2'
                        key={a_index}
                      >{`\u2022  ${match!.name}`}</Text>
                    );
                  } else {
                    return <Text key={a_index}>{a}</Text>;
                  }
                })}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </AnimatedPagerView>
      <View>
        <View className='align-center justify-center'>
          <SlidingDot
            marginHorizontal={3}
            containerStyle={{ top: 30 }}
            data={entryData}
            //@ts-ignore
            scrollX={scrollX}
            dotSize={12}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
