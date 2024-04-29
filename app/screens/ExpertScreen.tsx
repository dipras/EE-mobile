import { AntDesign } from "@expo/vector-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "app/theme"
import { getExpertsApi } from "app/utils/api/expert.api"
import { StatusBar } from "expo-status-bar"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ActivityIndicator, Dimensions, Image, View, ViewStyle } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"

const expertBanner = require("assets/images/expert-banner.png")

const windowWidth = Dimensions.get("window").width
const expertBannerRatio = 360 / 240

const getExpertsData = ({ pageParam }: { pageParam: number }) => {
  return getExpertsApi({ limit: 4, page: pageParam }).then((res) => res.data)
}
interface ExpertScreenProps extends AppStackScreenProps<"Expert"> {}
export const ExpertScreen: FC<ExpertScreenProps> = observer(function Course(_props) {
  const {
    WishlistStore: { addWishlist, getWishlistById, removeWishlistById },
  } = useStores()
  const [counter, setCounter] = useState(0)
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["courseData"],
    queryFn: getExpertsData,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.currentPage + 1
    },
  })
  const notLastPage = data && Number(data.pageParams.pop()) < data.pages[0].meta.totalPages

  const handleEndScroll = (e: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
    const paddingToBottom = 20
    const nearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
    if (nearBottom && !isLoading && notLastPage) {
      fetchNextPage()
    }
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <View style={{ backgroundColor: "#FCCD18", width: "100%" }}>
        <View style={$roundFly}></View>
        <View style={$headerOption}>
          <TouchableOpacity onPress={() => _props.navigation.goBack()}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="black"
              style={{ marginRight: spacing.lg }}
            />
          </TouchableOpacity>
          <Text size="lg" style={{ color: "#4E5566" }} weight="medium">
            Expert Talk
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ backgroundColor: "#FFF" }}
        showsVerticalScrollIndicator={false}
        onScroll={handleEndScroll}
      >
        <View>
          <Image
            source={expertBanner}
            style={{ width: windowWidth, height: windowWidth / expertBannerRatio }}
          />
        </View>
        <View style={{ padding: spacing.md }}>
          {data?.pages.map((page) =>
            page.data.map((val: any, index: number) => (
              <View style={$item} key={index}>
                <Image
                  style={{ width: 150, height: 200, marginRight: spacing.md }}
                  source={{ uri: val.images }}
                />
                <View style={{ flexGrow: 1, flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (getWishlistById(val.id, "Consultation")) {
                        removeWishlistById(val.id, "Consultation")
                      } else {
                        addWishlist({
                          id: val.id,
                          name: val.name,
                          price: val.price,
                          imageUrl: val.images,
                          productType: val.product_type,
                        })
                      }
                      setCounter(counter + 1)
                    }}
                  >
                    <AntDesign
                      name={getWishlistById(val.id, "Consultation") ? "heart" : "hearto"}
                      size={24}
                      color="black"
                      style={{ alignSelf: "flex-end", color: "#DFAC28" }}
                    />
                  </TouchableOpacity>
                  <Text weight="bold" size="xl">
                    {val.name}
                  </Text>
                  <Text weight="light" size="md">
                    {val.short_description}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: spacing.lg,
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => _props.navigation.push("ExpertDetail", { id: val.id })}
                    >
                      <View
                        style={{
                          paddingVertical: spacing.xs,
                          paddingHorizontal: spacing.lg,
                          backgroundColor: "#DFAC28",
                          borderRadius: spacing.lg,
                        }}
                      >
                        <Text style={{ color: "#FFF" }}>Talk</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", marginTop: "auto" }}>
                      <AntDesign name="star" size={24} color={"#DFAC28"} />
                      <Text>5.0</Text>
                    </View>
                  </View>
                </View>
              </View>
            )),
          )}
          {notLastPage && <ActivityIndicator size={"large"} style={{ alignSelf: "center" }} />}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
})

const $roundFly: ViewStyle = {
  backgroundColor: "#F2BD00",
  width: 100,
  height: 100,
  borderRadius: 50,
  position: "absolute",
  right: 0,
  top: -30,
}
const $headerOption: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 20,
  marginTop: 30,
}
const $item: ViewStyle = {
  backgroundColor: "rgba(235, 229, 210, 0.5)",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.sm,
  flexDirection: "row",
  marginBottom: spacing.xl,
}
