import { createSlice } from "@reduxjs/toolkit";

// Initial language sets to the localStorage saved "language" value or the "en" if language is not found saved in localStorage
const initialStateValue = localStorage.language ? JSON.parse(localStorage.language) : { alpha2: 'en' };

const languageSlice = createSlice({
    name: "language",
    initialState: { value: initialStateValue },
    reducers: {
        setLanguage: (state, action) => {
            // Sets a new Language value => { alpha2: _NEW LANG_ }
            state.value = action.payload;
            // Saves the new Language value to localStorage to store user preference in initial state value which is read on re-render of App
            localStorage.language = JSON.stringify(action.payload);
        }
    }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;