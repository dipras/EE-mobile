import { FC, useState } from "react"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { Button, Text } from "app/components"
import { View, TouchableOpacity, Image, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { spacing, colors } from "app/theme"
import { rupiah } from "app/utils/formatText"
import { useStores } from "app/models"
import { Wishlist } from "app/models/Wishlist"
import { EvilIcons } from "@expo/vector-icons"

const noImage = require("assets/images/no-image.png");

interface WishlistScreenProps extends AppStackScreenProps<"Wishlist"> { }
export const WishlistScreen: FC<WishlistScreenProps> = observer(function WishlistScreen(_props) {
  const { WishlistStore: { wishlistData, removeWishlistById, resetWishlist } } = useStores();
  const [counter, setCounter] = useState(0);

  const handleFunc = (callback: Function) => {
    setCounter(counter + 1);
    callback();
  }

  const handlePress = (id: number, product_type: string) => {
    let redirect: "CourseDetail" | "ExpertDetail" | "EventDetail" | "" = "";
    
    switch(product_type) {
      case "Course":
        redirect = "CourseDetail";
        break;
      case "Event":
        redirect = "EventDetail";
        break;
      case "Consultation":
        redirect = "ExpertDetail";
        break;
    }


    if(redirect == "") {
      alert("There something is wrong");
      resetWishlist();
    } else {
      _props.navigation.navigate(redirect, { id })
    }
  }

  const renderItem = ({ item, index }: { item: Wishlist, index: number }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "center" }} key={index}>
        <View style={$wishtlist}>
          <Image source={{ uri: item.imageUrl }} style={{ height: spacing.xxxl * 2, width: spacing.xxl * 2, borderRadius: 10 }} />
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <Text style={{ overflow: "hidden" }} size="md" weight="bold" numberOfLines={1}>{item.name}</Text>
            <Text style={{color: "#575757"}}>{item.productType.name}</Text>
            <Text size="sm" weight="bold">{rupiah(item.price)}</Text>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
              <Button onPress={() => handlePress(item.id, item.productType.name)} style={$btn} textStyle={{ color: "white" }}>Visit product</Button>
              <TouchableOpacity onPress={() => handleFunc(() => removeWishlistById(item.id, item.productType.name))}>
                <EvilIcons name="trash" size={48} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View style={{ paddingHorizontal: spacing.md, flex: 1, paddingTop: 50 }}>
      <FlatList data={wishlistData} renderItem={renderItem} style={{ flex: 1 }} />
    </View>
  )
})

const $wishtlist: ViewStyle = {
  height: 160,
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

const $btn : ViewStyle = { width: 150, padding: 0, margin: 0, minHeight: 0, backgroundColor: colors.main, borderColor: "#FFF", borderRadius: 10 };