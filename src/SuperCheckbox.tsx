import React, { ChangeEvent } from 'react'

type PropsType = {
    isDone: boolean
    callBack: (newIsDone: boolean) => void
}

export const SuperCheckbox = (props: PropsType) => {
    
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={props.isDone} />

    )
}
