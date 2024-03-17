import React, { FC, useState } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text, Button } from "app/components";
import { spacing } from "app/theme";
import { Image, View, Linking, ActivityIndicator } from "react-native";
import { rupiah } from "app/utils/formatText";
import { AntDesign } from "@expo/vector-icons";
import { checkoutApi, checkoutParams } from "app/utils/api/order.api";
import { useStores } from "app/models";

interface OrderSummaryScreenProps extends AppStackScreenProps<"OrderSummary"> { }
export const OrderSummaryScreen: FC<OrderSummaryScreenProps> = observer(function OrderSummary(_props) {
  const {authenticationStore: {authToken}} = useStores();
  const [loading, setLoading] = useState(false);
  const { image, price, id, productType, name } = _props.route.params;
  const checkOut = async () => {
    const params : checkoutParams = {
      email: "bluestackpwc@gmail.com",
      product_id: id,
      first_name: "Aldy",
      last_name: "Prastyo",
      phone_number: "+64421343542423",
      product_type_id: productType.id
    }
    setLoading(true);
    try {
      const response = await checkoutApi(authToken, params);
      alert("Payment successfully!");
      Linking.openURL(response.data.data.midtrans_url);
      _props.navigation.replace("Main", {screen: "Home", params: {}})
    } catch (error) {
      alert("There something is wrong");
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <View style={{ padding: spacing.lg, flex: 1, backgroundColor: "#FFF", paddingBottom: spacing.xxxl }}>
      <View style={{flex: 1}}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150, marginRight: spacing.md }} />
          <View style={{flex: 1}}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={24} color="#FCCD18" />
              <Text style={{ color: "#6E7485", marginLeft: spacing.sm }}>4.5</Text>
            </View>
            <Text size="md">{name}</Text>
            <Text size="sm" weight="bold" style={{ color: "#F6BE2C", marginVertical: 20 }}>{rupiah(price)}</Text>
          </View>
        </View>
        <View style={{ marginTop: spacing.xxl * 2 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.lg }}>
            <Text style={{ color: "#6E7485" }}>Subtotal</Text>
            <Text>{rupiah(price)}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.lg }}>
            <Text style={{ color: "#6E7485" }}>Coupon Discount</Text>
            <Text>0%</Text>
          </View>
          <View style={{ width: "100%", height: 2, backgroundColor: "#DDD", marginBottom: spacing.lg }}></View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: spacing.lg }}>
            <Text style={{ color: "#6E7485" }}>Total</Text>
            <Text size="xl">{rupiah(price)}</Text>
          </View>
        </View>
      </View>
      <Button style={{ backgroundColor: "#F6BE2C", borderWidth: 0 }} textStyle={{ color: "#FFF" }} onPress={checkOut}>{loading ? <ActivityIndicator size={"small"} /> : "Pay"}</Button>
    </View>
  )
})