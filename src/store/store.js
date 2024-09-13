import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'

export const store=configureStore({
    reducer:{
        auth:authReducer,
                // post:postSlice TODO : add post slice by yourself
 
    },
})

// import { configureStore } from "@reduxjs/toolkit";

// export const store=configureStore({
//     reducer:{}
// });

