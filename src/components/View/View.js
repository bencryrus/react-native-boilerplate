import React from 'react';
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux' 
import { Modal } from '../Modal'
import Ripple from 'react-native-material-ripple';

const CustomView = props => {
    const {
        onPress,
        onLongPress,
        modal,
        modalProps,
        onModalClose,
        overlay
    } = props;
    const theme = useSelector(state => state.db.theme)
    const styles = StyleSheet.create({
        color: theme['--text-color'],
        backgroundColor: 'transparent',
    });

    const [modalElement, setModal] = React.useState(null)
    const onModalHandler = () => {
        if(modalElement) {
            setModal()
        } else {
            modal && setModal(modal)
        }
        modalElement && onModalClose && onModalClose()
    }

    const onPressHandler = (event) => {
        modal ? onModalHandler() : onPress && onPress(event)
        if(modal && !onModalHandler()){
            onPress && onPress(event)
        }
    }

    if(onPress || modal) {
        return (
            <Ripple 
                onPress={onPressHandler} 
                onLongPress={onLongPress}
                style={[styles, props.containerStyle]}
                >
                <View {...props} style={[styles, props.styles]}/>
                {modal && <Modal
                    modalElement={modalElement && React.cloneElement(modalElement, {onClose: () => setModal()})}
                    overlay={overlay}
                    onClosed={onModalHandler}
                    visible={modalElement}
                    {...modalProps}
                />}
            </Ripple>
        )
    } else {
        return (
            <View style={Array.isArray(props.styles) ? [styles, ...props.styles] : [styles, props.styles]} {...props}/>
        )
    }
}



export default CustomView