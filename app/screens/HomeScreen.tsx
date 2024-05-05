import { useQuery } from "@tanstack/react-query"
import Carousel from "app/components/Carousel"
import { useStores } from "app/models"
import { getPodcasApi } from "app/utils/api/article.api"
import { getActiveBanner } from "app/utils/api/banner.api"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import { Dimensions, Image, Linking, View, ViewStyle } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Icon, Screen, Text } from "../components"
import { MainTabScreenProps } from "../navigators/MainNavigator"
import { colors, spacing } from "../theme"

const eventImg = require("../../assets/images/event-img.png")
const surveyImg = require("../../assets/images/survey-img.png")
const courseImg = require("../../assets/images/course-img.png")
const expertImg = require("../../assets/images/expert-img.png")
const halalImg = require("../../assets/images/halal-img.png")
const userImg = require("../../assets/icons/user.png")

const window = Dimensions.get("window")

const bannerWidth = window.width - spacing.sm * 2
const bannerHeight = bannerWidth / (16 / 9)

const surveyImgWidth = (window.width - spacing.sm * 2) / 2 - 5
const surveyImgHeight = surveyImgWidth / (152 / 120)

const courseImgWidth = window.width - spacing.sm * 2
const courseImgHeight = courseImgWidth / (335 / 120)

export const Home: FC<MainTabScreenProps<"Home">> = observer(function Home(_props) {
  const {
    authenticationStore: { isAuthenticated, authName },
    statusStore: { redirect, redirectParams, removeRedirect },
  } = useStores()

  useEffect(() => {
    if (_props.route.params?.redirect && _props.route.params?.redirect !== undefined) {
      _props.navigation.setParams({ redirect: undefined })
      _props.navigation.push(_props.route.params.redirect, {})
    }
    if (redirect !== "") {
      if (redirect === "CourseDetail") {
        _props.navigation.push("CourseDetail", { id: Number(redirectParams.id) })
      } else if (redirect === "ExpertDetail") {
        _props.navigation.push("ExpertDetail", { id: Number(redirectParams.id) })
      }

      removeRedirect()
    }
  }, [])

  const { isPending: isPendingPodcast, data: podcastData } = useQuery({
    queryKey: ["podcastApi"],
    queryFn: () =>
      getPodcasApi()
        .then((res) => res.data.data)
        .catch(() => []),
  })

  const { data: bannerData, isPending: isPendingBanner } = useQuery({
    queryKey: ["bannerApi"],
    queryFn: () =>
      getActiveBanner()
        .then((res) => res.data.data)
        .catch(() => []),
  })

  const CarouselCardItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
        <Image
          key={index}
          source={{ uri: item.file }}
          style={{ width: bannerWidth, height: bannerHeight, objectFit: "fill", borderRadius: 10 }}
        />
      </TouchableOpacity>
    )
  }

  const CarouselPodcastItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          _props.navigation.navigate("PodcastPlay", { data: item })
        }}
      >
        <Image
          key={index}
          source={{ uri: item.image }}
          style={{ width: bannerWidth, height: bannerHeight, objectFit: "fill", borderRadius: 10 }}
        />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View
        style={{
          paddingHorizontal: spacing.sm,
          paddingTop: spacing.xxl,
          paddingBottom: 5,
          backgroundColor: "#FFF",
        }}
      >
        {isAuthenticated && (
          <View style={$top}>
            <TouchableOpacity onPress={() => _props.navigation.navigate("ProfileDetail")}>
              <View style={$identity}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: 5,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={userImg}
                    style={{ width: "100%", height: "100%", borderRadius: 20 }}
                  />
                </View>
                <Text>{authName}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                icon="love"
                size={40}
                style={{ marginRight: 10 }}
                onPress={() => _props.navigation.navigate("Wishlist")}
              />
              {/* <Icon icon="bell" size={30} /> */}
            </View>
          </View>
        )}

        {/* <View style={$searchBar}>
          <Icon icon="search" size={20} style={{ marginRight: 10 }} />
          <Text style={{ fontSize: 14 }}>Search product and video</Text>
        </View> */}
      </View>
      <Screen preset="scroll" contentContainerStyle={$screenContentContainer}>
        {!isPendingBanner && (
          <View style={{ marginTop: spacing.md }}>
            <Carousel data={bannerData} renderItem={CarouselCardItem} width={bannerWidth} />
          </View>
        )}

        <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={() => _props.navigation.push("Event")}>
            <Image source={eventImg} style={{ width: surveyImgWidth, height: surveyImgHeight }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => _props.navigation.navigate("Survey")}>
            <Image source={surveyImg} style={{ width: surveyImgWidth, height: surveyImgHeight }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => _props.navigation.push("Course")}>
            <Image source={courseImg} style={{ width: courseImgWidth, height: courseImgHeight }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => Linking.openURL("https://exportexpert.id/expert")}>
            <Image source={expertImg} style={{ width: courseImgWidth, height: courseImgHeight }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => _props.navigation.navigate("Halal")}>
            <Image source={halalImg} style={{ width: courseImgWidth, height: courseImgHeight }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
          <Text size="lg" weight="bold">
            Podcast
          </Text>
          <Text
            size="lg"
            weight="bold"
            style={{ color: colors.main }}
            onPress={() => _props.navigation.push("Podcast")}
          >
            See All
          </Text>
        </View>
        {!isPendingPodcast && (
          <View style={{ marginTop: spacing.md }}>
            <Carousel data={podcastData} renderItem={CarouselPodcastItem} width={bannerWidth} />
          </View>
        )}
      </Screen>
    </>
  )
})

const $screenContentContainer: ViewStyle = {
  padding: spacing.sm,
}

const $top: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
}

const $identity: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

// const $searchBar: ViewStyle = {
//   height: 50,
//   width: "100%",
//   backgroundColor: colors.formBackground,
//   borderRadius: 20,
//   flexDirection: "row",
//   alignItems: "center",
//   paddingHorizontal: 20,
// }
