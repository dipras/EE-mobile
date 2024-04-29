import { AntDesign } from "@expo/vector-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Text } from "app/components"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "app/theme"
import { getPodcasApi } from "app/utils/api/article.api"
import React, { FC, useState } from "react"
import { Image, TouchableOpacity, View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"

interface PodcastScreenProps extends AppStackScreenProps<"Podcast"> {}

export const PodcastScreen: FC<PodcastScreenProps> = (_props) => {
  const [desc, setDesc] = useState(true)
  const { data } = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["podcastData", desc],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getPodcasApi({ page: pageParam, limit: 20, sortBy: desc ? "DESC" : "ASC" }).then(
        (res) => res.data,
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage?.meta?.currentPage) {
        return lastPage.meta.currentPage + 1
      } else {
        return 1
      }
    },
  })

  return (
    <SafeAreaView>
      <View style={$header}>
        <AntDesign size={24} color={"#000"} name="arrowleft" />
        <Text weight="bold">Podcast</Text>
        <AntDesign size={24} color={"#000"} name="bells" />
        <View style={$roundedFly}></View>
      </View>
      <ScrollView style={{ padding: spacing.md }}>
        <View style={{ flexDirection: "row", columnGap: spacing.lg, marginBottom: spacing.lg }}>
          <TouchableOpacity onPress={() => setDesc(true)}>
            <View style={[$btn, { backgroundColor: desc ? "#F6BE2C" : "#B8B8B8" }]}>
              <Text style={{ color: "#FFF" }}>Latest</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDesc(false)}>
            <View style={[$btn, { backgroundColor: !desc ? "#F6BE2C" : "#B8B8B8" }]}>
              <Text style={{ color: "#FFF" }}>Oldest</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: spacing.lg,
            justifyContent: "space-between",
          }}
        >
          {data?.pages.map((page) =>
            page.data.map((val: any, index: number) => (
              <TouchableOpacity
                onPress={() => _props.navigation.navigate("PodcastPlay", { data: val })}
                key={index}
              >
                <View style={{ width: 170 }}>
                  <Image
                    source={{ uri: val.image }}
                    style={{ width: "100%", aspectRatio: 4 / 3 }}
                  />
                  <View style={{ rowGap: spacing.sm }}>
                    <Text style={{ color: "#4E5566" }} weight="bold" numberOfLines={2}>
                      {val.title}
                    </Text>
                    <Text style={{ color: "#8CA2C0" }}>6 Oktober 2023</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const $header: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  padding: spacing.lg,
  backgroundColor: "#FCCD18",
  borderBottomRightRadius: spacing.sm,
  borderBottomLeftRadius: spacing.sm,
  position: "relative",
  overflow: "hidden",
}

const $roundedFly: ViewStyle = {
  backgroundColor: "#F2BD00",
  width: 100,
  height: 100,
  borderRadius: 50,
  position: "absolute",
  right: 0,
  top: -25,
  zIndex: -1,
}

const $btn: ViewStyle = {
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.xxs,
  borderRadius: spacing.xs,
}
