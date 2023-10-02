import React from "react";
import { View } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import colors from "../../../assets/themes/colors";
import { Enums } from "../../../constants/Enum/enum";

const CustomAlert = ({ show = false, showProgress = false, closeOnTouchOutside = true,
    closeOnHardwareBackPress = false, showCancelButton = false, showConfirmButton = true,
    title = "Talentrii", message, cancelText, confirmText, buttonTapped }) => {
    return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff'
        }}>
            <AwesomeAlert
                show={show}
                showProgress={showProgress}
                title={title}
                message={message}
                closeOnTouchOutside={closeOnTouchOutside}
                closeOnHardwareBackPress={closeOnHardwareBackPress}
                showCancelButton={showCancelButton}
                showConfirmButton={showConfirmButton}
                cancelText={cancelText}
                confirmText={confirmText}
                cancelButtonColor={colors.Black}
                confirmButtonColor={colors.Green}
                onCancelPressed={() => {
                    buttonTapped(Enums.AlertButtons.CANCEL)
                }}
                onConfirmPressed={() => {
                    buttonTapped(Enums.AlertButtons.CONFIRM)
                }}
            />
        </View>
    )
};
export default CustomAlert;