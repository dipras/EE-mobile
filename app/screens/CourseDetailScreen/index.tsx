import React, { FC, useEffect, useState } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text, AutoImage, Button } from "app/components";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Dimensions, Image, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GestureDetector, Gesture, ScrollView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { CourseCard } from "./CourseCard";
import { getCourseDetailApi } from "app/utils/api/course.api";
import { rupiah } from "app/utils/formatText";

const courseImage = require("assets/images/course-detail.png");
const noImage = require("assets/images/no-image.png");
const avatarImage = require("assets/images/avatar.jpg");


const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("screen");
interface CourseDetailScreenProps extends AppStackScreenProps<"CourseDetail"> { }
export const CourseDetailScreen: FC<CourseDetailScreenProps> = observer(function Course(_props) {
    const [menu, setMenu] = useState(0);
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const {id} = _props.route.params;

    useEffect(() => {
        getCourseDetailApi(id).then(res => {
            setData(res.data.data);
        }).catch(e => {
            alert("There something is wrong");
        }).finally(() => {
            setLoading(false);
        })
    }, []);

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
                {data.description ? data.description.replace(/<\/?[^>]+(>|$)/g, "") : ""}
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
            {loading && (
                <View style={{position: "absolute", height: SCREEN_HEIGHT, width: SCREEN_WIDTH, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3, justifyContent: "center"}}>
                    <ActivityIndicator size={"large"} />
                </View>
            )}
            <View style={{ height: "40%" }}>
                <View style={{ zIndex: 2, marginLeft: spacing.lg, marginTop: spacing.xl, backgroundColor: "#fff", width: 30, height: 30, justifyContent: "center", alignItems: "center", borderRadius: 15 }}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Image source={data.images ? {uri: data.images} : courseImage} style={{ height: SCREEN_HEIGHT * 70 / 100 }} />
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
                    <View style={{marginTop: spacing.lg}}>
                        <Text size="lg" style={{color: "#F6BE2C", marginVertical: 20}}>{rupiah(Number(data.price || 2000))}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Button style={{width: ((SCREEN_WIDTH - spacing.lg * 2) / 2) - spacing.xs, borderColor: "#F6BE2C", borderRadius: spacing.sm}} textStyle={{color: "#F6BE2C"}}>Add to Cart</Button>
                            <Button style={{width: ((SCREEN_WIDTH - spacing.lg * 2) / 2) - spacing.xs, borderRadius: spacing.sm, backgroundColor: "#F6BE2C", borderWidth: 0}} textStyle={{color: "white"}} onPressOut={() => _props.navigation.navigate("OrderSummary", {id: id, image: data.images, price: Number(data.price)})}>Buy</Button>
                        </View>
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