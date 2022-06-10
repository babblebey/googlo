import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { googleSearchApi } from "../services/GoogleSearch";
import { googleKnowledgePanelApi } from "../services/GoogleKnowledgePanel";
import settingsToggleReducer from "../features/SettingsToggle";
import countryReducer from "../features/country";
import languageReducer from "../features/language";
import resultsCountReducer from "../features/resultsCount";
import themeReducer from "../features/theme"

export default configureStore({
    reducer: {
        [googleSearchApi.reducerPath]: googleSearchApi.reducer,
        [googleKnowledgePanelApi.reducerPath]: googleKnowledgePanelApi.reducer,
        settingsToggle: settingsToggleReducer,
        country: countryReducer,
        language: languageReducer,
        resultsCount: resultsCountReducer,
        theme: themeReducer
    }
})