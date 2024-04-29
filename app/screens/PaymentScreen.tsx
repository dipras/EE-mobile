import React, { FC } from "react"
import { AppStackScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import { View } from "react-native"
import WebView from "react-native-webview"
import { spacing } from "app/theme"

interface PaymenScreenScreenProps extends AppStackScreenProps<"Payment"> {}
export const PaymenScreenScreen: FC<PaymenScreenScreenProps> = observer((_props) => {
  const navigationChange = (state: any) => {
    const url = new URL(state.url)
    if (url.hostname.includes("exportexpert")) {
      _props.navigation.navigate("Success")
    }
  }

  return (
    <View style={{ flex: 1, marginBottom: spacing.xxxl }}>
      <WebView
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        cacheMode="LOAD_NO_CACHE"
        source={{ uri: _props.route.params.url }}
        onNavigationStateChange={navigationChange}
      ></WebView>
    </View>
  )
})
