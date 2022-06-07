import { useDispatch, useSelector } from "react-redux";
import { closeSettings } from "../features/SettingsToggle";
import { MdOutlineClose } from "react-icons/md";

const Settings = () => {
    const dispatch = useDispatch();
    const settingsToggle = useSelector(state => state.settingsToggle.value);

    return ( 
        <div className={`${ !settingsToggle && 'hidden' } transition ease-in-out duration-1000 h-screen w-full overflow-hidden fixed top-0 z-20 bg-black/50`}>
            
            {/* Settings Toggle Close */}
            <div className="absolute w-full h-full top-0 z-20" onClick={() => dispatch(closeSettings())} />
            
            <div className="absolute right-0 top-0 h-full w-full animate-slide-in max-w-[360px] bg-white z-30">
                <div className="flex justify-between p-5 text-2xl">
                    <h2>
                        Quick Settings
                    </h2>
                    <button onClick={() => dispatch(closeSettings())}>
                        <MdOutlineClose />
                    </button>
                </div>

                <div className="br" /> 

                <div className="space-y-1 py-5">
                    <h3 className="setting-section-title">
                        Using Search
                    </h3>
                    <div className="setting-field justify-between">
                        <p>Language</p>
                        <select name="" id="">
                            <option selected value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </div>
                    <div className="setting-field justify-between">
                        <p>Number of Result</p>
                        <input type="number" name="" id="" value={10} className="w-2/12 text-right" />
                    </div>
                    <div className="setting-field justify-between">
                        <p>Select Country</p>
                        <select name="" id="">
                            <option selected value="en">Worldwide</option>
                            <option value="fr">Nigeria</option>
                        </select>
                    </div>
                </div>

                <div className="br" /> 

                <div className="space-y-1 py-5">
                    <h3 className="setting-section-title">
                        Appearance
                    </h3>
                    <label htmlFor="light" className="setting-field">
                        <input type="radio" name="" id="light" className="gradio" />
                        <p>Light theme</p>
                    </label>
                    <label htmlFor="dark" className="setting-field">
                        <input type="radio" name="" id="dark" className="gradio" />
                        <p>Dark theme</p>
                    </label>
                </div>

            </div>
        </div>
     );
}
 
export default Settings;