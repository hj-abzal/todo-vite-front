import React, {useCallback} from 'react'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'
import {Task} from './Task'
import {FilterValuesType} from './App';
import "./Todolist.css";
import TrashIcon from './assecs/icons8-trash.svg'

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
    console.log(props.filter)

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

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <button  onClick={removeTodolist}>
                <img src={TrashIcon}/>
            </button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.id}
                                                removeTask={props.removeTask}
                                                changeTaskTitle={props.changeTaskTitle}
                                                changeTaskStatus={props.changeTaskStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '8px'}}>
            <button className={props.filter === 'all' ? 'filterButton filterActiveButton' : 'filterButton'} onClick={onAllClickHandler}>all</button>
            <button className={props.filter === 'active' ? 'filterButton filterActiveButton' : 'filterButton'} onClick={onActiveClickHandler}>active</button>
            <button className={props.filter === 'completed' ? 'filterButton filterActiveButton' : 'filterButton'} onClick={onCompletedClickHandler}>completed</button>
        </div>
    </div>
})


