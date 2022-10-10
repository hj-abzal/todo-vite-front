import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-back-production.up.railway.app/',
    headers: {
        withCredentials: true,
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWxlZ3JhbV9pZCI6MTA3MTkyNzE1MiwiaWQiOjEsImxvZ2luIjoiU3VhbiIsImlhdCI6MTY2NTIxMDkyNSwiZXhwIjoxNjY1Mjk3MzI1fQ.BwGF0tMmGCA-pQ3FhNqWpoqvZ771PehSWzzMHFqLZrU"
    }
});

export const authApi = {};

export const todolistApi = {
    get: () => {
        return instance.get('todolists')
    },
    create: (todoTitle: string) => {
        return instance.post('todolists', {title: todoTitle})
    },
    delete: (todoID: string) => {
        return instance.delete(`todolists/${todoID}`)
    },
    update: (todoID: string, title: string) => {
        return instance.put(`todolists/${todoID}`, {title})
    }
};

export const taskApi = {
    get: (todolistID: string) => {
        return instance.get(`todolists/${todolistID}/tasks`)
    },
    create: (title: string, todolistID: string) => {
        return instance.post(`todolists/${todolistID}/tasks`, {title})
    },
    delete: (todoID: string, taskID: string) => {
        return instance.delete(`todolists/${todoID}/tasks/${taskID}`)
    },
    update: (todoID: string, title: string, taskID: string) => {
        return instance.put(`todolists/${todoID}/tasks/${taskID}`, {title})
    }
};


