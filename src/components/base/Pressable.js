import React from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import Ripple from 'react-native-material-ripple';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

export const Pressable = props => {
    const {
        onPress,
        onLongPress,
        onClose,
        modal,
        modal_type='BOTTOM_SHEET',
        disabled=false,
        scrim=true
    } = props;
    const ref = React.useRef()
    const insets = useSafeAreaInsets();
    const stylesheet = createStyleSheet(theme => {
        return {
            ModalContainer: {
                backgroundColor: !scrim ? theme.colors.base.surface_200 : theme.colors.base.surface_100,
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
            },
        }
    });
    const { styles, theme } = useStyles(stylesheet)
    const [show_modal, setModal] = React.useState(false)

    const onPressHandler = event => {
        onPress?.(event)
        modal && modal_type === 'BOTTOM_SHEET' && ref.current?.present()
        modal && modal_type === 'NATIVE' && setModal(true)
    }

    const close = () => {
        modal && modal_type === 'BOTTOM_SHEET' && ref.current?.dismiss()
        modal && modal_type === 'NATIVE' && setModal(false)
        onClose?.()
    }

    const renderDialog = () => {
        const modal_w_props = modal && React.cloneElement(modal, { isVisible: show_modal, close })
        const backgroundColor = !scrim ? theme.colors.base.surface_200 : theme.colors.base.surface_100
        // return modal_w_props
        switch(modal_type) {
            case 'NATIVE':
                return modal_w_props
            default: 
                return (
                    <BottomSheetModal ref={ref} 
                        style={styles.ModalContainer} 
                        handleStyle={{backgroundColor, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingTop: theme.spacing.md}}
                        handleIndicatorStyle={{backgroundColor: theme.colors.gray.border_100}}
                        backgroundStyle={{backgroundColor}}
                        backdropComponent={scrim && CustomBackdrop}
                        enablePanDownToClose={true}
                        >
                        <BottomSheetView style={{
                            paddingHorizontal: theme.spacing.md, 
                            paddingTop: theme.spacing.xs, 
                            paddingBottom: insets.bottom,
                        }}>
                            {modal_w_props}
                        </BottomSheetView>
                    </BottomSheetModal>
                )
        }
    }

    return (
        <Ripple 
            style={props.style}
            rippleContainerBorderRadius={props.style?.borderRadius}
            onPress={onPressHandler}
            onLongPress={onLongPress}
            disabled={disabled}
            onLayout={props.onLayout}
            // rippleDuration={0}
            >
            {props.children}
            {renderDialog()}
        </Ripple>
    )
}

const CustomBackdrop = ({ animatedIndex, style }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        ...style,
        backgroundColor: '#000',
        opacity: interpolate(
            animatedIndex.value,
            [-1, 0],
            [0, 0.5],
            Extrapolate.CLAMP
        )
    }));
  
    return <Animated.View style={containerAnimatedStyle}/>;
  };
