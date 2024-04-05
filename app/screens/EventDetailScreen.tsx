import React, { FC, useRef } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Dimensions, Image, View, ViewStyle, Animated, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "app/components";
import { colors, spacing } from "app/theme";
import { AntDesign } from "@expo/vector-icons";
import { getEventDetailApi } from "app/utils/api/event.api";
import { useQuery } from "@tanstack/react-query";
import { useStores } from "app/models";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
interface EventDetailScreenProps extends AppStackScreenProps<"EventDetail"> { }
export const EventDetailScreen: FC<EventDetailScreenProps> = observer(function Event(_props) {
    const { authenticationStore: { authToken } } = useStores();
    const { id } = _props.route.params;
    const { isLoading, error, data } = useQuery({
        queryKey: ["EventDetailData"],
        queryFn: () => getEventDetailApi(id, `${authToken}`).then(res => res.data.data),
        initialData: {
            name: "Event Name",
            desc: "Event Description",
            event_image: [{image: "https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"}]
        }
    })

    const modalPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.9)).current;

    const openModal = () => {
        Animated.timing(modalPosition, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    const closeModal = () => {
        Animated.timing(modalPosition, {
            toValue: SCREEN_HEIGHT * 0.9,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {isLoading && (
                <View style={$loadingBg}>
                    <ActivityIndicator size={"large"} />
                </View>
            )}
            <View>
                <Image source={{ uri: data.event_image[0].image }} style={{ width: "100%", aspectRatio: 4 / 3 }} />
            </View>
            <View style={{ flex: 1, backgroundColor: "#FFF", width: "100%" }}>
                <View style={{ position: "absolute", width: SCREEN_WIDTH, height: spacing.xl, backgroundColor: "#FFF", top: (spacing.xl * -1), borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                </View>
                <View style={{ rowGap: spacing.xl, paddingHorizontal: spacing.lg, flex: 1 }}>
                    <Text size="xl" weight="bold">{data.name}</Text>
                    <View>
                        <Text numberOfLines={5}>{data.desc}</Text>
                        <Text onPress={openModal} style={{color: "blue"}}>See More</Text>
                    </View>
                </View>
                <View style={$actionElementBtn}>
                    <View style={[{ flexDirection: "row", justifyContent: "space-between" }]}>
                        <Text>Rp. 80.000</Text>
                        <Text>56% OFF</Text>
                    </View>
                    <View style={{ flexDirection: "row", columnGap: spacing.md }}>
                        <Button style={{ flexGrow: 1, flexBasis: 0, borderColor: colors.main }} textStyle={{ color: colors.main }}>Add To Cart</Button>
                        <Button style={{ flexGrow: 1, flexBasis: 0, backgroundColor: colors.main, borderColor: colors.main }} textStyle={{ color: "#FFF" }}>Buy Now</Button>
                    </View>
                </View>
            </View>
            <Animated.View style={[$modal, { transform: [{ translateY: modalPosition }] }]}>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={closeModal}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={{padding: spacing.lg}}>
                    <Text>{data.desc}</Text>
                </View>
            </Animated.View>
        </SafeAreaView>
    )
})

const $actionElementBtn: ViewStyle = {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    elevation: 24,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    rowGap: spacing.xl
}

const $modal: ViewStyle = {
    width: "100%",
    backgroundColor: "#FFF",
    height: SCREEN_HEIGHT * 0.9,
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
}

const $loadingBg: ViewStyle = {
    position: "absolute",
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 3,
    justifyContent: "center"
}