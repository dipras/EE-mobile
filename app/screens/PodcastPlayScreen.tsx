import React, { FC } from "react"
import { AppStackScreenProps } from "app/navigators"
import YoutubePlayer from "react-native-youtube-iframe"
import { spacing } from "app/theme"
import { Text } from "app/components"
import { Dimensions, View } from "react-native"
import RenderHTML from "react-native-render-html"
import { ScrollView } from "react-native-gesture-handler"

interface PodcastPlayScreenProps extends AppStackScreenProps<"PodcastPlay"> { }

const {width: SCREEN_WIDTH} = Dimensions.get("screen")
export const PodcastPlayScreen: FC<PodcastPlayScreenProps> = (_props) => {
    const { data } = _props.route.params;
    return (
        <View style={{padding: spacing.xl}}>
            <YoutubePlayer
                height={300}
                videoId={data.url.split("/").pop()}
                webViewProps={{
                    injectedJavaScript: `
                      var element = document.getElementsByClassName('container')[0];
                      element.style.position = 'unset';
                      true;
                    `,
                }}
            />
            <ScrollView style={{marginTop: spacing.xl}}>
                <Text weight="bold" size="lg">{data.title}</Text>
                <RenderHTML source={{html: data.description}} contentWidth={SCREEN_WIDTH - (spacing.xl * 2)} />
            </ScrollView>
        </View>
    )
}