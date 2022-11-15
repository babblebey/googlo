import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiNews } from "react-icons/bi";
import { MdMic, MdSearch, MdOutlineClose, MdOutlineSettings, MdOutlineSlideshow, MdOutlineImage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { openSettings } from "../features/SettingsToggle";
import { deviceIsDarkScheme } from "../features/theme";
import { setSearchQuery, setSearchTerm } from "../features/search";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../logo.svg";
import logoDark from "../logo-dark.svg";
import VoiceSearch from "./VoiceSearch";

const Header = ({ page }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { pathname } = useLocation(); // Destructuring 'pathname' from location object
    const [scrolled, setScrolled] = useState(false);
    const [voiceSearch, setVoiceSearch] = useState(false); // State for Voice Search Pop-over

    const theme = useSelector(state => state.theme.value); // Selecting the current user theme value -> (light || dark || deviceDefault)
    const language = useSelector(state => state.language.value);  // Selecting the current state of user language
    const country = useSelector(state => state.country.value); // Selecting the current state of user country
    const searchQuery = useSelector(state => state.search.value.query); // Selecting the current state value of the searchQuery
    const searchTerm = useSelector(state => state.search.value.term); // Selecting the current state value of the searchTerm

    const handleChange = (e) => {
        // Setting state value for searchTerm on change form field
        dispatch(setSearchTerm(e.target.value));
        
        // Construction of the searchQuery -> combination of search term (current input value) and state values from the settings panel i.e. Language, country
        // 1. search term is splitted at spaces (" ")
        // 2. and joined with '+' to elminate the spaces
        // 3. the 'language' state value 'alpha2' property is concatenated to the query
        // 4. if the 'country' state value 'code' is not "GNR", the value property is concatenated to the query
        dispatch(setSearchQuery(`${e.target.value.split(' ').join('+')}&lr=lang_${language.alpha2.toLowerCase()}&hl=${language.alpha2}${(country.code !== 'GNR') ? `&cr=country${country.code}` : ''}`));

        console.log(searchQuery)
    }

    // Handling Function to do a Search on Result Page
    const handleSearch = (e) => {
        // Prevent page reload on form submission
        e.preventDefault();
        // Routes to current route (derived from useLocation()'s pathname property) with a new query
        history.push(`/${pathname.slice(1)}?q=${searchQuery}`);
    }

    // Detects Window Scroll
    useEffect(() => {
        const handleScroll = () => window.scrollY >= 130 ? setScrolled(true) : setScrolled(false);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [scrolled]);

    return ( 
        <>
            {/* Displaying Logo based on user theme for MOBILE Device */}
            <div className="block md:hidden dark:bg-gdark-300 pt-3">
                <Link to={'/'} onClick={() => dispatch(setSearchTerm(''))}>
                    {/* Renders this if theme is Light or theme is deviceDefault but Browser theme is Light */}
                    { (theme === 'light' || (theme === 'deviceDefault' && !deviceIsDarkScheme)) && (
                        <img src={logo} alt="Googlo" className="h-7 mx-auto" />
                    ) }
                    {/* --- */}

                    {/* Renders this if theme is Dark theme is deviceDefault but Browser theme is Dark */}
                    { (theme === 'dark' || (theme === 'deviceDefault' && deviceIsDarkScheme)) && (
                        <img src={logoDark} alt="Googlo" className="h-7 mx-auto" />
                    ) }
                    {/* --- */}
                </Link>
            </div>
            {/* ---- */}
            
            <div className={`${scrolled ? 'header-scrolled' : 'header'} z-20`}>
                <div className="ml-3 md:ml-40 flex md:justify-between">
                    <div className="flex flex-1 md:flex-0 relative items-center">
                        {/* Displaying Logo based on user theme for DESKTOP/LARGER Devices */}
                        <Link to={'/'} className="absolute -left-32 z-10 hidden md:block" onClick={() => dispatch(setSearchTerm(''))}>
                            {/* Renders this if theme is 'Light' or theme is deviceDefault but Browser theme is 'Light' */}
                            { (theme === 'light' || (theme === 'deviceDefault' && !deviceIsDarkScheme)) && (
                                <img src={logo} alt="Googlo" className="h-7" />
                            ) }
                            {/* --- */}

                            {/* Renders this if theme is 'Dark' or theme is deviceDefault but Browser theme is 'Dark' */}
                            { (theme === 'dark' || (theme === 'deviceDefault' && deviceIsDarkScheme)) && (
                                <img src={logoDark} alt="Googlo" className="h-7" />
                            ) }
                            {/* --- */}
                        </Link>
                        {/* --- */}

                        {/* Search Input Form Field */}
                        <div className="relative w-full max-w-[692px] group">
                            <MdSearch className="absolute h-full ml-4 left-0 text-xl text-gray-600 block md:hidden" />
                            <form onSubmit={handleSearch}>
                                <input 
                                    type="text"
                                    value={searchTerm} 
                                    className={`${scrolled ? 'search-input_scrolled' : 'search-input_not-scrolled'} search-input`}
                                    onChange={handleChange}
                                />
                            </form>
                            <div className={`${scrolled ? 'py-1 text-xl' : 'py-2 text-2xl'} absolute top-0 right-0 rounded-full mr-4 space-x-2 h-full flex my-auto`}>
                                {/* Clear input field button - Only render when searcf field has value typed in */}
                                {searchTerm?.length >= 1 &&  (
                                    <button className="border-r border-r-gray-300 dark:border-r-gdark-100 pr-2" onClick={() => dispatch(setSearchTerm(''))}>
                                        <MdOutlineClose className="text-gray-600" />
                                    </button>
                                )}
                                {/* --- */}
                                
                                <button className="md:pr-2"
                                    onClick={() => setVoiceSearch(true)}    
                                >
                                    <MdMic className="text-gblue" />
                                </button>
                                <button className="hidden md:block" onClick={handleSearch}>
                                    <MdSearch className="text-gblue dark:text-[#8ab4f8]" />
                                </button>
                            </div>
                        </div>
                        {/* --- */}
                    </div>

                    <div className="flex items-center">
                        {/* Setting Panel Toggle */}
                        <button className="rounded-full hover:bg-gray-100 dark:hover:bg-gdark-200 p-2"
                            onClick={() => dispatch(openSettings())}    
                        >
                            <MdOutlineSettings className="text-gray-500 dark:text-gdark-50 text-2xl"/>
                        </button>
                        {/* --- */}
                    </div>
                </div>
            </div>

            <div className="border-b dark:bg-gdark-300 dark:border-b-gdark-100 w-full overflow-x-scroll">
                <div className="ml-5 lg:ml-40 pt-2 flex w-full overflow-x-scroll text-sm text-gray-600 dark:text-gdark-50">
                    {/* Search Types */}
                    <Link to={`/search?q=${searchQuery}`}>
                        <div className={`search-type-link ${ page == 'search' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                            <MdSearch className="md:text-lg" />
                            <p>All</p>
                        </div>
                    </Link>
                    <Link to={`/images?q=${searchQuery}`}>
                        <div className={`search-type-link ${ page == 'images' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                            <MdOutlineImage className="md:text-lg" />
                            <p>Images</p>
                        </div>
                    </Link>
                    <Link to={`/news?q=${searchQuery}`}>
                        <div className={`search-type-link ${ page == 'news' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                            <BiNews className="md:text-lg" />
                            <p>News</p>
                        </div>
                    </Link>
                    <Link to={`videos?q=${searchQuery}`}>
                        <div className={`search-type-link ${ page == 'videos' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                            <MdOutlineSlideshow className="md:text-lg" />
                            <p>Videos</p>
                        </div>
                    </Link>
                    {/* --- */}
                </div>
            </div>

            {/* Voice Search Pop-over renders when 'voiceSearch' state is 'true' */}
            { voiceSearch && (
                // Voice Search Component with the 'voiceSearch' state passed as its 'toggle' prop
                <VoiceSearch toggle={setVoiceSearch} search={handleSearch} />
            ) }
            {/* --- */}
        </>
     );
}
 
export default Header;