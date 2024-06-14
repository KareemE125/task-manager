/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit"
import { createTask, getTasks, updateTask, deleteTask } from "@/store/actions/taskActions"
import TLoading from "@/customTypes/loading"
import ITask from "@/models/taskModel"
import { AsyncThunk, AsyncThunkConfig } from "node_modules/@reduxjs/toolkit/dist/createAsyncThunk"


interface ITaskState {
    list: ITask[]
    loading: TLoading
    error: string | null
    lastFetch: number | null    // timestamp of last fetched --- use Date.now() --- cache time in milliseconds
}

const initialState : ITaskState = {
  list: [],
  loading: 'idle',
  error: null,
  lastFetch: null 
}

const taskSlice = createSlice({
    name: 'task',
    initialState: initialState,
    reducers: {
        setTasks: (state, action) => {
            state.list = action.payload
        },

    },
    extraReducers: (builder) => {
        // getTasks
        pendingBuilder(builder, getTasks)
        rejectedBuilder(builder, getTasks)
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.list = action.payload.reverse()
            state.error = null 
            state.lastFetch = Date.now()
        }),
        // createTask
        pendingBuilder(builder, createTask)
        rejectedBuilder(builder, createTask)
        builder.addCase(createTask.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.list.unshift(action.payload)
            state.error = null 
            state.lastFetch = Date.now()
        }),
        // updateTask
        pendingBuilder(builder, updateTask)
        rejectedBuilder(builder, updateTask)
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.list = state.list.map(task => task.id === action.payload.id ? action.payload : task)
            state.error = null 
            state.lastFetch = Date.now()
        }),
        // deleteTask
        pendingBuilder(builder, deleteTask)
        rejectedBuilder(builder, deleteTask)
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = 'succeeded'
            state.list = state.list.filter(task => task.id !== action.payload)
            state.error = null 
            state.lastFetch = Date.now()
        })
    }
})

function pendingBuilder(builder: ActionReducerMapBuilder<ITaskState>, asyncCall: AsyncThunk<any, unknown, AsyncThunkConfig>){
    return builder.addCase(asyncCall.pending, (state) => {
        state.loading = 'pending' 
        state.error = null 
        state.lastFetch = null
    })
}

function rejectedBuilder(builder: ActionReducerMapBuilder<ITaskState>, asyncCall: AsyncThunk<any, unknown, AsyncThunkConfig>){
    builder.addCase(asyncCall.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload as string
        state.lastFetch = null
    })
}


export default taskSlice.reducer
export const { setTasks } = taskSlice.actions
export { getTasks, createTask, updateTask, deleteTask }

