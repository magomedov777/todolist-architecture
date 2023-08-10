import React, { ChangeEvent, useState } from 'react';



export const EditableSpan = (props: PropsType) => {
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        if(edit){
            addTask()
        }
    }
   
    return (
        edit
            ? <input value={updateTitle} onBlur={onDoubleClickHandler} onChange={onChangeHandler} type="text" autoFocus/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    )
}
