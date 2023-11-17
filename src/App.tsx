import React, { FC, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const App: FC = () => {
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

    const updateTask = (todolistId: string, taskId: string, updateTitle: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? { ...el, title: updateTitle } : el) })
    };

    const updateTodolistTitle = (todolistId: string, updateTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, title: updateTitle } : el))
    };

    const removeTask = (id: string, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id) })
    }

    const addTask = (title: string, todolistId: string) => {
        let task = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistId]: [task, ...tasks[todolistId]] })
    }

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? { ...el, isDone: isDone } : el) })
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: value } : el))
        // let todolist = todolists.find(tl => tl.id === todolistId);
        // if (todolist) {
        //     todolist.filter = value;
        //     setTodolists([...todolists])
        // }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(el => el.id !== id))
        delete tasks[id]
        // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter(tl => tl.id != id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({ ...tasks });
    }

    const addTodolistHandler = (newTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodolistType = { id: newTodolistId, title: newTitle, filter: "all" }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: [] })

    }

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
}

export default App;
