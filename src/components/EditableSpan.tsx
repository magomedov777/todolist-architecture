import React, { ChangeEvent, FC, memo, useState } from 'react';

type Props = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}
export const EditableSpan: FC<Props> = memo(({ oldTitle, callBack }) => {
    const [updateTitle, setUpdateTitle] = useState(oldTitle)
    const [edit, setEdit] = useState(false)
    const onDoubleClickHandler = () => {
        setEdit(!edit)
        if (edit) {
            addTask()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }

    const addTask = () => {
        callBack(updateTitle)
    }
    return (
        edit
            ? <input value={updateTitle} onBlur={onDoubleClickHandler} onChange={onChangeHandler} type="text" autoFocus />
            : <span onDoubleClick={onDoubleClickHandler}>{oldTitle}</span>
    )
})
