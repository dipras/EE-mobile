import {FC, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { AppStackScreenProps } from "app/navigators";
import { Button, Text } from "app/components";
import { View, ViewStyle, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { colors, spacing } from "app/theme";
import { ScrollView } from "react-native-gesture-handler";
import { getExpertDetailApi } from "app/utils/api/expert.api";
import Toast from 'react-native-root-toast';
import { useStores } from "app/models";

const noImage = require("assets/images/no-image.png");
interface ExpertDetailScreenProps extends AppStackScreenProps<"ExpertDetail"> { }
export const ExpertDetailScreen: FC<ExpertDetailScreenProps> = observer(function ExpertDetail(_props) {
    const [loading, setLoading] = useState(true);
    const {authenticationStore: {isAuthenticated}} = useStores()
    const expertId = _props.route.params.id;
    const [data, setData] = useState({
        name: "",
        image: noImage,
        experience: "",
        description: "",
        is_recommended: false,
        product_type: {
            id: 0,
            name: "Hello"
        },
        price: 1000
    })

    useEffect(() => {
        getExpertDetailApi(expertId).then(res => {
            setData({
                ...res.data.data,
                image: {uri: res.data.data.expert_image}
            });
        }).catch(e => {
            const toast = Toast.show(e?.response?.data?.message || "There something is wrong", {
                duration: Toast.durations.SHORT,
                position: Toast.positions.TOP,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0
              })
        
              setTimeout(() => {
                Toast.hide(toast);
              }, 1000);
              _props.navigation.goBack();
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    const handleClick = () => {
        if(!isAuthenticated) {
            _props.navigation.navigate("Login", {redirect: {id: expertId, to: "ExpertDetail"}});
            return;
        }

        _props.navigation.push("OrderSummary", {id: expertId, price: data.price, image: data.image.uri, productType: data.product_type, name: data.name})
    }

    return (
        <>
            {loading && (
                <View style={{position: "absolute", height: "100%", width: "100%", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 3, justifyContent: "center"}}>
                    <ActivityIndicator size={"large"} />
                </View>
            )}
            <ScrollView style={{backgroundColor: "#F0F0F0"}}>
                <StatusBar style="dark" />
                <View style={headerStyle}>
                    <View style={roundFlyStyle}></View>
                    <View style={headerContentStyle}>
                        <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="black" style={{ marginRight: spacing.lg }} />
                        </TouchableOpacity>
                        <Text size="lg" style={{ color: "#4E5566" }} weight="medium">Expert Talk</Text>
                    </View>
                </View>
                <View style={{position: "relative", overflow: "visible", width: "100%", height: 175, alignItems: "center", marginBottom: spacing.md}}>
                    <View style={{position: "absolute", height: 350, width: 350, backgroundColor: "red", zIndex: 100, top: -175, borderRadius: 10, overflow: "hidden"}}>
                        <Image source={data.image} style={{width: "100%", height: "100%"}} />
                        <View style={{position: "absolute", backgroundColor: "#FFF", height: 120, width: "100%", bottom: 0, padding: spacing.sm, borderTopRightRadius: 10, borderTopLeftRadius: 10, flexDirection: "column", justifyContent: "space-around"}}>
                            <Text size="md" weight="bold">{data.name}</Text>
                            <Text size="xs" style={{color: "#878787"}}>{data.experience}</Text>
                            <View style={{flexDirection: "row", gap: 5, display: data.is_recommended ? "flex" : "none"}}>
                                <FontAwesome name="thumbs-o-up" size={24} color="black" />
                                <Text>Recommended</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{flexDirection: "row"}}>
                            <Text>About</Text>
                        </View>
                        <View style={{height: 3, width: "100%"}}></View>
                    </View>
                    <View>
                        
                    </View>
                </View>
                <View style={{paddingHorizontal: spacing.md, marginTop: spacing.lg}}>
                    <View style={{flexDirection: "row"}}>
                        <Text weight="bold">About</Text>
                    </View>
                    <View style={{height: 1, backgroundColor: "#DDD", width: "100%"}}></View>
                </View>
                <View style={{marginTop: spacing.md, padding: spacing.md}}>
                    <Text>{data.description}</Text>
                    <Button style={{backgroundColor: colors.main, borderColor: "#FFF", marginTop: spacing.md, borderRadius: 10, marginBottom: spacing.lg}} textStyle={{color: "#FFF"}} onPress={handleClick}>Talk Now</Button>
                </View>
            </ScrollView>
        </>
    )
})

const headerStyle: ViewStyle = {
    backgroundColor: "#FCCD18",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: spacing.md,
    height: 275
}

const roundFlyStyle: ViewStyle = { backgroundColor: "#F2BD00", width: 150, height: 150, borderRadius: 75, position: "absolute", right: 0, top: -30 };

const headerContentStyle: ViewStyle = { alignItems: "center", flexDirection: "row", padding: 20, marginTop: 30 };