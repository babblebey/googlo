import { createSlice } from "@reduxjs/toolkit";

// Initial country sets to the localStorage saved "country" value or the "GNR" if country is not found saved in localStorage
const initialStateValue = localStorage.country ? JSON.parse(localStorage.country) :  { code: 'GNR' };

const countrySlice = createSlice({
    name: "country",
    initialState: { value: initialStateValue },
    reducers: {
        setCountry: (state, action) => {
            // Sets a new Country value => { code: _NEW CODE_ }
            state.value = action.payload;
            // Saves the new Country value to localStorage to store user preference in initial state value which is read on re-render of App
            localStorage.country = JSON.stringify(action.payload)
        }
    }
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;