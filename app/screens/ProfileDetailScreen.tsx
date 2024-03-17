import React, { FC, useEffect, useState } from "react";
import { Button, Text, TextField } from "app/components";
import { AppStackScreenProps } from "app/navigators";
import { observer } from "mobx-react-lite";
import { Screen } from "app/components";
import { ActivityIndicator, Image, TextInputChangeEventData } from "react-native";
import { View, ViewStyle } from "react-native";
import { spacing } from "app/theme";
import { meApi, updateUserApi, updateUserData } from "app/utils/api/auth.api";
import { useStores } from "app/models";
import DatePicker from "react-native-date-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';

const avatarImg = require("../../assets/images/avatar.jpg");


const avatarSize = 150;

interface ProfileDetailScreenProps extends AppStackScreenProps<"ProfileDetail"> { }
export const ProfileDetailScreen: FC<ProfileDetailScreenProps> = observer((_props) => {
    const { authenticationStore: { authToken, setAuthName, authName } } = useStores();

    const [name, setName] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("0");
    const [domicile, setDomicile] = useState("");
    const [loading, setLoading] = useState(true);
    const [nik, setNik] = useState("");
    const [npwp, setNpwp] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await meApi(authToken);
            const data = response.data.data;
            console.log(data);
            setName(data.name);
            setDate(new Date(data.date_of_birth));
            setPhone(data.phone_number);
            setGender(data.gender == "Perempuan" ? "1" : "0");
            setDomicile(data.domicile);
            setNik(data.nik);
            setNpwp(data.npwp);
        } catch (error) {
            alert("There something is wrong");
        } finally {
            setLoading(false)
        }
    }

    const saveData = async () => {
        const data : updateUserData = {
            name,
            dateOfBirth: date.toISOString().substring(0, 10),
            gender: Number(gender),
            phoneNumber: phone.replace("+62", "08"),
            domicile,
            nik,
            npwp
        }

        setLoading(true)
        try {
            await updateUserApi(authToken, data);
            alert("Success update data!");
            _props.navigation.goBack();
        } catch (error) {
            alert("There something is wrong");
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const setPhoneEvent = (text: string) => {
        text = text.replace("+62", "");
        let temp = Number(text);

        setPhone(`+62${temp || ""}`);
    }

    return (
        <Screen preset="scroll" safeAreaEdges={["bottom"]} style={{ paddingHorizontal: spacing.lg, paddingVertical: 0, marginBottom: 0 }} keyboardOffset={100}>
            <View style={{marginBottom: 30}}>
                <Image
                    source={avatarImg}
                    style={{
                        width: avatarSize,
                        height: avatarSize,
                        borderRadius: avatarSize / 2,
                        alignSelf: "center",
                        marginBottom: 10,
                    }}
                />
                <Text size="lg" weight="bold" style={{ textAlign: "center" }}>Hello, {authName}</Text>
            </View>

            <View>
                {loading && (
                    <View style={{backgroundColor: "rgba(0,0,0, 0.2)", position: "absolute", width: "100%", height: "100%", zIndex: 999, justifyContent: "center"}}>
                        <ActivityIndicator size="large" color="#F6BE2C" />
                    </View>
                )}
                <TextField
                    value={name}
                    containerStyle={$textField}
                    inputWrapperStyle={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: 30,
                        borderWidth: 0,
                        paddingVertical: 5,
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={text => setName(text)}
                    label="Nama"
                    placeholder="Masukan nama anda"
                />
                <View style={{ marginBottom: 20 }}>
                    <Text weight="bold" style={{ marginBottom: 5 }}>Tanggal Lahir</Text>
                    <TouchableOpacity onPress={() => setOpenDate(true)}>
                        <View style={{ backgroundColor: "#F2F2F2", padding: 10, borderRadius: 30 }}>
                            <Text>{`${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}`}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                <TextField
                    value={nik}
                    containerStyle={$textField}
                    inputWrapperStyle={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: 30,
                        borderWidth: 0,
                        paddingVertical: 5,
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={text => setNik(text)}
                    label="NIK"
                    placeholder="Masukan nama anda"
                />
                <TextField
                    value={npwp}
                    containerStyle={$textField}
                    inputWrapperStyle={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: 30,
                        borderWidth: 0,
                        paddingVertical: 5,
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={text => setNpwp(text)}
                    label="NPWP"
                    placeholder="Masukan NPWP anda"
                />

                <DatePicker
                    modal
                    open={openDate}
                    date={date}
                    mode="date"
                    onConfirm={(date) => {
                        setOpenDate(false)
                        setDate(date)
                    }}
                    onCancel={() => {
                        setOpenDate(false)
                    }}
                />
                <TextField
                    value={phone}
                    containerStyle={$textField}
                    inputWrapperStyle={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: 30,
                        borderWidth: 0,
                        paddingVertical: 5,
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    inputMode="numeric"
                    onChangeText={setPhoneEvent}
                    label="Nomor HP"
                    placeholder="Masukan nomor HP anda"
                />
                <View style={{ marginBottom: 20 }}>
                    <Text weight="bold" style={{ marginBottom: 5 }}>Gender</Text>
                    <View style={{ backgroundColor: "#F2F2F2", borderRadius: 30 }}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }>
                            <Picker.Item label="Male" value="0" />
                            <Picker.Item label="Female" value="1" />
                        </Picker>
                    </View>
                </View>
                <TextField
                    value={domicile}
                    containerStyle={$textField}
                    inputWrapperStyle={{
                        backgroundColor: "#F2F2F2",
                        borderRadius: 30,
                        borderWidth: 0,
                        paddingVertical: 5,
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    onChangeText={text => setDomicile(text)}
                    label="Masukan domisili anda"
                    placeholder="Domisili"
                />
                <Button style={{backgroundColor: "#F6BE2C", borderRadius: 10, marginBottom: 50}} onPressOut={saveData}>
                    <Text style={{color: "white"}}>Save</Text>
                </Button>
            </View>

        </Screen>
    )
})

const $textField: ViewStyle = {
    marginBottom: spacing.lg,
    backgroundColor: "white",
}