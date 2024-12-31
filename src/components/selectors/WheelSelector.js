import React from 'react'
import { createStyleSheet, useStyles } from 'react-native-unistyles'

import { Text, View } from '../base';
import { Button } from '../core'
import { FlatList } from 'react-native'
import { FlashList } from "@shopify/flash-list";

import _ from 'lodash'

const MINOR_TICK_HEIGHT = 12
const MAJOR_TICK_HEIGHT = 24
const TICK_OFFSET = 16
const PRIMARY_N = 41
const SECONDARY_N = 21
const PRIMARY_LABEL_INTERVAL = 10
export const WheelSelector = props => {
    const {
        initial=0,
        decimal=false,
        increments=[-20,-10,10,20],
        min=0,
        max=500,
        onSelect,
        disableIncrements=false
    } = props;
    const ref = React.useRef()
    const [selection, setSelection] = React.useState(initial)
    const [width, setWidth] = React.useState(null)
    const TICK_WIDTH = Math.ceil(width / PRIMARY_N) // Must be integer, else the snapToAlignment might not work very well
    const SECONDARY_TICK_WIDTH = Math.ceil(width / SECONDARY_N)
    const stylesheet = createStyleSheet(theme => {
        return {
            Container: {
                alignItems: 'center',
                borderWidth: 0,
                borderColor: 'yellow',
                width: width ? TICK_WIDTH*PRIMARY_N : '100%', // To prevent collapse when measuring initial layout
                gap: theme.spacing.md,
            },
            TickBlock: {
                flexDirection: 'column',
                borderWidth: 0,
                borderColor: 'red',
                height: MAJOR_TICK_HEIGHT + 16 + 8 + TICK_OFFSET,
            },
            Reverse: {
                flexDirection: 'column-reverse'
            },
            Tick: {
                borderWidth: 0.5,
                borderColor: theme.colors.base.border_100,
                height: MINOR_TICK_HEIGHT,
                width: 0.5,
            },
            MajorTick: {
                height: MAJOR_TICK_HEIGHT
            },
            IndicatorContainer: {
                position: 'absolute',
                transform: [{translateY: -theme.spacing.sm - theme.spacing.xs}],
                height: '100%',
                gap: theme.spacing.xs,
                left: TICK_WIDTH*((PRIMARY_N/2) - 0.5 - 0.1), // -0.1 to make sure it covers the scales
            },
            Indicator: {
                height: '100%',
                borderWidth: 1,
                borderColor: theme.colors.brand.solid_100,
            },
            IndicatorMarker: {
                height: theme.spacing.sm,
                borderWidth: 1,
                borderColor: theme.colors.brand.solid_100,
            },
            Label: {
                position: 'absolute',
                width: TICK_WIDTH*4,
                bottom: TICK_OFFSET,
                left: TICK_WIDTH*-2,
                color: theme.colors.base.text_200,
                textAlign: 'center',
            },
            SecondaryLabel: {
                bottom: 0,
                top: TICK_OFFSET
            },
            IncrementsContainer: {
                backgroundColor: theme.colors.base.surface_300,
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                // padding: theme.spacing.md
            }
        }
    });
    const { styles, theme } = useStyles(stylesheet)


    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width)
    }

    const onScroll = (event, target='primary') => {
        const { x, y } = event.nativeEvent.contentOffset
        const interval_width = target === 'primary' ? TICK_WIDTH : SECONDARY_TICK_WIDTH
        const new_index = Math.round(x/interval_width)
        const current_primary = Math.floor(selection)
        const current_secondary = selection - Math.floor(selection)
        const new_value = target === 'primary' ? (new_index + current_secondary).toFixed(2)
                        : (current_primary + new_index*0.05).toFixed(2)
       
        // console.log({new_value, new_index})
        new_value !== selection && requestAnimationFrame(() => {
            setSelection(new_value)
            onSelect?.(new_value)
        })
        
    }

    const onIncrement = (increment) => {
        const current_index = Math.floor(selection)
        const new_index = current_index + increment <= min ? 0
                        : current_index + increment >= max ? max
                        : current_index + increment
        ref.current.scrollToIndex({index: new_index, animated: true})
    }

    const getData = () => {
        if (min > max) {
            throw new Error("The min parameter must be less than or equal to the max parameter.");
        }
        let primary
        let secondary

        // 1. Primary 
        primary = [
            ..._.range(1,PRIMARY_N/2).map(i => ({
                label: null,
                value: -i,
                target: 'primary',
                width: TICK_WIDTH
            })),
            ..._.range(min, max + 1).map(i => ({ 
                label: i%PRIMARY_LABEL_INTERVAL === 0 ? i : null, 
                value: i, 
                target: 'primary',
                width: TICK_WIDTH
            })),
            ..._.range(max + 2,max + 1 + PRIMARY_N/2).map((i,index) => ({
                label: null,
                value: -i,
                target: 'primary',
                // width: TICK_WIDTH
                width: index === ((PRIMARY_N-1)/2 - 1) ? width - ((PRIMARY_N-1)*TICK_WIDTH) : TICK_WIDTH
            })),
        ]

        // 2. Secondary
        secondary = [
            ..._.range(0.05, 0.55, 0.05).map(i => ({
                label: null,
                value: -Number(i),
                target: 'secondary',
                width: SECONDARY_TICK_WIDTH
            })),
            ..._.range(0, 1.00, 0.05).map(value => value.toFixed(2)).map(i => ({ 
                label: i%0.25 === 0 ? `.${`${i}`.split('.')[1]}` : null, 
                value: Number(i), 
                target: 'secondary',
                width: SECONDARY_TICK_WIDTH
            })),
            ..._.range(1.10, 1.60, 0.05).map((i,index) => ({
                label: null,
                value: -Number(i),
                target: 'secondary',
                width: index === ((SECONDARY_N-1)/2 - 1) ? width - ((SECONDARY_N-1)*SECONDARY_TICK_WIDTH) : SECONDARY_TICK_WIDTH
            })),
        ]
        return { primary, secondary }
    }

    const renderItem = ({item, index}) => {
        const { label, value, target='primary', width } = item
        const is_secondary = target === 'secondary'
        const is_major = target === 'primary' && value%5 === 0 ? true
                        : target === 'secondary' && value.toFixed(2)%0.25 === 0 ? true
                        : false
        if(value >= 0) {
            return (
                <View style={[styles.TickBlock, { width }, is_secondary && styles.Reverse]}>
                    <View style={[styles.Tick, is_major && styles.MajorTick]}/>
                    <Text variant='code' style={[styles.Label, is_secondary && styles.SecondaryLabel]} wrap={false}>{label}</Text>
                </View>
            )
        } else {
            return (
                <View style={[styles.TickBlock, { width }]}/>
            )
        }
    }

    const renderIncrements = () => {
        let blocks = []
        if(disableIncrements) { return }
        increments.forEach(increment => {
            blocks.push(
                <Button
                    label={`${increment > 0 ? '+' : ''}${increment}`}
                    onPress={() => onIncrement(increment)}
                    backgroundColor='transparent'
                    label_props={{variant:'code', color: theme.colors.base.text_200}}
                    style={{borderRadius: theme.border_radius.md}}
                    />
            )
        })

        return (
            <View style={styles.IncrementsContainer}>{blocks}</View>
        )

    }

    const { primary, secondary } = React.useMemo(() => getData(),[width, min,max])
    // Added marginLeft: TICK_WIDTH/2 to center properly since snapToAlignment='center' causes issues
    // Need to wrap FlashList in View with height because FlashList will screw up the height (does not happen with FlatList, but the onMomentumScrollEnd for FlashList is much faster)
    const LIST_HEIGHT = MAJOR_TICK_HEIGHT + 16 + 8 + TICK_OFFSET
    return (
        <View style={styles.Container} onLayout={onLayout}>
            <View style={[styles.Container, { marginLeft: TICK_WIDTH/2, marginTop: theme.spacing.sm + theme.spacing.xs }]}> 
                {width &&
                <View style={{height: LIST_HEIGHT}}>
                    <FlashList
                        ref={ref}
                        data={primary}
                        renderItem={renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment='start'
                        decelerationRate='fast'
                        bounces={false}
                        scrollEventThrottle={16}
                        onScroll={e => onScroll(e, 'primary')}
                        disableAutoLayout={true}
                        snapToInterval={TICK_WIDTH}
                        estimatedItemSize={TICK_WIDTH}
                        initialScrollIndex={Math.floor(initial)}
                        />
                </View>}

                {decimal && width &&
                <View style={{height: LIST_HEIGHT}}>
                    <FlashList
                        data={secondary}
                        renderItem={renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment='start'
                        decelerationRate='fast'
                        bounces={false}
                        scrollEventThrottle={16}
                        onScroll={e => onScroll(e, 'secondary')}
                        disableAutoLayout={true}
                        snapToInterval={SECONDARY_TICK_WIDTH}
                        estimatedItemSize={SECONDARY_TICK_WIDTH}
                        initialScrollIndex={Math.round((initial - Math.floor(initial))/0.05)}
                        />
                </View>}
                
                <View style={styles.IndicatorContainer}>
                    <View style={styles.IndicatorMarker}/>
                    <View style={styles.Indicator}/>
                </View>
            </View>
            {renderIncrements()}
        </View>
    )
}
