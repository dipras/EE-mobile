import React, { FC, useEffect } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text } from "app/components";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { getCourseAPi } from "app/utils/api/article.api";

const courseBanner = require("assets/images/course-banner.png");
const noImage = require("assets/images/no-image.png");

const windowWidth = Dimensions.get("window").width;
const courseBannerRatio = 360 / 240;
interface ExpertScreenProps extends AppStackScreenProps<"Expert"> { }
export const ExpertScreen: FC<ExpertScreenProps> = observer(function Course(_props) {
    useEffect(() => {
        getCourseAPi({page: 1, limit: 4}).then(res => console.log(res.data))
    })


    return (
        <ScrollView style={{ backgroundColor: "#D5D5D5" }}>
            <StatusBar style="dark" />
            <View style={{ backgroundColor: "#FCCD18", width: "100%", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginBottom:spacing.md }}>
                <View style={{ backgroundColor: "#F2BD00", width: 100, height: 100, borderRadius: 50, position: "absolute", right: 0, top: -30 }}></View>
                <View style={{ alignItems: "center", flexDirection: "row", padding: 20, marginTop: 30 }}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ marginRight: spacing.lg }} />
                    </TouchableOpacity>
                    <Text size="lg" style={{ color: "#4E5566" }} weight="medium">Course</Text>
                </View>
                <Text size="lg" weight="bold" style={{color: "#4E5566", padding: 20}}>Let's start learning with expert</Text>
                <Image source={courseBanner} style={{ width: windowWidth, height: windowWidth / courseBannerRatio}} />
            </View>
            <View style={{ padding: spacing.sm, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", backgroundColor: "#fafbfa" }}>
                {[1, 2, 3, 4, 5].map(() => (
                    <TouchableOpacity onPress={() => _props.navigation.push("CourseDetail")} style={item}>
                        <Image source={noImage} style={{ width: "100%", height: "50%" }} />
                        <View style={{ padding: spacing.sm }}>
                            <Text weight="bold" size="md">Export Academy</Text>
                            <Text weight="light" size="sm" style={{ marginBottom: 20 }}>This is a card description</Text>
                            <View style={{ flexDirection: "row" }}>
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="staro" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
})

const item: ViewStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
    marginBottom: 20,
    width: ((windowWidth - (spacing.sm * 2)) / 2) - spacing.sm,
    height: 300
}