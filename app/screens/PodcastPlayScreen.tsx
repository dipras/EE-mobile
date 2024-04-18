import React, { FC } from "react"
import { AppStackScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"
import YoutubePlayer from "react-native-youtube-iframe"
import { spacing } from "app/theme"
import { Text } from "app/components"
import { Dimensions, View } from "react-native"
import RenderHTML from "react-native-render-html"

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
            <View style={{marginTop: spacing.xl}}>
                <Text weight="bold" size="lg">{data.title}</Text>
                <RenderHTML source={{html: data.description}} contentWidth={SCREEN_WIDTH - (spacing.xl * 2)} />
            </View>
        </View>
    )
}