import React, { FC, memo, useCallback, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { TasksStateType } from './types/task-types';
import { TodolistType } from './types/todolist-types';
import { FilterValuesType } from './types/common-types';


const App: FC = memo(() => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: "What to learn", filter: "all" },
        { id: todolistId2, title: "What to buy", filter: "all" }
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true }
        ],
        [todolistId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "React Book", isDone: true }
        ]
    });

    const updateTask = useCallback((todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? { ...el, title: updateTitle } : el) })
    }, [tasks])

    const updateTodolistTitle = useCallback((todolistId: string, updateTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, title: updateTitle } : el))
    }, [todolists])

    const removeTask = useCallback((id: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id) })
    }, [tasks])

    const addTask = useCallback((title: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: [{ id: v1(), title: title, isDone: false }, ...tasks[todolistId]] })
    }, [tasks])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? { ...el, isDone: isDone } : el) })
    }, [tasks])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: value } : el))
    }, [todolists])

    const removeTodolist = useCallback((id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
        delete tasks[id]
    }, [tasks, todolists])

    const addTodolistHandler = useCallback((newTitle: string) => {
        const newTodolistId = v1()
        // const newTodolist: TodolistType = { id: newTodolistId, title: newTitle, filter: "all" }
        setTodolists([{ id: newTodolistId, title: newTitle, filter: "all" }, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }, [tasks, todolists])

    return (
        <div className="App">
            <AddItemForm callBack={addTodolistHandler} />
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolistTitle={updateTodolistTitle}
                    />
                })
            }

        </div>
    );
})

export default App;
