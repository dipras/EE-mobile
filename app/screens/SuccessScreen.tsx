import React, {FC} from "react";
import { AppStackScreenProps } from "app/navigators";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, View } from "react-native";
import { Button, Text } from "app/components";
import { colors, spacing } from "app/theme";

const successImg = require("assets/images/success.png");

interface SuccessScreenProps extends AppStackScreenProps<"Success"> {}

export const SuccessScreen: FC<SuccessScreenProps> = (_props) => {
    return (
        <SafeAreaView style={{flex: 1, padding: spacing.xl}}>
            <View style={{rowGap: 20, flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image source={successImg} style={{alignSelf: "center"}} />
                <Text style={{textAlign: "center"}} weight="bold" size="xl">Congratulation</Text>
                <Text style={{textAlign: "center"}}>You have successfully made payment and enrolled the course</Text>
            </View>
            <Button style={{backgroundColor: colors.main}} textStyle={{color: "white"}} onPress={() => _props.navigation.replace("Main", {screen: "Home", params: {}})}>Go Back To Home</Button>
        </SafeAreaView>
    )
}