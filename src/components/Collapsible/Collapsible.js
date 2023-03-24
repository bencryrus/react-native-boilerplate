import Collapsible from 'react-native-collapsible';

const CustomCollapsible = props => {
    return <Collapsible {...props}>{props.children}</Collapsible>
}

export default CustomCollapsible