import React, { ChangeEvent } from 'react'

type PropsType = {
    isDone: boolean
}

export const SuperCheckbox = (props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone} />

    )
}
