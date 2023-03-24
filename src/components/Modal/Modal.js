import React from 'react';
import { KeyboardAvoidingView, Dimensions, StyleSheet, SafeAreaView, View } from 'react-native'
import { useSelector } from 'react-redux'
import Modal from "react-native-modal";

const { width } = Dimensions.get("window");

const CustomModal = props => {
    const { 
        modalElement,
        onClosed,
        padding=16,
        maxHeight='100%',
        height=null,
        overlay=false,
        visible
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        Container: {
            margin: 0, 
            justifyContent: 'flex-end',
        },
        Body: {
            borderTopLeftRadius: !overlay ? 20 : 0, 
            borderTopRightRadius: !overlay ? 20 : 0,
            backgroundColor: theme['--bg-color'],
            height: overlay ? '100%' : height,
            maxHeight: maxHeight,
            paddingTop: 16,
            paddingHorizontal: overlay ? 0 : padding,
        },
        Handle: {
            position: 'absolute',
            width: 50,
            borderWidth: 2,
            borderColor: theme['--text-color-300'],
            borderRadius: 5,
            left: width/2 - 25,
            top: 16
        }
    })

    return (
        <Modal
            statusBarTranslucent
            avoidKeyboard={true}
            useNativeDriverForBackdrop={true}
            isVisible={!!visible}
            onBackButtonPress={onClosed}
            onBackdropPress={onClosed}
            swipeDirection={'down'}
            onSwipeComplete={onClosed}
            style={styles.Container}
            propagateSwipe={true}
            scrollOffset={100}
            >
            <SafeAreaView/>
            <KeyboardAvoidingView behavior={'height'} style={styles.Body}>
                <View style={styles.Handle}/>
                {modalElement && React.cloneElement(modalElement, { width: width, onClose: onClosed })}
            </KeyboardAvoidingView>
        </Modal>
    )
    
}

export default CustomModal;