import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    todolistID: string
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistID: string) => void
    updateTask: (todolistID: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistID: string, updateTitle: string) => void
    filter: FilterValuesType
}

export const Todolist = (props: PropsType): JSX.Element => {
    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const removeTodolistHandler = () => props.deleteTodolist(props.todolistID)

    const addTaskHandler = (newTitle: string) => {
        props.addTask(newTitle, props.todolistID)
    }

    const updateTodolistTitleHandler = (updateTitle: string) => {
        props.updateTodolistTitle(props.todolistID, updateTitle)
    }

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        props.updateTask(props.id, taskId, updateTitle)
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callBack={updateTodolistTitleHandler} />
            {/* {props.title}  */}
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm callBack={addTaskHandler} />
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                        <EditableSpan oldTitle={t.title} callBack={(updateTitle: string) => updateTaskHandler(t.id, updateTitle)} />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}
