import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = false; // Initial State of Settings Panel - Keeps the Settings Panel Closed to start with

const settingsToggleSlice = createSlice({
    name: "settingsToggle",
    initialState: { value: initialStateValue },
    reducers: {
        openSettings: (state) => {
            // Opens the Settings Panel
            state.value = true;
        },
        closeSettings: (state) => {
            // Reverting the Settings Panel to a Closed State
            state.value = initialStateValue
        }
    }
})

export const { openSettings, closeSettings } = settingsToggleSlice.actions;
export default settingsToggleSlice.reducer;