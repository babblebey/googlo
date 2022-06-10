import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = 10; // Set user initial resultCount to 10

const resultsCountSlice = createSlice({
    name: "resultsCount",
    initialState: { value: initialStateValue },
    reducers: {
        setResultsCount: (state, action) => {
            // Sets a new resultCount value
            state.value = action.payload
        }
    }
});

export const { setResultsCount } = resultsCountSlice.actions;
export default resultsCountSlice.reducer;