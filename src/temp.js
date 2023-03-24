const scale = useSharedValue(1)
const translateX = useSharedValue(0)
const translateY = useSharedValue(0)
const pinch = Gesture.Pinch().enabled()
.onUpdate(e => {
	scale.value = e.scale
})

const pan = Gesture.Pan().enabled()
.onUpdate(e => {
	translateX.value = e.translationX
	translateY.value = e.translationY
})

const composed = Gesture.Simultaneous(pinch, pan) 

const imageStyles = useAnimatedStyle(() => {
	return {
		width: '100%', height: '100%', flex: 1, transform: [{ scale: scale.value} , {translateX: translateX.value}, {translateY: translateY.value} ]
	}
})

<GestureDetector gesture={composed}>
    <View style={{flex: 1, borderWidth: 1, width: '100%'}}>
        <Animated.Image
            resizeMode={'contain'}
            style={imageStyles}
            source={{uri: 'https://uploads.mangadex.org/data/f3d3e81b7e693bcbcacd8fb3a503ea92/1-ca07a768c5ec9f981bd59a067ac45b9b0f5c2fed704883fc535785f8e6404aff.png'}}
            />
        
        <Animated.Image
            resizeMode={'contain'}
            style={imageStyles}
            source={{uri: 'https://uploads.mangadex.org/data/f3d3e81b7e693bcbcacd8fb3a503ea92/1-ca07a768c5ec9f981bd59a067ac45b9b0f5c2fed704883fc535785f8e6404aff.png'}}
            />
    </View>
    
</GestureDetector>