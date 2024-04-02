import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import { View, ImageBackground, TouchableOpacity } from "react-native"
import { Button, Text } from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { StatusBar } from "expo-status-bar"
import { colors, spacing } from "app/theme"

interface BoardingSignScreenProps extends AppStackScreenProps<"BoardingSign"> { }

const signBg = require("../../assets/images/boarding/landing-sign.png")
export const BoardingSignScreen: FC<BoardingSignScreenProps> = observer(function BoardingSignScreen(_props) {
    const {
        statusStore: { setSecondTime },
    } = useStores()

    const signIn = () => {
        _props.navigation.push("Login", {});
        setSecondTime();
    }

    return (
        <ImageBackground source={signBg} resizeMode="cover" style={{ flex: 1, justifyContent: "flex-end", paddingVertical: spacing.xxl * 2 }}>
            <StatusBar style="light" />
            <View style={{ paddingHorizontal: 10, rowGap: spacing.xl }}>
                <Text style={{ color: colors.main, fontSize: 30, textAlign: "center" }} size="xl" weight="bold">{`Welcome to\nExpert Export Indonesia`}</Text>
                <View style={{ rowGap: spacing.md }}>
                    <Button style={{ backgroundColor: colors.main, borderColor: colors.main, borderRadius: 10 }} textStyle={{ color: "#FFF" }}>Create Account</Button>
                    <Button style={{ backgroundColor: "transparent", borderColor: colors.main, borderRadius: 10 }} textStyle={{ color: colors.main }} onPress={signIn}>Sign In</Button>
                </View>
                <Text style={{ color: colors.main, textAlign: "center", textDecorationLine: "underline" }} onPress={() => setSecondTime()}>Sign In Later</Text>
            </View>
        </ImageBackground>
    )
})