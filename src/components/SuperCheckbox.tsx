import React, { ChangeEvent, FC, memo } from 'react'

type Props = {
    isDone: boolean
    callBack: (newIsDone: boolean) => void
}
export const SuperCheckbox: FC<Props> = memo(({ isDone, callBack }) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        callBack(event.currentTarget.checked)
    }
    return (
        <input type="checkbox" onChange={onChangeHandler} checked={isDone} />

    )
})
