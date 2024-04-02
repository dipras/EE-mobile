import React, { FC, useEffect } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text, } from "app/components";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { getExpertsApi } from "app/utils/api/expert.api";
import { useInfiniteQuery } from "@tanstack/react-query";

const expertBanner = require("assets/images/expert-banner.png");
const expertPeople1 = require("assets/images/expert-people-1.png");

const windowWidth = Dimensions.get("window").width;
const expertBannerRatio = 360 / 240;

const getExpertsData = ({ pageParam }: { pageParam: number }) => {
    return getExpertsApi({ limit: 4, page: pageParam }).then(res => res.data);
}
interface ExpertScreenProps extends AppStackScreenProps<"Expert"> { }
export const ExpertScreen: FC<ExpertScreenProps> = observer(function Course(_props) {
    const { data, fetchNextPage, isLoading, error } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["courseData"],
        queryFn: getExpertsData,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.currentPage + 1;
        },
    });
    const notLastPage = data && Number(data.pageParams.pop()) < data.pages[0].meta.totalPages;

    return (
        <ScrollView style={{ backgroundColor: "#FFF" }}>
            <StatusBar style="dark" />
            <View style={{ backgroundColor: "#FCCD18", width: "100%" }}>
                <View style={{ backgroundColor: "#F2BD00", width: 100, height: 100, borderRadius: 50, position: "absolute", right: 0, top: -30 }}></View>
                <View style={{ alignItems: "center", flexDirection: "row", padding: 20, marginTop: 30 }}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ marginRight: spacing.lg }} />
                    </TouchableOpacity>
                    <Text size="lg" style={{ color: "#4E5566" }} weight="medium">Expert Talk</Text>
                </View>
            </View>
            <View>
                <Image source={expertBanner} style={{ width: windowWidth, height: windowWidth / expertBannerRatio }} />
            </View>
            <View style={{ padding: spacing.md }}>
                {data?.pages.map((page, pageNum) => page.data.map((val: any, index: number) => (
                    <View style={{ backgroundColor: "rgba(235, 229, 210, 0.5)", paddingVertical: spacing.md, paddingHorizontal: spacing.sm, flexDirection: "row", marginBottom: spacing.xl }} key={index}>
                        <Image style={{ width: 150, height: 200, marginRight: spacing.md }} source={{uri: val.images}} />
                        <View style={{ flexGrow: 1, flex: 1 }}>
                            <AntDesign name="hearto" size={24} color="black" style={{ alignSelf: "flex-end", color: "#DFAC28" }} />
                            <Text weight="bold" size="xl">{val.name}</Text>
                            <Text weight="light" size="md">{val.short_description}</Text>
                            <View style={{ flexDirection: "row", marginTop: spacing.lg, justifyContent: "space-between" }}>
                                <TouchableOpacity onPress={() => _props.navigation.push("ExpertDetail", {id: val.id})}>
                                    <View style={{ paddingVertical: spacing.xs, paddingHorizontal: spacing.lg, backgroundColor: "#DFAC28", borderRadius: spacing.lg }}>
                                        <Text style={{ color: "#FFF" }}>Talk</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: "row", marginTop: "auto" }}>
                                    <AntDesign name="star" size={24} color={"#DFAC28"} />
                                    <Text>5.0</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                )))}
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