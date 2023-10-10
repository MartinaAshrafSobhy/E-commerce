import { createSlice } from "@reduxjs/toolkit";


let initialState = {count:0}
let CounterSlice = createSlice({
    name:'CounterReducer',
    initialState,
    reducers:{
        increase:(state)=>{
            state.count+=1;
        },
        decrease:(state)=>{
            state.count-=1;
        }
    }
})

export let CounterReducer = CounterSlice.reducer;
export let {increase,decrease} = CounterSlice.actions;