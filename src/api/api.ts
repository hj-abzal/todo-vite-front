import axios from 'axios';

export const token = localStorage.getItem ('token')
const instance = axios.create({
    baseURL: 'https://todo-back-production.up.railway.app/',
    headers: {
        withCredentials: true,
        Authorization: `Bearer ${token}`
    }
});

export const authApi = {
    me: ()=> {
        return instance.get('auth/me')
    },
    login: (telegram_id:number, login:string, password:string)=>{
        return instance.post('auth/login',{telegram_id,login,password})
    }
}


export const todolistApi = {
    get: () => {
        return instance.get('todolists')
    },
    create: (todoTitle: string) => {
        return instance.post('todolists', {title: todoTitle})
    },
    delete: (todolistId: string) => {
        return instance.delete(`todolists/${todolistId}`)
    },
    update: (todolistId: string, todoTitle: string) => {
        return instance.put(`todolists/${todolistId}`, {title: todoTitle})
    }
};

export const taskApi = {
    get: (todolistId: string) => {
        return instance.get(`todolists/${todolistId}/tasks`)
    },
    create: (todolistId: string, taskTitle: string) => {
        return instance.post(`todolists/${todolistId}/tasks`, {title: taskTitle})
    },
    delete: (todolistId: string, taskId: string) => {
        return instance.delete(`todolists/${todolistId}/tasks/${taskId}`)
    },
    updateTitle: (todolistId: string, taskTitle: string, taskId: string) => {
        return instance.put(`todolists/${todolistId}/tasks/${taskId}`, {title: taskTitle})
    },
    updateStatus: (todolistId: string, idDone: boolean, taskId: string) => {
        return instance.put(`todolists/${todolistId}/tasks/${taskId}`, {idDone})
    }
};


