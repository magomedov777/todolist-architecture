import React, { ChangeEvent, useState } from 'react'

type PropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        if (edit === true) {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setUpdateTitle(e.currentTarget.value)
    const addTask = () => { props.callBack(updateTitle) }

    return (
        edit
            ? <input onChange={onChangeHandler} value={updateTitle} onBlur={onDoubleClickHandler} autoFocus />
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>

    )
}