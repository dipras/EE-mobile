import { spacing } from "app/theme";
import React, { FC } from "react";
import { Image, View } from "react-native";
import { Text } from "./Text";

const rocket = require("assets/images/rocket-comingsoon.png");

const ComingSoon : FC = () => {
    return (
        <View style={{flex: 1, backgroundColor: "#F0F0F0", justifyContent: "center", alignItems: "center", rowGap: spacing.lg, paddingHorizontal: spacing.lg}}>
            <Image source={rocket} style={{height: 150, width: 150}} />
            <View>
                <Text style={{textAlign: "center", color: "#4E5566"}} size="lg" weight="bold">COMING SOON</Text>
                <Text style={{textAlign: "center"}}>We will celebrating the launch of our new feature very soon</Text>
            </View>
        </View>
    )
}

export default ComingSoon;