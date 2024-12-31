import React from 'react'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export const TimeSelector = props => {
    const {
        initial=new Date(),
        onSelect,
    } = props;

    const onConfirm = (new_date) => {
        onSelect?.(new_date, success => onCancel())
    }

    const onCancel = () => {
        props.close?.()
    }

    return (
        <DateTimePickerModal
            isVisible={props.isVisible}
            mode="time"
            date={initial}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
}