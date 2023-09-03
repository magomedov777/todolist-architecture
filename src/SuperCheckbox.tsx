import React, { ChangeEvent } from 'react'



export const SuperCheckbox = (props: PropsType) => {

    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone} />

    )
}
