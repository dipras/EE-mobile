import React, { FC } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text } from "app/components";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Image, View, ViewStyle } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { spacing } from "app/theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView } from "react-native-gesture-handler";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCourseApi } from "app/utils/api/course.api";

const courseBanner = require("assets/images/course-banner.png");

const windowWidth = Dimensions.get("window").width;
const courseBannerRatio = 360 / 240;
const getCourseData = ({ pageParam }: { pageParam: number }) => {
    return getCourseApi({ limit: 4, page: pageParam }).then(res => res.data);
}
interface CourseScreenProps extends AppStackScreenProps<"Course"> { }
export const CourseScreen: FC<CourseScreenProps> = observer(function Course(_props) {
    const { data, fetchNextPage, isLoading, error } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["courseData"],
        queryFn: getCourseData,
        getNextPageParam: (lastPage) => {
            return lastPage.meta.currentPage + 1;
        },
    });
    const notLastPage = data && Number(data.pageParams.pop()) < data.pages[0].meta.totalPages;

    if(error) {
        alert("There something is wrong, please try again later");
    }
    return (
        <ScrollView style={{ backgroundColor: "#D5D5D5" }} onScroll={e => {
            const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
            const paddingToBottom = 20;
            const nearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
            if (nearBottom && !isLoading && notLastPage) {
                fetchNextPage();
            }
        }}>
            <StatusBar style="dark" />
            <View style={headerStyle}>
                <View style={roundFlyStyle}></View>
                <View style={headerContentStyle}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ marginRight: spacing.lg }} />
                    </TouchableOpacity>
                    <Text size="lg" style={{ color: "#4E5566" }} weight="medium">Course</Text>
                </View>
                <Text size="lg" weight="bold" style={{ color: "#4E5566", padding: 20 }}>Let's start learning with expert</Text>
                <Image source={courseBanner} style={{ width: windowWidth, height: windowWidth / courseBannerRatio }} />
            </View>
            <View style={courseListStyle}>
                {data?.pages.map((page, pageNum) => page.data.map((val: any) => (
                    <TouchableOpacity onPress={() => _props.navigation.navigate("CourseDetail", {id: Number(val.id)})} style={item}>
                        <Image source={{ uri: val.images }} style={{ width: "100%", height: spacing.xxxl * 3 }} />
                        <View style={{ padding: spacing.sm }}>
                            <Text weight="bold" numberOfLines={2} style={{ height: spacing.xxl }}>{val.name}</Text>
                            <Text weight="light" size="sm" numberOfLines={4} style={{ marginBottom: 20, height: spacing.xxl * 2 }}>{val.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 50)}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="staro" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                )))}
                {notLastPage && [1, 2].map((val, ind) => (
                    <View style={item}>
                        <View style={{ height: spacing.xxxl * 3, width: "100%", backgroundColor: "#DDD" }}></View>
                        <View style={{ padding: spacing.sm }}>
                            <Text weight="bold" numberOfLines={2} style={{ height: spacing.xxl, backgroundColor: "#DDD" }}></Text>
                            <Text weight="light" size="sm" numberOfLines={4} style={{ marginBottom: 20, height: spacing.xxl * 2, backgroundColor: "#DDD" }}></Text>
                            <View style={{ backgroundColor: "#DDD", width: "50%", height: 15 }}>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    )
})

const headerStyle: ViewStyle = {
    backgroundColor: "#FCCD18",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: spacing.md
}
const roundFlyStyle: ViewStyle = { backgroundColor: "#F2BD00", width: 100, height: 100, borderRadius: 50, position: "absolute", right: 0, top: -30 };

const headerContentStyle: ViewStyle = { alignItems: "center", flexDirection: "row", padding: 20, marginTop: 30 };
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
    width: ((windowWidth - (spacing.sm * 2)) / 2) - spacing.xs,
}

const courseListStyle: ViewStyle = {
    padding: spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fafbfa"
}