import { Button, Text } from "app/components"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useStores } from "app/models"
import { AppStackScreenProps } from "app/navigators"
import { colors, spacing } from "app/theme"
import { getPurchaseHistory } from "app/utils/api/order.api"
import { rupiah } from "app/utils/formatText"
import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import { ActivityIndicator, TouchableOpacity, View, ViewStyle } from "react-native"
import { FlatList } from "react-native-gesture-handler"

interface PurchaseHistoryScreenProps extends AppStackScreenProps<"PurchaseHistory"> {}
export const PurchaseHistoryScreen: FC<PurchaseHistoryScreenProps> = observer(
  function PurchaseHistoryScreen(_props) {
    const {
      authenticationStore: { authToken },
    } = useStores()
    const { data, fetchNextPage, isLoading } = useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["purchaseHistory"],
      queryFn: ({ pageParam }: { pageParam: number }) => getPurchaseHistory(authToken, 8, pageParam).then(res => res.data),
      getNextPageParam: (lastPage) => {
        return lastPage.meta.currentPage + 1
      },
    })
    const notLastPage = useMemo(() => data && Number(data.pageParams.pop()) < data.pages[0].meta.totalPages, [data]);
    const histories = useMemo(() => {
      let result: any = [];
      data?.pages.forEach(page => page.data.forEach((data: any) => result.navigate(data)));

      if(notLastPage) {
        result.navigate(null);
      }
      return result;
    }, [data]);

    const handlePress = (status: string, url: string) => {
      if (status !== "Completed") {
        _props.navigation.navigate("Payment", { url })
      }
    }

    const renderItem = ({ item, index }: { item: any; index: number }) => {

      if(!item) {
        return <ActivityIndicator size={"large"} />
      }
      return (
        <View style={{ flexDirection: "row", justifyContent: "center" }} key={index}>
          <View style={$wishtlist}>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ overflow: "hidden" }} size="md" weight="bold" numberOfLines={1}>
                  {item.product_type.name}
                </Text>
                <View style={{ borderWidth: 1, borderColor: colors.main, padding: spacing.xxs }}>
                  <Text>{item.status}</Text>
                </View>
              </View>
              <View>
                <Text>Paid: {item.created_at}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <View>
                    <Text>Price</Text>
                    <Text size="sm" weight="bold">
                      {rupiah(item.price)}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => handlePress(item.status, item.snapUrl)} style={{display: item.status == "Canceled" ? "none" : "flex"}}>
                    <View
                      style={{
                        backgroundColor: colors.main,
                        borderRadius: spacing.sm,
                        paddingHorizontal: spacing.lg,
                        paddingVertical: spacing.xs,
                      }}
                    >
                      <Text style={{ color: "#FFF" }}>
                        {item.status === "Completed" ? "Appointment" : "Pay Now"}
                      </Text>
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
      <View style={{ paddingHorizontal: spacing.md, flex: 1 }}>
        <FlatList data={histories} renderItem={renderItem} style={{ flex: 1, marginBottom: 50 }} showsVerticalScrollIndicator={true} onEndReached={() => fetchNextPage()} ListEmptyComponent={isLoading ? <ActivityIndicator size={"large"} /> : <Text style={{textAlign: "center"}}>Your history is empty</Text>} />
      </View>
    )
  },
)

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
  columnGap: 10,
}
