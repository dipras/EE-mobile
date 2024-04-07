import React, {FC} from "react";
import { AppStackScreenProps } from "app/navigators";
import { SafeAreaView } from "react-native";
import ComingSoon from "app/components/ComingSoon";

interface HalalScreenProps extends AppStackScreenProps<"Halal"> {}

export const HalalScreen: FC<HalalScreenProps> = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ComingSoon />
        </SafeAreaView>
    )
}