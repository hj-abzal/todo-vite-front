import React, {useCallback} from 'react'
import {AddItemForm} from '../AddItemForm/AddItemForm'
import {EditableSpan} from '../EditableSpan/EditableSpan'
import {Task} from '../Tasks/Task'
import {FilterValuesType} from '../../App';
import s from "./Todolist.module.css";
import trashIcon from '../../assets/icons8-trash.svg'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = React.memo(function (props: PropsType) {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.id, props.changeFilter])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return <div className={s.wrapper}>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <button  onClick={removeTodolist}>
                <img src={trashIcon}/>
            </button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div className={s.tasks}>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div className={s.filterButtons}>
            <button className={props.filter === 'all' ? s.filterActiveButton : ''} onClick={onAllClickHandler}>all</button>
            <button className={props.filter === 'active' ? s.filterActiveButton : ''} onClick={onActiveClickHandler}>active</button>
            <button className={props.filter === 'completed' ? s.filterActiveButton : ''} onClick={onCompletedClickHandler}>completed</button>
        </div>
    </div>
})


