import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { SuperCheckbox } from './SuperCheckbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    
    const updateTodolistTitleHandler = (updateTitle: string) => {
        props.updateTodolistTitle(props.id, updateTitle)
    }

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        props.updateTask(props.id, taskId, updateTitle)
    }

    const onChangeHandler = (tID: string, newIsDone: boolean) => {
        // let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(tID, newIsDone, props.id);
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
            {/* {props.title} */}
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm callBack={addTaskHandler} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    // }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckbox callBack={(newIsDone) => onChangeHandler(t.id, newIsDone)} isDone={t.isDone} />
                        {/* <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} /> */}
                        {/* <span>{t.title}</span> */}
                        <EditableSpan callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)} oldTitle={t.title} />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


