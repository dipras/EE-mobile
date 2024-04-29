import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import {
  View, ViewStyle, Image, TouchableOpacity
} from "react-native"
import {
  Text,
  Button
} from "../components"
import { MainTabScreenProps } from "../navigators/MainNavigator"
import { colors, spacing } from "app/theme"
import { useStores } from "app/models"
import { rupiah } from "app/utils/formatText"
import { FlatList } from "react-native-gesture-handler"
import { EvilIcons } from "@expo/vector-icons"

export const CartScreen: FC<MainTabScreenProps<"Cart">> = observer(
  function CartScreen(_props) {
    const { CartStore: { cartData, removeCartById } } = useStores();
    const [selected, setSelected] = useState(0);
    const [react, setReact] = useState(0);

    const pay = () => {
      _props.navigation.navigate("OrderSummary", { id: cartData[selected].id, image: cartData[selected].imageUrl, price: Number(cartData[selected].price), productType: cartData[selected].productType, name: cartData[selected].name });
    }

    const renderItem = ({ item, index }: any) => {
      return (
        <View style={{ flexDirection: "row", justifyContent: "center" }} key={index}>
          <TouchableOpacity style={[$cart, (index === selected ? $cartActive : [])]} onPress={() => setSelected(index)}>
            <Image source={{ uri: item.imageUrl }} style={{ height: "100%", width: "30%", borderRadius: 10 }} />
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <Text style={{ overflow: "hidden" }} size="md" weight="bold" numberOfLines={1}>{item.name}</Text>
              <Text style={{ color: "#575757" }}>{item.productType.name}</Text>
              <Text size="sm" weight="bold">{rupiah(item.price)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    const handleRemoveCart = () => {
      const cart = cartData[selected];
      removeCartById(cart.id, cart.productType.name);
      setReact(react + 1);
    }

    return (
      <View style={{ paddingHorizontal: spacing.md, flex: 1, paddingTop: 50 }}>
        {cartData[0] ? (
          <>
            <FlatList data={cartData} renderItem={renderItem} style={{ flex: 1 }} />

            {cartData[selected] ? (
              <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text>Total (1 Item)</Text>
                  <Text weight="bold">{rupiah(cartData[selected].price)}</Text>
                </View>
                <View style={{ flexDirection: "row", columnGap: spacing.sm, alignItems: "center" }}>
                  <Button style={{ backgroundColor: colors.main, borderRadius: 10, marginVertical: spacing.xl, borderColor: "#FFF", flexGrow: 1 }} textStyle={{ color: "#FFF" }} onPress={pay}>Proccess to checkout</Button>
                  <TouchableOpacity onPress={handleRemoveCart}>
                    <EvilIcons name="trash" size={48} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text size="xl" style={{textAlign: "center", marginBottom: spacing.md}}>Please select an item first</Text>
              </View>
            )}
          </>
        ) : (
          <Text style={{ textAlign: "center" }}>Cart is empty</Text>
        )}
      </View>
    )
  }
)

const $cart: ViewStyle = {
  height: 120,
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

const $cartActive: ViewStyle = {
  borderColor: colors.main,
  borderWidth: 1
}