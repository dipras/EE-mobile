import React, { FC } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Text, Screen, Button } from "app/components";
import { spacing } from "app/theme";
import { Image, View } from "react-native";
import { rupiah } from "app/utils/formatText";
import { AntDesign } from "@expo/vector-icons";

interface OrderSummaryScreenProps extends AppStackScreenProps<"OrderSummary"> { }
export const OrderSummaryScreen: FC<OrderSummaryScreenProps> = observer(function OrderSummary(_props) {
  const { image, price, id } = _props.route.params;
  return (
    <View style={{ padding: spacing.lg, flex: 1, backgroundColor: "#FFF", paddingBottom: spacing.xxxl }}>
      <View style={{flex: 1}}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={24} color="#FCCD18" />
              <Text style={{ color: "#6E7485", marginLeft: spacing.sm }}>4.5</Text>
            </View>
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
      <Button style={{ backgroundColor: "#F6BE2C", borderWidth: 0 }} textStyle={{ color: "#FFF" }}>Pay</Button>
    </View>
  )
})