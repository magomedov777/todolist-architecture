import React, { FC, memo, useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { SuperCheckbox } from './SuperCheckbox';
import { TaskType } from './task-types';
import { FilterValuesType } from './App';

type Props = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, updateTitle: string) => void
    updateTodolistTitle: (todolistId: string, updateTitle: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
}

export const Todolist: FC<Props> = memo(({ id, title, tasks,
    removeTask, changeFilter, addTask,
    changeTaskStatus, updateTask, updateTodolistTitle,
    removeTodolist, filter }) => {

    const removeTodolistHandler = () => removeTodolist(id)

    const onAllClickHandler = () => changeFilter("all", id);
    const onActiveClickHandler = () => changeFilter("active", id);
    const onCompletedClickHandler = () => changeFilter("completed", id);

    const addTaskHandler = useCallback((updateTitle: string) => {
        addTask(updateTitle, id)
    }, [addTask, id])

    const updateTodolistTitleHandler = useCallback((updateTitle: string) => {
        updateTodolistTitle(id, updateTitle)
    }, [id, updateTodolistTitle])

    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        updateTask(id, taskId, updateTitle)
    }

    const onChangeHandler = (tID: string, newIsDone: boolean) => {
        changeTaskStatus(tID, newIsDone, id);
    }

    return <div>
        <h3>
            <EditableSpan oldTitle={title} callBack={updateTodolistTitleHandler} />
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm callBack={addTaskHandler} />
        <ul>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id, id)
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckbox callBack={(newIsDone) => onChangeHandler(t.id, newIsDone)} isDone={t.isDone} />
                        <EditableSpan callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)} oldTitle={t.title} />
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </button>
            <button className={filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </button>
            <button className={filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
})


