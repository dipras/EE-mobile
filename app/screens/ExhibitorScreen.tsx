import React, { FC, useState } from "react";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { View, ViewStyle, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Text, TextField } from "app/components";
import { ScrollView } from "react-native-gesture-handler";
import { colors, spacing } from "app/theme";
import validateInput from "app/utils/validateInput";


interface ExhibitorScreenProps extends AppStackScreenProps<"Exhibitor"> { }
export const ExhibitorScreen: FC<ExhibitorScreenProps> = observer(function Exhibitor(_props) {
    const { params } = _props.route;
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: ""
    })

    const submit = () => {
        if(verifyErr()) {
            _props.navigation.navigate("OrderSummary", { ...params, first_name, last_name, email, phone_number })
        }
    }

    const verifyErr = () => {
        const result = {
            first_name: new validateInput("first_name", first_name).notEmpty().result,
            last_name: new validateInput("last_name", last_name).notEmpty().result,
            email: new validateInput("email", email).notEmpty().isEmail().result,
            phone_number: new validateInput("phone_number", phone_number).notEmpty().result
        };
        setErrors(result);

        let response  = true;
        Object.values(result).forEach(v => {
            if(v !== "") response = false;
        })

        return response;
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, marginBottom: spacing.xxl }} keyboardVerticalOffset={100}>
            <ScrollView style={{ flex: 1, backgroundColor: "#FFF", paddingHorizontal: spacing.lg }}>
                <Text>Join Trade Expo Indonesia 2024 today and get the global exposure for your products and services. Complete the form below and our sales representative will contact you. *Please fill in the required (*) fields </Text>
                <TextField
                    containerStyle={$textField}
                    inputWrapperStyle={$textFieldWrapper}
                    autoCapitalize="words"
                    autoCorrect={false}
                    label="First Name"
                    placeholder="Enter First Name"
                    value={first_name}
                    onChangeText={text => setFirstName(text)}
                    helper={errors.first_name}
                    status={errors.first_name !== "" ? "error" : undefined}
                />
                <TextField
                    containerStyle={$textField}
                    inputWrapperStyle={$textFieldWrapper}
                    autoCapitalize="words"
                    autoCorrect={false}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    value={last_name}
                    onChangeText={text => setLastName(text)}
                    helper={errors.last_name}
                    status={errors.last_name !== "" ? "error" : undefined}
                />
                <TextField
                    containerStyle={$textField}
                    inputWrapperStyle={$textFieldWrapper}
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoComplete="email"
                    label="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    helper={errors.email}
                    status={errors.email !== "" ? "error" : undefined}
                />
                <TextField
                    containerStyle={$textField}
                    inputWrapperStyle={$textFieldWrapper}
                    autoCorrect={false}
                    keyboardType="phone-pad"
                    label="Phone"
                    placeholder="Enter Phone"
                    value={phone_number}
                    onChangeText={text => setPhoneNumber(text)}
                    helper={errors.phone_number}
                    status={errors.phone_number !== "" ? "error" : undefined}
                />
                <Button style={{ backgroundColor: colors.main, borderColor: colors.main }} textStyle={{ color: "#FFF" }} onPress={submit}>Submit</Button>
            </ScrollView>
        </KeyboardAvoidingView>
    )
})

const $textFieldWrapper: ViewStyle = {
    backgroundColor: "#F2F2F2",
    borderRadius: 30,
    borderWidth: 0,
    paddingVertical: 5,
}


const $textField: ViewStyle = {
    marginBottom: spacing.lg,
    backgroundColor: "white",
}