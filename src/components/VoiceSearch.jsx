import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineClose, MdMic, MdSearch } from "react-icons/md";
import { DecoderState, AudioSourceState, SpeechProvider, useSpeechContext, stateToString } from '@speechly/react-client';
import { deviceIsDarkScheme } from "../features/theme";
import { setSearchTerm, setSearchQuery } from "../features/search";
import logo from "../logo.svg";
import logoDark from "../logo-dark.svg";

const VoiceSearch = ({ toggle, home, search }) => {
    const appId = import.meta.env.VITE_SPEECHLY_APP_ID;

    return ( 
        // Voice Search Brain -> Setting up the Speechly API React Client passing the 'appId' and 'language'
        <SpeechProvider appId={appId} language="english">
            {/* Voice Search Bar with its 'toggle' state, 'home' ( a boolean prop) and 'search' handler passed as prop */}
            <VoiceSearchBar toggle={toggle} home={home} search={search} />
            {/* --- */}
        </SpeechProvider>
    );
}

// Voice Search Bar - Voice Search Body
const VoiceSearchBar = ({ toggle, home, search }) => {
    const dispatch = useDispatch();

    const theme = useSelector(state => state.theme.value); // Selecting the current user theme value -> (light || dark || deviceDefault)
    const language = useSelector(state => state.language.value);  // Selecting the current state of user language
    const country = useSelector(state => state.country.value); // Selecting the current state of user country

    // Destructuring all neccesary functions from the Speech Context
    const { clientState, microphoneState, segment, listening, start, stop, connect, attachMicrophone } = useSpeechContext()

    // Setting up boolean value to check connections
    const clientIsConnected = clientState !== DecoderState.Disconnected; // Checks if Client (i.e. browser) is connected to the internet
    const micIsReady = microphoneState !== AudioSourceState.Stopped; // Checks if Microphone is connected and ready to use

    // Effect that checks for Microphone status any time change occurs on clientState
    useEffect(() => {
        // 1. See if client (i.e. browser) is connected to the internet
        // 2. ...and Checks whether Microphone is not connected
        if (clientIsConnected && !micIsReady) {
            // Connects the Microphone
            attachMicrophone()
        }
    }, [clientState]);

    // Handing Voice Input Entry (onChange of 'segment')
    useEffect(() => {
        // Setting state value for searchTerm on change of 'segment'
        dispatch(setSearchTerm(segment?.words.map(w => w.value).join(' ').toLowerCase()));

        // Construction of the searchQuery -> combination of search term (current 'segment' value) and state values from the settings panel i.e. Language, country
        // 1. search term is splitted at spaces (" ")
        // 2. and joined with '+' to elminate the spaces
        // 3. the 'resultsCount' state value is concatenated to the query
        // 4. the 'language' state value 'alpha2' property is concatenated to the query
        // 5. if the 'country' state value 'code' is not "GNR", the value property is concatenated to the query
        dispatch(setSearchQuery(`${segment?.words.map(w => w.value).join(' ').toLowerCase().split(' ').join('+')}&lr=lang_${language.alpha2.toLowerCase()}&hl=${language.alpha2}${(country.code !== 'GNR') ? `&cr=country${country.code}` : ''}`));
    }, [segment]);

    // Main Search Handler
    const handleVoiceSearch = (e) => {
        // Invokes the 'handleSearch' prop passed from parent component
        search(e);

        // Toggles of the Voice Search Bar using the toggle prop passed from parent component
        toggle(false);
    }

    return (
        <div className="bg-white/60 dark:bg-black/60 fixed top-0 w-full h-screen z-30">
            {/* Toggle Close Button for Voice Search */}
            <button className="absolute text-xl dark:text-gdark-50 right-0 p-2" onClick={() => toggle(false)}>
                <MdOutlineClose />
            </button>
            {/* --- */}

            {/* Voice Search Pop-over Body */}
            <div className={`bg-white dark:bg-gdark-300 py-5 ${ home ? 'h-full' : 'md:h-36' } shadow-md`}>
                <div className={`w-full h-full flex items-center justify-between px-4 ${ home ? 'max-w-[900px] mx-auto' : 'max-w-g md:px-0 md:ml-5 lg:ml-40' }`}>
                    {/* Voice-to-Text Input Display Area */}
                    <div className="text-gray-600 dark:text-gdark-50 text-xl md:text-3xl relative lg:-left-12 leading-tight">
                        {/* Input Display Area Rendered content conditions */}
                        { !clientIsConnected ? (
                            <>  
                                {/* If client (i.e. browser) is not connected to the internet, Display Area Renders 'Connecting...'*/}
                                <p className="animate-pulse">
                                    Connecting...
                                </p>
                                {/* --- */}
                            </>
                            ) : (
                                <>
                                    {/* At this Stage -> client (i.e. browser) is Connected to the Internet */}
                                    { listening ? ( 
                                        // If the Microphone is in Listening state, Display Area Renders 'Listening...'
                                        <p>Listening...</p> 
                                    ) : (
                                        // At this Stage -> Microphone is not in Listening state.
                                        segment ? (
                                            // If Microphone had listened atleast one time, then 'segment' is 'true'
                                            // Hence 'segment' maps through the array of words spoken during the listening state and joins the words to form a transcript
                                            // Display Area renders the transcript below
                                            <p className="capitalize">
                                                { segment?.words.map(w => w.value).join(' ').toLowerCase() }
                                            </p>
                                        ) : (
                                            // At this state -> the Microphone has not Listened  at all, hence 'segment' is 'false'
                                            // Display Area renders the voice search usage instruction below
                                            <p>Press & hold down mic to talk</p>
                                        )
                                    ) }
                                    {/* --- */}
                                </>
                            )
                        }
                        {/* --- */}
                    </div>
                    {/* --- */}

                    <div className="flex items-center space-x-4 md:space-x-10">
                        {/* Search Action Button -> Renders only when a 'segment' (i.e. transcript) has a value */}
                        { segment && (
                            // Search button triggers the 'handleSearch' function
                            <button className="p-2 shadow-mic bg-gblue  text-white text-xl rounded-full" onClick={handleVoiceSearch}>
                                <MdSearch />
                            </button>
                        )}
                        {/* --- */}

                        {/* Voice Search Mic Button */}
                        <button className="relative text-gray-600 dark:bg-gdark-50 dark:text-gdark-100 text-2xl md:text-5xl p-2 md:p-5 rounded-full shadow-mic"
                            onMouseDown={start} // On Button Press Down -> Set Listening state to true
                            onMouseUp={stop} // On Button release -> Set Listening state to false

                            // Button Interaction Action for Touch Devices
                            onTouchStart={start} // On Touch Down -> Set Listening state to true
                            onTouchEnd={stop} // On Touch release -> Set Listening state to false
                        >
                            <MdMic />

                            {/* Renders the Ping Effect when Microphone is in Listening State */}
                            { listening && <div className="bg-gray-200 absolute w-full h-full animate-ping rounded-full top-0 left-0" /> }
                            {/* --- */}
                        </button>
                        {/* --- */}

                        {/* Logo */}
                        <span>
                            {/* Renders this if theme is Light or theme is deviceDefault but Browser theme is Light */}
                            { (theme === 'light' || (theme === 'deviceDefault' && !deviceIsDarkScheme)) && (
                                <img src={logo} alt="Googlo" className="h-5 md:h-7" />
                            ) }
                            {/* --- */}

                            {/* Renders this if theme is Dark theme is deviceDefault but Browser theme is Dark */}
                            { (theme === 'dark' || (theme === 'deviceDefault' && deviceIsDarkScheme)) && (
                                <img src={logoDark} alt="Googlo" className="h-5 md:h-7" />
                            ) }
                            {/* --- */}
                        </span>
                        {/* --- */}
                    </div>
                </div>
            </div>
            {/* --- */}

            {/* Voice Search Debug Panel -> Usage Instruction: Set to 'true' to render on ui for debugging */}
            { false && (
                <div className={`bg-white p-3 border ${ home ? 'absolute bottom-0 z-50 w-full' : '' }`}>
                    <div className="status">State: {stateToString(clientState)}. Listening: {listening.toString()}</div>
                    <div className="mic-button space-x-3 space-y-3 mb-3">
                        <button className="p-2 bg-red-500 text-white" onClick={connect} disabled={clientIsConnected}>
                            { clientIsConnected ? 'Client is Connected!' : 'Click to Connect Client' }
                        </button>
                        <button className="p-2 bg-green-400 text-white" onClick={attachMicrophone} disabled={micIsReady}>
                            { micIsReady ? 'Mic is Ready!' : 'Click to Initialize Mic' }
                        </button>
                        <button className="p-2 bg-green-900 text-white" onMouseDown={start} onMouseUp={stop}>
                            { listening ? 'Listening...' : 'Hold to listen' }
                        </button>
                    </div>

                    <h3>Transcript:</h3>
                    {segment ? <p className="segment">{segment.words.map(w => w.value).join(' ')}</p> : null}
                </div>
            ) }
            {/* --- */}
        </div>
    );
} 
 
export default VoiceSearch;