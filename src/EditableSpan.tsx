import React, { ChangeEvent, useState } from 'react';

type PropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(updateTitle)
    }
    return (
        edit
            ? <input value={updateTitle} onBlur={() => { }} onChange={onChangeHandler} type="text" autoFocus />
            : <span >{props.oldTitle}</span>
    )
}
