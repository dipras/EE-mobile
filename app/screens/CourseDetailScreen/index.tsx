import React, { FC, useState } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text } from "app/components";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureDetector, Gesture, ScrollView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { CourseCard } from "./CourseCard";

const courseImage = require("assets/images/course-detail.png");
const noImage = require("assets/images/no-image.png");
const avatarImage = require("assets/images/avatar.jpg");


const {height: SCREEN_HEIGHT} = Dimensions.get("screen");
interface CourseDetailScreenProps extends AppStackScreenProps<"CourseDetail"> { }
export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function Course(_props) {
    const [menu, setMenu] = useState(0);
    const translateY = useSharedValue(0);
    const contextTranslate = useSharedValue({y: 0});
    const gesture = Gesture.Pan().onStart(() => {
        contextTranslate.value = {y: translateY.value}
    }).onUpdate(e => {
        translateY.value = contextTranslate.value.y + e.translationY;
        translateY.value = Math.max(translateY.value, (-SCREEN_HEIGHT * 0.5) + spacing.lg);
        translateY.value = Math.min(translateY.value, 0)
    })

    const rBottom = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}]
        }
    })

    const renderOverview = () => {
        return (
            <Text>
                Lorem ipsum dolor sit amet consectetur. Quis aliquam nunc rhoncus placerat orci nisi id donec interdum. Gravida ultricies mollis nunc tellus. Neque pharetra quis in justo velit bibendum feugiat. Adipiscing nunc ut consectetur fermentum scelerisque id. Egestas Read more..
            </Text>
        )
    }

    const renderReview = () => {
        return (
            <ScrollView style={{height: SCREEN_HEIGHT / 1.5}}>
                {[0,1,2,3].map((v, i) => (
                    <CourseCard name="Dipras" description="Sangat bagus dan mantap jiwa bang hehe wkwkkw lesgooo" avatar={avatarImage} />
                ))}
            </ScrollView>
        )
    }

    const renderContent = () => {
        switch (menu) {
            case 0:
                return renderOverview();
            case 1:
                return (
                    <Text>Curiculum Page</Text>
                )
            case 2: 
                return renderReview();
            default:
                return (
                    <Text>Error</Text>
                )

        }
    }

    return (
        <>
            <View style={{ height: "40%" }}>
                <View style={{ zIndex: 999, marginLeft: spacing.lg, marginTop: spacing.xl, backgroundColor: "#fff", width: 30, height: 30, justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image source={courseImage} style={{ height: SCREEN_HEIGHT * 70 / 100, position: "absolute" }} />
            </View>
            <GestureDetector gesture={gesture}>
                <Animated.View style={[bottomSectionStyle, rBottom]}>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <AntDesign name="star" size={24} color="#FCCD18" />
                        <Text style={{ color: "#878787", marginLeft: spacing.sm }}>4.5 (365 Reviews)</Text>
                    </View>
                    <Text size="xl" weight="bold" style={{ marginTop: spacing.xl }}>Export Academy</Text>
                    <View style={{ flexDirection: "row", marginTop: spacing.lg }}>
                        {["Overview", "Curriculum", "Review"].map((val, ind) => (
                            <View style={{ ...menuStyle, borderBottomColor: menu == ind ? "red" : "#E9EAF0" }} key={ind}>
                                <TouchableOpacity onPress={() => {
                                    setMenu(ind);
                                }}>
                                    <Text size="md" weight="medium">{val}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <View style={{ marginTop: spacing.lg }}>
                        {renderContent()}
                    </View>
                </Animated.View>
            </GestureDetector>
        </>
    )
})

const bottomSectionStyle: ViewStyle = {
    backgroundColor: "#fff",
    position: "absolute",
    height: SCREEN_HEIGHT,
    top: SCREEN_HEIGHT * 0.50,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: "100%",
    padding: spacing.lg
}

const menuStyle: ViewStyle = {
    borderBottomWidth: 2,
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: spacing.md
}