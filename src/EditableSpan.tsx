import React, { ChangeEvent, useState } from 'react';

type PropsType = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)




    return (
        edit
            ? <input value={updateTitle} onBlur={onDoubleClickHandler} onChange={onChangeHandler} type="text" autoFocus />
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
    )
}
