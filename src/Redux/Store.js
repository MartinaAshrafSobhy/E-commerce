import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterReducer";


export let Store = configureStore({
    
    reducer:{
        counter:CounterReducer
    }

})