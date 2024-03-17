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
import { useStores } from "app/models";

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
    const {authenticationStore: {isAuthenticated}} = useStores();

    useEffect(() => {
        getCourseDetailApi(id).then(res => {
            setData(res.data.data);
        }).catch(e => {
            alert("There something is wrong");
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handleClick = (btn : "pay" | "cart") => {
        if(!isAuthenticated) {
            _props.navigation.navigate("Login", {redirect: {id: id}});
            return;
        }

        if(btn == "pay") {
            _props.navigation.navigate("OrderSummary", {id: id, image: data.images, price: Number(data.price)});
        } else {
            alert("successfully added to cart");
        }
    }

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
            <ScrollView>
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
                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae odio id erat lacinia placerat ut ut est. In at dolor vitae justo vestibulum eleifend. Nulla ipsum ipsum, laoreet eu venenatis sed, euismod eget risus. Integer bibendum neque tristique dolor maximus, non commodo sapien cursus. Curabitur pharetra sollicitudin imperdiet. Morbi porta ligula at posuere rhoncus. Vestibulum justo enim, euismod eu aliquam vitae, volutpat mattis sem. Aliquam erat volutpat. Pellentesque tellus est, congue interdum justo eu, mattis bibendum nunc. In vitae viverra risus. Nullam at dapibus eros. Aenean eu magna dignissim, lacinia augue vitae, suscipit neque. Suspendisse non justo sapien.

                    Sed ornare sem ac dui varius pharetra. Phasellus facilisis lectus at vulputate imperdiet. Quisque faucibus in justo in malesuada. Suspendisse quis tellus turpis. Etiam quis erat in arcu ullamcorper pellentesque eu non mauris. Sed ut est massa. Vivamus vitae ante vel est porta dictum aliquet ut nisl. Vivamus ultrices rhoncus lectus, vel sollicitudin nunc malesuada a. Phasellus ac nulla auctor, elementum tortor tristique, sagittis ante.
                    
                    Sed eget justo imperdiet, vehicula est eu, sollicitudin enim. Mauris feugiat imperdiet odio, ut eleifend nunc. Vestibulum euismod aliquet massa, sit amet finibus tortor pretium sed. Praesent id orci sit amet urna tincidunt vulputate. Curabitur rhoncus porta elit, eget fermentum metus vestibulum sit amet. Maecenas a tellus non dui condimentum fringilla a vel arcu. Maecenas malesuada metus nunc, sed ornare sapien tempor a. Proin laoreet sapien in vulputate interdum. Donec a placerat quam, eleifend consectetur enim. Sed volutpat ultrices risus, eu sagittis sapien pellentesque in. Pellentesque non viverra risus. Etiam vitae malesuada augue. Nam vulputate, dui et ultrices accumsan, velit nunc auctor augue, ac commodo ex lorem a felis. Nulla eget facilisis diam. Integer egestas nulla massa, posuere viverra urna mattis et. Duis sit amet diam fermentum, elementum mauris vehicula, sodales massa.
                    
                    Nulla ut sem sodales, tempor nunc et, commodo mauris. Duis quis nulla libero. Integer ut velit elementum leo vehicula tincidunt. Curabitur et erat sagittis, fringilla neque eu, malesuada turpis. Morbi ipsum diam, dignissim nec porta at, pharetra eget ante. Etiam et purus posuere, imperdiet orci quis, pellentesque erat. Mauris dui magna, fermentum non libero id, sodales tristique nibh. Nunc lacinia, massa at maximus feugiat, quam odio mattis diam, luctus lobortis quam turpis et nunc. Nullam vitae lobortis dolor.
                    
                    Donec tortor risus, tincidunt id tincidunt eu, ultrices sit amet metus. Proin eu tempor felis, et gravida dolor. Praesent sagittis tellus non ligula scelerisque, in luctus turpis tempor. Aliquam erat volutpat. Duis maximus arcu urna, ut rhoncus eros efficitur id. Ut sollicitudin euismod nulla vel tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris vel felis aliquam, aliquet turpis porttitor, aliquam elit.</Text>
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
                    <View style={{ marginTop: spacing.lg, height: 400 }}>
                        {renderContent()}
                    </View>
                    <View style={{marginTop: spacing.lg}}>
                        <Text size="lg" style={{color: "#F6BE2C", marginVertical: 20}}>{rupiah(Number(data.price || 2000))}</Text>
                        <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                            <Button style={{width: ((SCREEN_WIDTH - spacing.lg * 2) / 2) - spacing.xs, borderColor: "#F6BE2C", borderRadius: spacing.sm}} textStyle={{color: "#F6BE2C"}}>Add to Cart</Button>
                            <Button style={{width: ((SCREEN_WIDTH - spacing.lg * 2) / 2) - spacing.xs, borderRadius: spacing.sm, backgroundColor: "#F6BE2C", borderWidth: 0}} textStyle={{color: "white"}} onPressOut={() => handleClick("pay")}>Buy</Button>
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