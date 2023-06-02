import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tasks: null,
    currentTask: {}
}

const taskSlice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        addNewTask: (state, action) => {
            state.tasks.unshift(action.payload)
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id)
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload };
            }
        },
        updateStatus: (state, action) => {
            const index = state.tasks.findIndex(task => task._id === action.payload._id)
            if (index !== -1) {
                state.tasks[index] = { ...state.tasks[index], ...action.payload.obj };
            }
        },
        removeTask: (state, action) => {
            const objIndex = state.tasks.findIndex(task => task._id === action.payload)
            state.tasks.splice(objIndex, 1)
        },
        setCurrentTask: (state, action) => {
            state.currentTask = { ...state.currentTask, ...action.payload }
        },
        updateCurrentTask: (state, action) => {
            state.currentTask = action.payload
            state.currentTask.desc = action.payload.desc
        },
        clearTasks: (state) => {
            state.tasks = null
        }
    }
})


export const { setTasks,
    addNewTask,
    clearTasks,
    updateTask,
    updateStatus,
    removeTask,
    updateCurrentTask,
    setCurrentTask } = taskSlice.actions;

export default taskSlice.reducer