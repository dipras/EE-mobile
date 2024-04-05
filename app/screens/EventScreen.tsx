import React, { FC } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text } from "app/components";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Dimensions, Image, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getEventApi } from "app/utils/api/event.api";
import { SafeAreaProvider } from "react-native-safe-area-context";

const eventBanner = require("assets/images/event-banner.png");

const getEventData = ({ pageParam }: { pageParam: number }) => {
    return getEventApi({ limit: 4, page: pageParam }).then(res => res.data);
}

const windowWidth = Dimensions.get("window").width;
const eventBannerRatio = 360 / 240;
const eventRatio = 321 / 119;
interface EventScreenProps extends AppStackScreenProps<"Event"> { }
export const EventScreen: FC<EventScreenProps> = observer(function Event(_props) {
    const { data, fetchNextPage, isLoading, error } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["courseData"],
        queryFn: getEventData,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.currentPage + 1;
        },
    });
    const notLastPage = data && Number(data.pageParams.pop()) < data.pages[0].meta.totalPages;

    const handleEndScroll = (e: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
        const paddingToBottom = 20;
        const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        if (nearBottom && !isLoading && notLastPage) {
            fetchNextPage();
        }
    }

    return (
        <SafeAreaProvider>
            <StatusBar style="dark" />
            <View style={{ backgroundColor: "#FCCD18", width: "100%", height: 90, padding: 20 }} >
                <View style={{ backgroundColor: "#F2BD00", width: 100, height: 100, borderRadius: 50, position: "absolute", right: 0, top: -30 }}></View>
                <View style={{ alignItems: "center", height: "100%", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ marginRight: spacing.lg }} />
                    </TouchableOpacity>
                    <Text size="lg" style={{ color: "#4E5566" }} weight="medium">Event</Text>
                </View>
            </View>
            <ScrollView style={{ backgroundColor: "#DEDEDE" }} onScroll={handleEndScroll}>
                <Image source={eventBanner} style={{ width: windowWidth, height: windowWidth / eventBannerRatio, marginBottom: 20 }} />
                <View style={{ padding: spacing.md }}>
                    {data?.pages.map((page, pageNum) => page.data.map((val: any, index: number) => (
                        <TouchableOpacity onPress={() => _props.navigation.navigate("EventDetail", {id: Number(val.id)})}>
                            <View style={{ backgroundColor: "#fff", borderRadius: 10, position: "relative", overflow: "hidden", marginBottom: 20 }} key={index}>
                                <Image source={{ uri: val.event_images }} style={{ width: windowWidth - spacing.md * 2, height: (windowWidth - spacing.md * 2) / eventRatio }} />
                                <View style={{ padding: spacing.md }}>
                                    <Text weight="bold" size="md">{val.name}</Text>
                                    <Text weight="light" size="sm" style={{ marginBottom: 20 }}>{val.description.slice(0, 50)}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <AntDesign name="star" size={24} color="black" />
                                        <AntDesign name="star" size={24} color="black" />
                                        <AntDesign name="star" size={24} color="black" />
                                        <AntDesign name="staro" size={24} color="black" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )))}
                    {notLastPage && (
                        <ActivityIndicator size={"large"} style={{alignSelf: "center"}} />
                    )}
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
})