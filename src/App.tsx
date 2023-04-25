import React, { useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
           
        ]
    });

    const removeTask = (todolistID: string, id: string) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id) })
    };

    const addTask = (todolistID: string, title: string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })
    };

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone: isDone } : el) })
    };

    const changeFilter = (todolistID: string, value: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, filter: value } : el))
    };

    const deleteTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID];
    };

    function addTodolist(title: string) {
        
        let todolist: TodolistsType = {id: v1(), title: title, filter: 'all'}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks,[todolist.id]:[]})
    }
   

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                };
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                };
                return (
                    <Todolist
                        key={el.id}
                        id={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        deleteTodolist={deleteTodolist}
                        filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
