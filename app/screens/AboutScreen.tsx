import React, { FC } from "react";
import { AppStackScreenProps } from "app/navigators";
import { Text } from "app/components";
import { ScrollView } from "react-native-gesture-handler";
import { View, ViewStyle, TouchableOpacity, Image } from "react-native";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { colors, spacing } from "app/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

const AboutImg = require("assets/images/about.png");
const logoText = require("assets/images/logo-text.png");

interface AboutScreenProps extends AppStackScreenProps<"About"> { }
export const AboutScreen: FC<AboutScreenProps> = (_props) => {
    return (
        <SafeAreaProvider>
            <View style={$header}>
                <View style={roundFlyStyle}></View>
                <View style={headerContentStyle}>
                    <TouchableOpacity onPress={() => _props.navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="black" style={{ marginRight: spacing.lg }} />
                    </TouchableOpacity>
                    <Text size="md" weight="medium">About Export Expert Indonesia</Text>
                </View>
            </View>
            <ScrollView>
                <View style={$banner}>
                    <Image source={AboutImg} style={{ height: 200, width: 276 }} />
                </View>
                <View style={{ padding: spacing.lg, rowGap: spacing.lg, paddingBottom: spacing.xxl }}>
                    <Text size="xl" weight="bold">About Us</Text>
                    <Text>Export Expert Indonesia is an information, education and solution platform for entrepreneurs who want to transform into exporters We come with the spirit of "Let's be EXPERTS, Let's Export!!", inviting you to explore global opportunities and achieve success together through the expertise of our Export Expert team.</Text>
                    <View style={{ rowGap: spacing.md }}>
                        <Image source={logoText} style={{ width: 150, height: 40 }} />
                        <View style={{ rowGap: spacing.sm }}>
                            <Text weight="bold" size="lg" style={{ color: colors.main }}>Contact</Text>
                            <View style={{ flexDirection: "row", columnGap: spacing.sm }}>
                                <FontAwesome5 name="phone" size={24} color="black" />
                                <Text>(406) 555-0120</Text>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: spacing.sm }}>
                                <FontAwesome5 name="envelope" size={24} color="black" />
                                <Text>semogaberkah23@gmail.com</Text>
                            </View>
                            <View style={{ flexDirection: "row", columnGap: spacing.sm }}>
                                <Entypo name="location-pin" size={24} color="black" />
                                <Text>2972 Westheimer Rd. Santa Ana, Illinois 85486 </Text>
                            </View>
                        </View>
                        <View style={{ rowGap: spacing.sm }}>
                            <Text weight="bold" size="lg" style={{ color: colors.main }}>Social Media</Text>
                            <View style={{ flexDirection: "row", columnGap: spacing.sm }}>
                                <FontAwesome5 name="youtube" size={24} color="black" />
                                <FontAwesome5 name="tiktok" size={24} color="black" />
                                <FontAwesome5 name="instagram" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

const $header: ViewStyle = {
    backgroundColor: "#FCCD18",
    width: "100%",
}

const $banner: ViewStyle = {
    backgroundColor: "#FCCD18",
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: spacing.md,
    paddingVertical: 10,
    alignItems: "flex-end"
}
const roundFlyStyle: ViewStyle = { backgroundColor: "#F2BD00", width: 100, height: 100, borderRadius: 50, position: "absolute", right: 0, top: -30 };

const headerContentStyle: ViewStyle = { alignItems: "center", flexDirection: "row", padding: 20, marginTop: 30 };