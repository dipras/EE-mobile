import { Text } from "app/components";
import React, { FC } from "react";
import { ImageSourcePropType, View, ViewStyle } from "react-native";
import { Image } from "react-native";

type CourseCard = {
    avatar: ImageSourcePropType;
    name: string;
    description: string;
}
export const CourseCard: FC<CourseCard> = (_props) => {
    return (
        <View style={cardStyle}>
            <Image source={_props.avatar} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 20 }} />
            <View style={{ flex: 1, flexGrow: 1 }}>
                <Text weight="bold" style={{ marginBottom: 10 }}>{_props.name}</Text>
                <Text>{_props.description}</Text>
            </View>
        </View>
    )
}

const cardStyle: ViewStyle = {
    height: 100,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
    zIndex: 10,
    marginBottom: 20,
    flexDirection: "row",
    padding: 10,
    width: "100%"
}