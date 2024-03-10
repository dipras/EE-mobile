import React, {FC} from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text } from "app/components";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";

const eventBanner = require("assets/images/event-banner.png");

const windowWidth = Dimensions.get("window").width;
const eventBannerRatio = 360 / 240;
const eventRatio = 321 / 119;
interface EventScreenProps extends AppStackScreenProps<"Event"> { }
export const EventScreen: FC<EventScreenProps> = observer(function Event(_props) {
    return (
        <ScrollView style={{backgroundColor: "#DEDEDE"}}>
            <StatusBar style="dark" />
            <View style={{backgroundColor: "#FCCD18", width: "100%", height: 100, padding: 20}}>
                <View style={{backgroundColor: "#F2BD00", width: 100, height: 100, borderRadius: 50, position: "absolute", right: 0, top: -30}}></View>
                <View style={{alignItems: "center", height: "100%", flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{marginRight: spacing.lg}} />
                    </TouchableOpacity>
                    <Text size="lg" style={{color: "#4E5566"}} weight="medium">Event</Text>
                </View>
            </View>
            <Image source={eventBanner} style={{width: windowWidth, height: windowWidth / eventBannerRatio, marginBottom: 20}} />
            <View style={{padding: spacing.md}}>
                {[1,2,3,4,5].map(() => (
                    <View style={{backgroundColor: "#fff", borderRadius: 10, position: "relative", overflow: "hidden", marginBottom: 20}}>
                        <Image source={eventBanner} style={{width: windowWidth - spacing.md * 2, height: (windowWidth - spacing.md * 2) / eventRatio}} />
                        <View style={{padding: spacing.md}}>
                            <Text weight="bold" size="md">Export Academy</Text>
                            <Text weight="light" size="sm" style={{marginBottom: 20}}>This is a card description</Text>
                            <View style={{flexDirection: "row"}}>
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="staro" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
})