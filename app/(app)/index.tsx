import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { AreaApi, AreaOut, PlantApi, PlantOut } from "~/api";
import PlantCount from "~/components/index/plantCount";
import { Text } from "~/components/ui/text";
import { getToken } from "~/core/auth/utils";
import axiosInstance from "~/provider/custom-axios";
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
  const token = getToken();

  const [areaData, setAreaData] = useState<AreaOut[]>([]);
  const [plantData, setPlantData] = useState<PlantOut[]>([]);
  const [graveyardData, setGraveyardData] = useState<PlantOut[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, undefined, axiosInstance);
      const areaApi = new AreaApi(undefined, undefined, axiosInstance);
      // get alive plants
      try {
        const response = await api.trackerApiViewPlantListPlants(true, false);
        if (response.status === 200) {
          setPlantData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get graveyard
      try {
        const response = await api.trackerApiViewPlantListPlants(false, true);
        if (response.status === 200) {
          setGraveyardData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get area data
      try {
        const areaResponse = await areaApi.trackerApiViewAreaListAreas();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView className="bg-background flex-1">
      <View style={styles.top}></View>
      <ScrollView>
        <View className="justify-end ">
          <Text className="my-3 text-center text-5xl font-bold">
            {token?.first_name}'s Plants
          </Text>
          <PlantCount plantData={plantData} graveyardData={graveyardData} />
        </View>
        <View className="px-8">
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
  /** Top */
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
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
