import {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    getTodolistsTC
} from './state/todolists-reducer';
import {
    addTasksTC,
    changeTaskStatusAC,
    changeTaskTitleTC,removeTasksTC
} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch<any>();

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(removeTasksTC(taskId,todolistId));
        }, []);

    const addTask = useCallback(function (title: string, todolistId: string){
        dispatch(addTasksTC(title,todolistId));
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (taskId:string,newTitle:string,todolistId:string,) {
        console.log(newTitle)
        console.log(todolistId)
       dispatch(changeTaskTitleTC(taskId,newTitle,todolistId,));
       }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
       dispatch(deleteTodolistTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title))
    }, []);

    const addTodolist = useCallback((title: string) => {
       dispatch(createTodolistTC(title))
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, []);

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <div key={tl.id}>
                        <Todolist
                            id={tl.id}
                            title={tl.title}
                            tasks={allTodolistTasks}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </div>;
                })
            }

        </div>
    );
}