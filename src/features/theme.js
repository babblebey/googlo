import { createSlice } from "@reduxjs/toolkit";

// Check whether user has a saved theme preference in localStorage to set its value to initialValueState 
// ...otherwise 'deviceDefault' is set
const initialStateValue = localStorage.theme ? localStorage.theme :  'deviceDefault';

const themeSlice = createSlice({
    name: "theme",
    initialState: { value: initialStateValue },
    reducers: {
        setTheme: (state, action) => {
            // set new user theme value = light || dark || deviceDefault
            state.value = action.payload 

            // if value is set to 'deviceDefault', the localStorage saved 'theme' item is deleted
            // ...else the value is saved to localStorage 'theme' item
            // ...this allows for user browser's theme (light ||dark) be used because deviceDefault is the theme value
            if (action.payload === 'deviceDefault') {
                localStorage.removeItem('theme')
            } else {
                localStorage.addItem('theme', action.payload)
            }
        }
    }
});

// Utility Boolean that Checks if User's Browser prefered theme is 'dark'
export const deviceIsDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;