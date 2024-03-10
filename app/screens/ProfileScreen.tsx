import React, { FC, useEffect } from "react"
import { View, ViewStyle, Image, TouchableOpacity } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Screen, Text } from "../components"
import { MainTabScreenProps } from "../navigators/MainNavigator"
import { spacing } from "../theme"
import { useStores } from "../models"

const avatar = require("../../assets/images/avatar.jpg")
const avatarSize = 150
export const ProfileScreen: FC<MainTabScreenProps<"Profile">> = observer(function DemoDebugScreen(
  _props,
) {
  const {
    authenticationStore: { logout, isAuthenticated, authName },
  } = useStores();

  useEffect(() => {
    if(!isAuthenticated) {
      const unsubscribe = _props.navigation.addListener('focus', () => {
        _props.navigation.replace("Main", { screen: "Home", params: {redirect: true} })
      });
  
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }
  }, []);

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      {isAuthenticated ? (
        <>
          <Image
            source={avatar}
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              alignSelf: "center",
              marginBottom: 10,
            }}
          />
          <Text size="lg" weight="bold" style={{ textAlign: "center" }}>
            {authName}
          </Text>
          <View>
            <TouchableOpacity>
              <TouchableOpacity onPress={() => _props.navigation.push("ProfileDetail")}>
                <Text size="md" weight="medium" style={$menu}>
                  Profile
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text size="md" weight="medium" style={$menu}>
                Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text size="md" weight="medium" style={$menu}>
                Notification
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text size="md" weight="medium" style={$menu}>
                Purchase History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text size="md" weight="medium" style={$menu}>
                Wishlist
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text size="md" weight="medium" style={$menu}>
                About Expert Export Indonesia
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            style={{ backgroundColor: "#F6BE2C", borderWidth: 0, borderRadius: 10, marginTop: 20 }}
            onPress={() => {
              logout()
              alert("Success Logout")
            }}
            textStyle={{ color: "white" }}
          >
            Log Out
          </Button>
        </>
      ) : (
        <Text style={{textAlign: "center"}} size="lg">You must login first</Text>
      )}
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $menu: ViewStyle = {
  borderBottomWidth: 1,
  borderBottomColor: "#E3E3E3",
  paddingVertical: 20,
}
