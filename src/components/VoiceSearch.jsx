import { MdOutlineClose, MdMic } from "react-icons/md";
import { useSelector } from "react-redux";
import { deviceIsDarkScheme } from "../features/theme";
import logo from "../logo.svg";
import logoDark from "../logo-dark.svg";
import { DecoderState, AudioSourceState, SpeechProvider, useSpeechContext, stateToString } from '@speechly/react-client'
import { useEffect } from "react";

const VoiceSearch = ({ toggle }) => {
    const appId = import.meta.env.VITE_SPEECHLY_APP_ID;

    return ( 
        <SpeechProvider appId={appId} language="english">
            <VoiceSearchBar toggle={toggle} />
        </SpeechProvider>
     );
}

const VoiceSearchBar = ({ toggle }) => {
    const theme = useSelector(state => state.theme.value); // Selecting the current user theme value -> (light || dark || deviceDefault)

    const {clientState, microphoneState, segment, listening, start, stop, connect, attachMicrophone} = useSpeechContext()

    const clientIsConnected = clientState !== DecoderState.Disconnected;
    const micIsReady = microphoneState !== AudioSourceState.Stopped;

    useEffect(() => {
        if (clientIsConnected && !micIsReady) {
            attachMicrophone()
                .then(() => console.log('Microphone is Ready!'))
        }
    }, [clientState])

    return (
        <div className="bg-white/60 dark:bg-black/60 fixed top-0 w-full h-screen z-30">
            {/* Toggle Close Button for Voice Search */}
            <button className="absolute text-xl dark:text-gdark-50 right-0 p-2"
                onClick={() => toggle(false)}    
            >
                <MdOutlineClose />
            </button>
            {/* --- */}

            {/* Voice Search Pop-over Body */}
            <div className="bg-white dark:bg-gdark-300 py-5 md:h-36 shadow-md">
                <div className="w-full max-w-g h-full flex items-center justify-between px-4 md:px-0 md:ml-5 lg:ml-40">
                    {/* Voice-to-Text Input Area */}
                    <div className="text-gray-600 dark:text-gdark-50 text-xl md:text-3xl relative lg:-left-12 leading-tight">
                        { !clientIsConnected ? (
                            <>
                                <p className="animate-pulse">
                                    Connecting...
                                </p>
                            </>
                            ) : (
                                listening ? ( 
                                    <p>Listening...</p> 
                                ) : (
                                    segment ? (
                                        <p className="capitalize">
                                            { segment.words.map(w => w.value).join(' ').toLowerCase() }
                                        </p>
                                    ) : (
                                        <p>Press & hold down mic to talk</p>
                                    )
                                )
                            )
                        }
                    </div>
                    {/* --- */}

                    <div className="flex items-center space-x-4 md:space-x-10">
                        {/* Voice Search Mic Button */}
                        <button className="relative bg-red-500 text-gray-600 dark:bg-gdark-50 dark:text-gdark-100 text-2xl md:text-5xl p-2 md:p-5 rounded-full shadow-md"
                            onMouseDown={start} 
                            onMouseUp={stop}
                        >
                            <MdMic />
                            { listening && (
                                <div className="animate-ping bg-gray-200 h-full w-full absolute rounded-full top-0 left-0" />
                            ) }
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

            {/* Voice Search Debug Section */}
            <div className="bg-white p-3">
                <div className="status">State: {stateToString(clientState)}. Listening: {listening.toString()}</div>
                <div className="mic-button space-y-3 space-x-3 mb-3">
                    <button className="p-2 bg-red-500 text-white" onClick={connect} disabled={clientIsConnected}>
                        { clientIsConnected ? 'Client is Connected!' : 'Click to Connect Client' }
                    </button>
                    <button className="p-2 bg-green-500 text-white" onClick={attachMicrophone} disabled={micIsReady}>
                        { micIsReady ? 'Mic is Ready!' : 'Click to Initialize Mic' }
                    </button>
                    <button className="p-2 bg-green-900 text-white" onMouseDown={start} onMouseUp={stop}>
                        { listening ? 'Listening...' : 'Hold to listen' }
                    </button>
                </div>

                <h3>Transcript:</h3>
                {segment ? <p className="segment">{segment.words.map(w => w.value).join(' ')}</p> : null}
            </div>
            {/* --- */}

        </div>
    );
} 
 
export default VoiceSearch;