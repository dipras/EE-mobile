import React, {FC} from "react";
import { AppStackScreenProps } from "app/navigators";
import { SafeAreaView } from "react-native";
import ComingSoon from "app/components/ComingSoon";

interface SurveyScreenProps extends AppStackScreenProps<"Survey"> {}

export const SurveyScreen: FC<SurveyScreenProps> = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <ComingSoon />
        </SafeAreaView>
    )
}