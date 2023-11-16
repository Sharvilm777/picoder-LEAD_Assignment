import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pincode: null,
    details: []
}

export const detailSlice = createSlice({
    name: 'setPincodeDetail',
    initialState,
    reducers: {

        setDetail: (state, action) => {
            state.pincode = action.payload.pincode,
                state.details = action.payload.details
        },
        clearDetail: (state) => {
            state.pincode = null,
                state.details = []
        }
    },
})


export const { setDetail, clearDetail } = detailSlice.actions

export default detailSlice.reducer