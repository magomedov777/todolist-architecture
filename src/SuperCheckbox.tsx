import React, { ChangeEvent, FC } from 'react'

type Props = {
    isDone: boolean
    callBack: (newIsDone: boolean) => void
}
export const SuperCheckbox: FC<Props> = ({ isDone, callBack }) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={isDone} />

    )
}
