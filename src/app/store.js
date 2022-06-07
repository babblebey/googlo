import { configureStore } from "@reduxjs/toolkit";
import { googleSearchApi } from "../services/GoogleSearch";
import { googleKnowledgePanelApi } from "../services/GoogleKnowledgePanel";
import settingsToggleReducer from "../features/SettingsToggle";

export default configureStore({
    reducer: {
        [googleSearchApi.reducerPath]: googleSearchApi.reducer,
        [googleKnowledgePanelApi.reducerPath]: googleKnowledgePanelApi.reducer,
        settingsToggle: settingsToggleReducer
    }
})