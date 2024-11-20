import { configureStore } from "@reduxjs/toolkit";

import registerReducer from '../redux/Slices/RegisterSlice';
import  userReducer  from '../redux/Slices/UserSlice';

export const store = configureStore({
    reducer: {
        register: registerReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;