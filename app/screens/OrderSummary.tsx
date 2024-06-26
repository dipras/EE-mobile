import { AntDesign } from "@expo/vector-icons"
import { Button, Text } from "app/components"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "app/theme"
import { checkoutApi, checkoutParams } from "app/utils/api/order.api"
import { rupiah } from "app/utils/formatText"
import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ActivityIndicator, Image, View } from "react-native"

interface OrderSummaryScreenProps extends AppStackScreenProps<"OrderSummary"> {}
export const OrderSummaryScreen: FC<OrderSummaryScreenProps> = observer(function OrderSummary(
  _props,
) {
  const {
    authenticationStore: { authToken },
  } = useStores()
  const [loading, setLoading] = useState(false)
  const { image, price, id, productType, name, first_name, last_name, phone_number, email } =
    _props.route.params
  const checkOut = async () => {
    let params: checkoutParams = {
      product_id: id,
      product_type_id: productType.id,
    }
    if (first_name) {
      params = { ...params, last_name, phone_number, email }
    }
    setLoading(true)
    try {
      const response = await checkoutApi(authToken, params)
      _props.navigation.navigate("Payment", { url: response.data.data.midtrans_url })
    } catch (error) {
      alert("There something is wrong")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View
      style={{ padding: spacing.lg, flex: 1, backgroundColor: "#FFF", paddingBottom: spacing.xxxl }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            source={{ uri: image }}
            style={{ width: 150, height: 150, marginRight: spacing.md }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="star" size={24} color="#FCCD18" />
              <Text style={{ color: "#6E7485", marginLeft: spacing.sm }}>4.5</Text>
            </View>
            <Text size="md">{name}</Text>
            <Text size="sm" weight="bold" style={{ color: "#F6BE2C", marginVertical: 20 }}>
              {rupiah(price)}
            </Text>
          </View>
        </View>
        <View style={{ marginTop: spacing.xxl * 2 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: spacing.lg,
            }}
          >
            <Text style={{ color: "#6E7485" }}>Subtotal</Text>
            <Text>{rupiah(price)}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: spacing.lg,
            }}
          >
            <Text style={{ color: "#6E7485" }}>Coupon Discount</Text>
            <Text>0%</Text>
          </View>
          <View
            style={{ width: "100%", height: 2, backgroundColor: "#DDD", marginBottom: spacing.lg }}
          ></View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: spacing.lg,
            }}
          >
            <Text style={{ color: "#6E7485" }}>Total</Text>
            <Text size="xl">{rupiah(price)}</Text>
          </View>
        </View>
      </View>
      <Button
        style={{ backgroundColor: "#F6BE2C", borderWidth: 0 }}
        textStyle={{ color: "#FFF" }}
        onPress={checkOut}
      >
        {loading ? <ActivityIndicator size={"small"} /> : "Pay"}
      </Button>
    </View>
  )
})
