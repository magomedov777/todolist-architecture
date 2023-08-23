import React, { ChangeEvent, useState } from 'react';



export const EditableSpan = (props: PropsType) => {

    const onDoubleClickHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    // const addTask = () => {
    //     props.callBack(updateTitle)
    // }

    //new variant
    const addTask = () => {
        props.callBack(updateTitle)
    }
    return (
        edit
            ? <input value={updateTitle} onBlur={onDoubleClickHandler} onChange={onChangeHandler} type="text" autoFocus />
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    )
}
