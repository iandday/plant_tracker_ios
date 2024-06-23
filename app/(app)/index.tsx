import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Text } from "~/components/ui/text";
const categories = [
  [
    {
      icon: "🏨",
      name: "Hotels",
    },
    {
      icon: "✈️",
      name: "Airplanes",
    },
    {
      icon: "🚙",
      name: "Cars",
    },
    {
      icon: "🏠",
      name: "Homes",
    },
  ],
  [
    {
      icon: "💵",
      name: "Invite",
    },
    {
      icon: "🏦",
      name: "Finance",
    },
    {
      icon: "💳",
      name: "Wallet",
    },
    {
      icon: "🌳",
      name: "Trees",
    },
  ],
];

export default function Index() {
  return (
    <SafeAreaView
      className="bg-background dark:bg-background"
      style={styles.container}
    >
      <View style={styles.top}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <FeatherIcon name="menu" size={24} color="#1a2525" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <Image
              style={styles.headerImage}
              source={{
                uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.topContent}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}
          >
            <View style={styles.banner}>
              <Text>🤑</Text>
              <Text style={styles.bannerText}>Invite friends, earn $5,000</Text>
              <FeatherIcon name="arrow-right" size={20} color="#fff" />
            </View>
          </TouchableOpacity>
          <View style={styles.categories}>
            {categories.map((row, index) => (
              <View style={styles.categoriesRow} key={index}>
                {row.map((item) => (
                  <TouchableOpacity
                    style={styles.category}
                    key={item.name}
                    onPress={() => {
                      // handle onPress
                    }}
                  >
                    <View style={styles.categoryIcon}>
                      <Text>{item.icon}</Text>
                    </View>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentTitle}>Deals</Text>
            <TouchableOpacity>
              <Text style={styles.contentLink}>View all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.contentPlaceholder}>
            {/* Replace with your content */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  /** Top */
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  topContent: {
    paddingHorizontal: 24,
  },
  /** Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 9999,
  },
  /** Banner */
  banner: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#07a9e3",
    padding: 16,
    borderRadius: 16,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginLeft: 8,
    marginRight: "auto",
  },
  /** Categories */
  categories: {
    marginTop: 12,
  },
  categoriesRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: -4,
  },
  /** Category */
  category: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },
  categoryIcon: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#505050",
    marginTop: 8,
    textAlign: "center",
  },
  /** Content */
  content: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginTop: 8,
    height: 420,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#505050",
  },
  contentLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#505050",
  },
  contentPlaceholder: {
    borderStyle: "dashed",
    borderWidth: 4,
    borderColor: "#e5e7eb",
    flex: 1,
    borderRadius: 8,
  },
});
