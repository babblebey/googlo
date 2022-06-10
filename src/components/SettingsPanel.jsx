import { useDispatch, useSelector } from "react-redux";
import { closeSettings } from "../features/SettingsToggle";
import { MdOutlineClose } from "react-icons/md";
import { setLanguage } from "../features/language";
import { setCountry } from "../features/country";
import { setResultsCount } from "../features/resultsCount";
import { setTheme } from "../features/theme";
import countries from "../app/countries.json";
import languages from "../app/languages.json";

const SettingsPanel = () => {
    const dispatch = useDispatch();
    const settingsToggle = useSelector(state => state.settingsToggle.value); // Selecting the current state of SettingsToggle => true || false
    const language = useSelector(state => state.language.value);  // Selecting the current state of user language
    const country = useSelector(state => state.country.value); // Selecting the current state of user country
    const resultsCount = useSelector(state => state.resultsCount.value); // Selecting the current state of user preferred result count
    const theme = useSelector(state => state.theme.value); // Selecting the current user theme
    
    // onChange Function for user theme radio input field - Dispatches the setTheme() action which sets theme = light || dark || deviceDefault
    const handleThemeChange = (e) => dispatch(setTheme(e.target.value));

    return ( 
        <div className={`${ !settingsToggle ? `hidden` : `` } h-screen w-full overflow-hidden fixed top-0 z-20 bg-black/50`}>
            {/* Settings Toggle to Close Settings Panel by click on Opaque background 
            - Dispatches the closeSettings() action which sets settingsToggle = false */}
            <div className="absolute w-full h-full top-0 z-20" onClick={() => dispatch(closeSettings())} />
            {/* --- */}
            
            {/* Setting Panel Body */}
            <div className="absolute right-0 top-0 overflow-y-scroll h-full w-full animate-slide-in max-w-[360px] bg-white dark:bg-gdark-300 dark:text-gray-300 z-30">
                <div className="flex justify-between p-5 text-2xl">
                    <h2 className="dark:text-gray-100">
                        Quick Settings
                    </h2>
                    {/* Close Button - also Dispatches the closeSettings() action which sets settingsToggle = false  */}
                    <button onClick={() => dispatch(closeSettings())}>
                        <MdOutlineClose />
                    </button>
                    {/* --- */}
                </div>

                <div className="br" /> 

                {/* Using Search Section */}
                <div className="space-y-1 py-5">
                    <h3 className="setting-section-title">
                        Using Search
                    </h3>

                    <div className="setting-field justify-between">
                        <p>Language</p>

                        {/* Language Select field 
                        - Dispatches the setLanguage() action which sets the language alpha2 equal to alpha2 mapped from imported 
                        language json data i.e. { alpha2: l.alpha2 } */}
                        <select 
                            value={ language.alpha2 }
                            onChange={(e) => dispatch(setLanguage({ alpha2: e.target.value }))}
                            className="w-7/12 text-right bg-transparent outline-none"
                        >   
                            {/* Mapping through the imported Languages json data to provide list of languages options */}
                            { languages.map((l, i) => (
                                <option value={ l.alpha2 } className="dark:text-black" key={i}>
                                    { l.English }
                                </option>
                            )) }
                            {/* --- */}
                        </select>
                        {/* --- */}
                    </div>

                    {/* Number of Result Input field 
                    - Dispatches the resultCount() action which sets search results count */}
                    <div className="setting-field justify-between">
                        <p>Number of Result</p>
                        <input 
                            type="number" 
                            value={ resultsCount } 
                            onChange={(e) => dispatch(setResultsCount(e.target.value))}
                            className="w-2/12 text-right pr-1 bg-transparent outline-none" 
                        />
                    </div>
                    {/* --- */}
                            
                    <div className="setting-field justify-between">
                        <p>Select Country</p>

                        {/* Country Select field 
                        - Dispatches the setCountry() action which sets the country code equal to alpha2 mapped from imported 
                        country json data i.e. { code: c.Code } */}
                        <select 
                            value={ country.code }
                            onChange={(e) => dispatch(setCountry({ code: e.target.value }))}
                            className="w-7/12 text-right bg-transparent outline-none"
                        >
                            {/* Mapping through the imported Countries json data to provide list of languages options */}
                            { countries.map((c, i) => (
                                <option value={ c.Code } className="dark:text-black" key={i}>
                                    { c.Name }
                                </option>
                            )) }
                            {/* --- */}
                        </select>
                        {/* --- */}
                    </div>
                </div>
                {/* --- */}

                <div className="br" /> 

                {/* Appearance Section */}
                <div className="space-y-1 py-5">
                    <h3 className="setting-section-title">
                        Appearance
                    </h3>

                    {/* Appearance Radio Input fields which uses the handleThemeChange() function */}
                    <label htmlFor="light" className="setting-field">
                        <input type="radio" 
                            value="light" 
                            id="light" 
                            checked={theme === "light"}
                            className="gradio" 
                            onChange={handleThemeChange}
                        />
                        <p>Light theme</p>
                    </label>

                    <label htmlFor="dark" className="setting-field">
                        <input type="radio" 
                            value="dark" 
                            id="dark" 
                            checked={theme === "dark"}
                            className="gradio" 
                            onChange={handleThemeChange}
                        />
                        <p>Dark theme</p>
                    </label>

                    <label htmlFor="deviceDefault" className="setting-field">
                        <input type="radio" 
                            value="deviceDefault" 
                            id="deviceDefault" 
                            checked={theme === "deviceDefault"}
                            className="gradio" 
                            onChange={handleThemeChange}
                        />
                        <p>Device default</p>
                    </label>
                    {/* --- */}
                </div>
                {/* --- */}
            </div>
            {/* --- */}
        </div>
     );
}
 
export default SettingsPanel;