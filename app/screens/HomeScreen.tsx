import { observer } from "mobx-react-lite"
import React, { FC, useRef, useState, useEffect } from "react"
import { ViewStyle, View, Image, Dimensions, Linking } from "react-native"
import { Screen, Text, Icon } from "../components"
import { MainTabScreenProps } from "../navigators/MainNavigator"
import { colors, spacing } from "../theme"
import Carousel, { Pagination } from "react-native-snap-carousel"
import { useStores } from "app/models"
import { getPodcasApi } from "app/utils/api/article.api"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useQuery } from "@tanstack/react-query"

const avatar = require("../../assets/images/avatar.jpg")
const banner1 = require("../../assets/images/demo/banner-1.png")
const banner2 = require("../../assets/images/demo/banner-2.png")
const eventImg = require("../../assets/images/event-img.png")
const surveyImg = require("../../assets/images/survey-img.png")
const courseImg = require("../../assets/images/course-img.png")
const expertImg = require("../../assets/images/expert-img.png")
const halalImg = require("../../assets/images/halal-img.png")

const bannerData = [
  {
    img: banner1,
  },
  {
    img: banner2,
  },
  {
    img: banner1,
  },
  {
    img: banner2,
  },
]

const window = Dimensions.get("window")

const bannerWidth = window.width - spacing.sm * 2
const bannerHeight = bannerWidth / (16 / 9)

const surveyImgWidth = (window.width - spacing.sm * 2) / 2 - 5
const surveyImgHeight = surveyImgWidth / (152 / 120)

const courseImgWidth = window.width - spacing.sm * 2
const courseImgHeight = courseImgWidth / (335 / 120)

export const Home: FC<MainTabScreenProps<"Home">> = observer(function Home(_props) {
  const {
    authenticationStore: { isAuthenticated, authName, authToken },
    statusStore: {redirect, redirectParams, removeRedirect}
  } = useStores()

  const [index, setIndex] = useState(0)
  const [podcastIndex, setPodcastIndex] = useState(0)
  const carouselRef: any = useRef(null)
  const podcastCarouselRef: any = useRef(null)

  useEffect(() => {
    if (_props.route.params?.redirect) {
      _props.navigation.setParams({ redirect: false });
      _props.navigation.push("Login", {});
    }
    if(redirect !== "") {
      if(redirect == "CourseDetail") {
        _props.navigation.push("CourseDetail", {id: Number(redirectParams.id)});
      }

      removeRedirect()
    }
    const interval = setInterval(() => {
      carouselRef?.current?.snapToNext()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const {
    isPending: isPendingPodcast,
    error: errorPodcast,
    data: podcastData,
  } = useQuery({
    queryKey: ["bannerData"],
    queryFn: () => getPodcasApi(authToken).then((res) => res.data.data),
  })

  const CarouselCardItem = ({ item, index }: any) => {
    return (
      <Image
        key={index}
        source={item.img}
        style={{ width: bannerWidth, height: bannerHeight, objectFit: "fill", borderRadius: 10 }}
      />
    )
  }

  const CarouselPodcastItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.url)
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
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$screenContentContainer}>
      {isAuthenticated && (
        <View style={$top}>
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
              <Image source={avatar} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
            </View>
            <Text>{authName}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon icon="love" size={40} style={{ marginRight: 10 }} />
            <Icon icon="bell" size={30} />
          </View>
        </View>
      )}

      <View style={$searchBar}>
        <Icon icon="search" size={20} style={{ marginRight: 10 }} />
        <Text style={{ fontSize: 14 }}>Search product and video</Text>
      </View>

      <View style={{ marginTop: spacing.md }}>
        <Carousel
          layout="default"
          ref={carouselRef}
          data={bannerData}
          renderItem={CarouselCardItem}
          sliderWidth={bannerWidth}
          itemWidth={bannerWidth}
          loop={true}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
          style={{ marginBottom: 0 }}
        />
        <Pagination
          containerStyle={{ paddingVertical: 0, marginTop: 5 }}
          dotsLength={bannerData.length}
          activeDotIndex={index}
          dotStyle={{
            width: 30,
            backgroundColor: "#FBCF17",
            height: 2,
          }}
          inactiveDotStyle={{
            backgroundColor: "#D9D9D9",
            width: 14,
            height: 2,
          }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>

      <View style={{ marginTop: 30, flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => _props.navigation.push("Event")}>
          <Image source={eventImg} style={{ width: surveyImgWidth, height: surveyImgHeight }} />
        </TouchableOpacity>
        <Image source={surveyImg} style={{ width: surveyImgWidth, height: surveyImgHeight }} />
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => _props.navigation.push("Course")}>
          <Image source={courseImg} style={{ width: courseImgWidth, height: courseImgHeight }} />

        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={() => _props.navigation.push("Expert")}>
          <Image source={expertImg} style={{ width: courseImgWidth, height: courseImgHeight }} />
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        <Image source={halalImg} style={{ width: courseImgWidth, height: courseImgHeight }} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text size="lg" weight="bold">
          Podcast
        </Text>
      </View>
      {!isPendingPodcast && (
        <View style={{ marginTop: spacing.md }}>
          <Carousel
            layout="default"
            ref={podcastCarouselRef}
            data={podcastData}
            renderItem={CarouselPodcastItem}
            sliderWidth={bannerWidth}
            itemWidth={bannerWidth}
            loop={true}
            onSnapToItem={(index) => setPodcastIndex(index)}
            useScrollView={true}
            style={{ marginBottom: 0 }}
          />
          <Pagination
            containerStyle={{ paddingVertical: 0, marginTop: 5 }}
            dotsLength={podcastData.length}
            activeDotIndex={podcastIndex}
            dotStyle={{
              width: 30,
              backgroundColor: "#FBCF17",
              height: 2,
            }}
            inactiveDotStyle={{
              backgroundColor: "#D9D9D9",
              width: 14,
              height: 2,
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
        </View>
      )}
    </Screen>
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

const $searchBar: ViewStyle = {
  height: 50,
  width: "100%",
  backgroundColor: colors.formBackground,
  borderRadius: 20,
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
}
