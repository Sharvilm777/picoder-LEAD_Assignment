import { configureStore } from '@reduxjs/toolkit'
import setDetailReducer from './details'

export const store = configureStore({
    reducer: {
        setDetail: setDetailReducer
    },
})