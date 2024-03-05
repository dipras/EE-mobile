import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ImageBackground, TouchableOpacity } from "react-native"
import { Button, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"

interface BoardingScreenProps extends AppStackScreenProps<"Boarding"> {}

const bgGetStarted = require("../../assets/images/boarding/get-started.png")
const bgCourse = require("../../assets/images/boarding/course.png")

const data = [
  {
    bg: bgGetStarted,
    title: `EXPORT${"\n"}EXPERT${"\n"}INDONESIA`,
    subtitle: `Let’s be Expert, let’s Export`,
    desc: `Export Expert Indonesia has a mission to make all your export needs easier.`,
  },
  {
    bg: bgCourse,
    title: `COURSE${"\n"}EXPORT`,
    subtitle: `Find The Best Course For You`,
    desc: `presents a variety of course options to meet your exploration needs in the world of exports.`,
  },
]
export const BoardingScreen: FC<BoardingScreenProps> = observer(function BoardingScreen(_props) {
  const {
    statusStore: { setSecondTime },
  } = useStores()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    return () => {
      setIndex(0)
    }
  }, [])

  const next = () => {
    if (data[index + 1]) {
      setIndex(index + 1)
    } else {
      setSecondTime()
    }
  }
  return (
    <ImageBackground source={data[index].bg} resizeMode="cover" style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1,
          paddingBottom: 100,
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          <Text
            size="xxl"
            style={{ color: "white", fontFamily: "Poppins", fontWeight: "900", flex: 1 }}
          >
            {data[index].title}
          </Text>
          <TouchableOpacity onPress={() => setSecondTime()}>
            <Text size="lg" style={{ color: "white", marginRight: 20 }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <Text size="lg" weight="bold" style={{ color: "white" }}>
          {data[index].subtitle}
        </Text>
        <Text style={{ color: "white" }}>{data[index].desc} </Text>
        <Button
          style={{ backgroundColor: "#F6BE2C", marginTop: 50 }}
          textStyle={{ color: "white" }}
          onPress={next}
        >
          Next
        </Button>
      </View>
    </ImageBackground>
  )
})
