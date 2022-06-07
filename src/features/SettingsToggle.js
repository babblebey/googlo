import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false; 

const settingsToggleSlice = createSlice({
    name: "settingsToggle",
    initialState: { value: initialStateValue },
    reducers: {
        openSettings: (state) => {
            state.value = true
        },
        closeSettings: (state) => {
            state.value = initialStateValue
        }
    }
})

export const { openSettings, closeSettings } = settingsToggleSlice.actions;
export default settingsToggleSlice.reducer;