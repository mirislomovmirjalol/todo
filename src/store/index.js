import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex)
axios.defaults.baseURL = 'http://backend.to-do.test/api/'

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token') || null,
        todo: [],
    },
    getters: {
        todos: (state) => state.todo,
        loggedIn(state) {
            return state.token != null;
        },
    },
    mutations: {
        retrieveTodos(state, todos) {
            state.todo = todos.reverse()
        },
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        addTodo(state, todo) {
            state.todo.push({
                id: todo.id,
                title: todo.title,
                done: false,
            })
        },
        deleteTodo(state, id) {
            const index = state.todo.findIndex(item => item.id === id)
            state.todo.splice(index, 1)
        },
        updateTodo(state, todo) {
            const index = state.todo.findIndex(item => item.id === todo.id)
            state.todo.splice(index, 1, {
                'id': todo.id,
                'title': todo.title,
                'done': todo.done,
            })
        },
    },
    actions: {
        destroyToken(context) {
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

                    axios.post('/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            reject(error)
                        })
                })
            }
        },
        retrieveTodos(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get('/todos')
                .then(response => {
                    context.commit('retrieveTodos', response.data)
                })
                .catch(error => {
                    if (error.message === 'Request failed with status code 401') {
                        localStorage.removeItem('access_token')
                        context.commit('destroyToken')
                        router.push({name: 'Account'})
                    }
                })
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    username: credentials.username,
                    password: credentials.password,
                })
                    .then(response => {
                        if (response.data.error) {
                            reject(response.data.message)
                        } else if (response.data.access_token) {
                            const token = response.data.access_token;
                            localStorage.setItem('access_token', token)
                            context.commit('retrieveToken', token)
                            resolve(response)
                        } else {
                            reject('Something wrong!')
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        register(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/register', {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation,
                })
                    .then(response => {
                        context.dispatch('retrieveToken', {
                            username: credentials.email,
                            password: credentials.password,
                        })
                            .then(response => {
                                resolve(response)
                            })
                    })
                    .catch(error => {
                        reject(error)
                    })
            })


        },
        addTodo(context, todo) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.post('/todos/store', {
                title: todo.title,
                done: 0,
            })
                .then(response => {
                    context.commit('addTodo', response.data)
                })
                .catch(error => {
                })
        },
        updateTodo(context, todo) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.patch('/todos/' + todo.id, {
                title: todo.title,
                done: todo.done,
            })
                .then(response => {
                    context.commit('updateTodo', response.data)
                })
                .catch(error => {
                })
        },
        deleteTodo(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.delete('/todos/' + id)
                .then(response => {
                    context.commit('deleteTodo', id)
                })
                .catch(error => {
                })
        },
    },
    modules: {}
})
