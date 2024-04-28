import { FC, useEffect, useState } from "react"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { Button, Text } from "app/components"
import { View, TouchableOpacity, Image, ViewStyle, Linking } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { spacing, colors } from "app/theme"
import { rupiah } from "app/utils/formatText"
import { useStores } from "app/models"
import { Wishlist } from "app/models/Wishlist"
import { getPurchaseHistory } from "app/utils/api/order.api"

const noImage = require("assets/images/no-image.png");

interface PurchaseHistoryScreenProps extends AppStackScreenProps<"PurchaseHistory"> { }
export const PurchaseHistoryScreen: FC<PurchaseHistoryScreenProps> = observer(function PurchaseHistoryScreen(_props) {
    const { authenticationStore: { authToken } } = useStores();
    const [PurchaseHistoryData, setPurchaseHistoryData] = useState([]);
    useEffect(() => {
        getPurchaseHistory(authToken).then((res: any) => {
            setPurchaseHistoryData(res.data.data);
        })
    }, []);

    const handlePress = (status : string, url: string) => {
        if(status !== "Completed") {
            _props.navigation.navigate("Payment", {url: url});
        }
    }

    const renderItem = ({ item, index }: { item: any, index: number }) => {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center" }} key={index}>
                <View style={$wishtlist}>
                    <View style={{ flex: 1, justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ overflow: "hidden" }} size="md" weight="bold" numberOfLines={1}>{item.product_type.name}</Text>
                            <View style={{ borderWidth: 1, borderColor: colors.main, padding: spacing.xxs }}>
                                <Text>{item.status}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Paid: 10 november 2023</Text>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                                <View>
                                    <Text>Price</Text>
                                    <Text size="sm" weight="bold">{rupiah(item.price)}</Text>
                                </View>
                                <TouchableOpacity onPress={() => handlePress(item.status, item.snapUrl)}>
                                    <View style={{backgroundColor: colors.main, borderRadius: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.xs}}>
                                        <Text style={{color: "#FFF"}}>{item.status == "Completed" ? "Appointment" : "Pay Now"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <View style={{ paddingHorizontal: spacing.md, flex: 1, paddingTop: 50 }}>
            <FlatList data={PurchaseHistoryData} renderItem={renderItem} style={{ flex: 1 }} />
        </View>
    )
})

const $wishtlist: ViewStyle = {
    height: 200,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
    zIndex: 10,
    marginBottom: 5,
    marginTop: 5,
    width: "95%",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: "row",
    columnGap: 10
}

const $btn: ViewStyle = { width: 150, padding: 0, margin: 0, minHeight: 0, backgroundColor: colors.main, borderColor: "#FFF", borderRadius: 10 };