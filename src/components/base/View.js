import { View as NativeView } from 'react-native'

export const View = props => {
    const {
        layout
    } = props;
    return <NativeView {...props}/>
}