import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = { query: '', term: '' }; // Set initial searchQuery to a empty

const searchQuerySlice = createSlice({
    name: "search",
    initialState: { value: initialStateValue },
    reducers: {
        setSearchQuery: (state, action) => {
            // Sets a new searchQuery value
            state.value.query = action.payload
        },
        setSearchTerm: (state, action) => {
            // Sets a new searchTerm value
            state.value.term = action.payload
        }
    }
});

export const { setSearchQuery, setSearchTerm } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;