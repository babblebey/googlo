import { useHistory } from "react-router-dom";
import { MdSearch, MdSettings, MdMic, MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { openSettings } from "../features/SettingsToggle";
import { deviceIsDarkScheme } from "../features/theme";
import { setSearchTerm, setSearchQuery } from "../features/search";
import logo from '../logo.svg';
import logoDark from '../logo-dark.svg';
import countries from "../app/countries.json";


const Home = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const country = useSelector(state => state.country.value); // Selecting the currently stated country value
    const theme = useSelector(state => state.theme.value); // Selecting the currently state user theme value -> (light || dark || deviceDefault)
    const language = useSelector(state => state.language.value);  // Selecting the current state of user language
    const searchQuery = useSelector(state => state.search.value.query); // Selecting the current state value of the searchQuery
    const searchTerm = useSelector(state => state.search.value.term); // Selecting the current state value of the searchTerm

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
        
        // Construction of the searchQuery -> combination of search term (current input value) and state values from the settings panel i.e. Language, country, resultsCount
        // 1- search term is splitted at spaces (" ")
        // 2- and joined with '+' to elminate the spaces
        // 3- the 'resultsCount' state value is concatenated to the query
        // 4- the 'language' state value 'alpha2' property is concatenated to the query
        // 5- if the 'country' state value 'code' is not "GNR", the value property is concatenated to the query
        dispatch(setSearchQuery(`${e.target.value.split(' ').join('+')}&lr=lang_${language.alpha2.toLowerCase()}&hl=${language.alpha2}${(country.code !== 'GNR') ? `&cr=country${country.code}` : ''}`));
    }

    // Handling Function to do a Search
    const handleSearch = (e) => {
        // Prevent page reload on form submission
        e.preventDefault();
        // Routes to the /search route with the search query concatenated to it
        history.push(`/search?q=${searchQuery}`);
    }

    return ( 
        <div className="flex flex-col min-h-screen space-y-6 dark:bg-gdark-300">
            {/* Header with Setting Panel Toggle Button */}
            <header className="p-2 text-right">
                <button className="rounded-full hover:bg-gray-100 dark:hover:bg-gdark-200 p-2"
                    onClick={() => dispatch(openSettings())}
                >
                    <MdSettings className="text-gray-800 dark:text-gdark-50 text-xl"/>
                </button>
            </header>
            {/* --- */}

            {/* Main */}
            <main className="flex flex-col items-center space-y-2">
                {/* Displaying Logo based on user theme */}
                <div className="h-[5em] sm:h-[10em] lg:h-[27vh] flex items-end">
                    {/* Displays when theme is Light */}
                    {( theme === 'light' || (theme === 'deviceDefault' && !deviceIsDarkScheme)) && (
                        <img src={logo} alt="Googlo" className="w-72" />
                    ) }
                    {/* Displays when theme is Dark */}
                    { (theme === 'dark' || (theme === 'deviceDefault' && deviceIsDarkScheme)) && (
                        <img src={logoDark} alt="Googlo" className="w-72" />
                    ) }
                </div>
                {/* --- */}

                {/* Search Input Section */}
                <div className="w-full p-[20px] flex justify-center">
                    {/* Input Field Area */}
                    <div className="relative max-w-[584px] w-full group">
                        <MdSearch className="absolute h-full ml-4 left-0 text-xl text-gray-400" />

                        {/* Input field */}
                        <form onSubmit={handleSearch}>
                            <input 
                                value={searchTerm}
                                type="text" 
                                className="rounded-full text-lg border py-2 pl-10 pr-20 w-full dark:text-gray-100 dark:bg-transparent dark:border-gdark-100 focus:border-transparent outline-0 focus-visible:shadow-form dark:focus-visible:border-transparent dark:focus-visible:bg-gdark-200 dark:group-hover:bg-gdark-200 group-hover:border-transparent group-hover:shadow-form"
                                onChange={handleChange}
                            />
                        </form>
                        {/* --- */}

                        <div className="absolute top-0 right-0 rounded-full mr-4 py-2 space-x-2 h-full flex my-auto text-2xl">
                            {/* Clear input field button - Only render when search field has value typed in */}
                            {searchTerm.length >= 1 &&  (
                                <button className="border-r border-r-gray-300 dark:border-r-gdark-100 pr-2" onClick={() => dispatch(setSearchTerm(''))}>
                                    <MdOutlineClose className="text-gray-600" />
                                </button>
                            )}
                            {/* --- */}

                            {/* Voice Search Trigger Icon */}
                            <button>
                                <MdMic className="text-gblue" />
                            </button>
                            {/* --- */}
                        </div>
                    </div>
                    {/* --- */}
                </div>
                {/* --- */}

                <div className="space-x-2 flex">
                    <button className="rounded bg-gray-100 py-2 px-3 text-sm border border-transparent hover:border-gray-300 dark:hover:border-gdark-100 hover:shadow dark:hover:shadow-md dark:bg-gdark-200 dark:text-gray-100"
                        onClick={handleSearch}
                    >
                        <p>Googlo Search</p>
                    </button>
                    <button className="rounded bg-gray-100 py-2 px-3 text-sm border border-transparent hover:border-gray-300 dark:hover:border-gdark-100 hover:shadow dark:hover:shadow-md dark:bg-gdark-200 dark:text-gray-100"
                        onClick={handleSearch}
                    >
                        <p>I'm Feeling Lucky</p>
                    </button>
                </div>
            </main>
            {/* Main */}

            <aside className="flex flex-1 justify-center">
                <p className="text-sm dark:text-gdark-50">
                    Googlo offered in various languages
                </p>
            </aside>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gdark-400 text-gray-500 dark:text-gdark-50 text-sm">
                <div className="py-3 px-6">
                    <p>
                        {/* Rendering currently stated country value getting its name from the countries data json */}
                        { countries.map(c => {
                            if (c.Code === country.code) return (
                                c.Name
                            )
                        }) }
                        {/* --- */}
                    </p>
                </div>
                <div className="br" />
                <div className="py-4 px-6 block text-center space-y-2 md:flex md:justify-between md:space-y-0">
                    <p>
                        Googlo - a Google Clone Made with React x TailwindCSS by <a href="https://instagram.com/babblebey" target="_blank">@babblebey</a>
                    </p>
                    <p>
                        <a href="#" target="_blank">View Source on GitHub</a>
                    </p>
                </div>
            </footer>
            {/* Footer */}
        </div>
     );
}
 
export default Home;