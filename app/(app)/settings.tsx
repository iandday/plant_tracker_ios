import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Text, View, TouchableOpacity, SafeAreaView } from "~/components/ui";

import Preferences from "~/components/settings/preferences";
import Locations from "~/components/settings/locations";
import Areas from "~/components/settings/areas";
const tabs = [
  { name: "Preferences", icon: "settings" },
  { name: "Locations", icon: "help-circle" },
  { name: "Areas", icon: "align-center" },
];

export default function Settings() {
  const [value, setValue] = React.useState(0);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="py-4 ph-0 grow shrink basis-0">
        <View className="pl-4 pr-4 mb-2">
          <Text className="text-foreground mb-6 text-xl font-semibold">
            Customize Preferences, Areas, and Locations
          </Text>
        </View>

        <View className="flex-row pt-2 pb-2 bg-background">
          {tabs.map(({ name, icon }, index) => {
            const isActive = index === value;

            return (
              <View
                key={name}
                style={[
                  styles.tabWrapper,
                  isActive && { borderBottomColor: "#6366f1" },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setValue(index);
                  }}
                >
                  <View style={styles.tab}>
                    <FeatherIcon
                      color={isActive ? "#6366f1" : "#6b7280"}
                      name={icon}
                      size={16}
                    />

                    <Text
                      style={[styles.tabText, isActive && { color: "#6366f1" }]}
                    >
                      {name}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {value === 0 && <Preferences />}
        {value === 1 && <Locations />}
        {value === 2 && <Areas />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /** Tab */
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    position: "relative",
    overflow: "hidden",
  },
  tabWrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    borderColor: "#e5e7eb",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6b7280",
    marginLeft: 5,
  },
});
