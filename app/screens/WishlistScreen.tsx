import {FC} from "react"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { Button, Text } from "app/components"
import { View, TouchableOpacity, Image, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { spacing, colors } from "app/theme"
import { rupiah } from "app/utils/formatText"

const noImage = require("assets/images/no-image.png");

const wishListData = [{
    name: "lorem",
    price: 3000,
    id: 15

}]

interface WishlistScreenProps extends AppStackScreenProps<"Wishlist"> {}
export const WishlistScreen: FC<WishlistScreenProps> = observer(function WishlistScreen(_props) {
    const renderItem = ({ item, index }: any) => {
        return (
          <View style={[{ flexDirection: "row", justifyContent: "center" }]} key={index}>
            <TouchableOpacity style={$wishtlist}>
              <Image source={noImage} style={{ height: spacing.xxxl * 2, width: spacing.xxl * 2, borderRadius: 10 }} />
              <View style={{ flex: 1, justifyContent: "space-between" }}>
                <Text style={{ overflow: "hidden" }} size="md" weight="bold" numberOfLines={1}>{item.name}</Text>
                <Text size="sm" weight="bold">{rupiah(item.price)}</Text>
                <Button onPress={() => _props.navigation.push("CourseDetail", {id: 15})} style={{width: 150, padding: 0, margin: 0, minHeight: 0, backgroundColor: colors.main, borderColor: "#FFF", borderRadius: 10}} textStyle={{color: "white"}}>Visit product</Button>
              </View>
            </TouchableOpacity>
          </View>
        )
      }


    return (
        <View style={{ paddingHorizontal: spacing.md, flex: 1, paddingTop: 50 }}>
          <FlatList data={wishListData} renderItem={renderItem} style={{flex: 1}} />
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