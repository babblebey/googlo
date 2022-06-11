import { configureStore } from "@reduxjs/toolkit";
import { googleSearchApi } from "../services/GoogleSearch";
import { googleKnowledgePanelApi } from "../services/GoogleKnowledgePanel";
import settingsToggleReducer from "../features/SettingsToggle";
import countryReducer from "../features/country";
import languageReducer from "../features/language";
import themeReducer from "../features/theme"
import searchReducer from "../features/search"

export default configureStore({
    reducer: {
        [googleSearchApi.reducerPath]: googleSearchApi.reducer,
        [googleKnowledgePanelApi.reducerPath]: googleKnowledgePanelApi.reducer,
        settingsToggle: settingsToggleReducer,
        country: countryReducer,
        language: languageReducer,
        theme: themeReducer,
        search: searchReducer
    }
})