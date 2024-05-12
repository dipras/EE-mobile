import React, { FC, useEffect } from "react"
import WebView from "react-native-webview"
import { View } from "react-native";
import { AppStackScreenProps } from "app/navigators";
import { spacing } from "app/theme";
import { observer } from "mobx-react-lite";
import { parseJwt } from "app/utils/helpers";
import { useStores } from "app/models";

interface PrivyLoginScreenProps extends AppStackScreenProps<"PrivyLogin"> { }

export const PrivyLoginScreen: FC<PrivyLoginScreenProps> = observer((_props) => {
    const {authenticationStore: {setAuthName, setAuthToken, setExpiredtimestamp}} = useStores();

    const handleNavigation = (state: any) => {
        const url = new URL(state.url);
        const jwt = url.searchParams.get("jwt");
        if (url.hostname.includes("exportexpert") && jwt) {
            const payload = parseJwt(`${jwt}`);
            setAuthToken(jwt);
            setAuthName(payload.name);
            setExpiredtimestamp(payload.exp);

            _props.navigation.replace("Main", { screen: "Home", params: {} })
        }
    }

    return (
        <View style={{ flex: 1, marginBottom: spacing.xxxl }}>
            <WebView
                userAgent={"EE-Mobile"}
                javaScriptEnabled={true}
                javaScriptCanOpenWindowsAutomatically={true}
                domStorageEnabled={true}
                cacheEnabled={true}
                allowFileAccessFromFileURLs={true}
                allowFileAccess={true}
                cacheMode="LOAD_NO_CACHE"
                source={{ uri: "https://stg-oauth.privy.id/oauth/authorize?client_id=-5QbOP3qpVWGt04xNm_14_FJ4kNgMN_ZCX3X5MDC7Gs&redirect_uri=https://exportexpert.id/privy_handle&scope=read&response_type=code&register=true" }}
                onNavigationStateChange={handleNavigation}
            ></WebView>
        </View>
    )
})