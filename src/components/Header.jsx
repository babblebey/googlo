import { MdMic, MdSearch, MdOutlineClose, MdOutlineSettings } from "react-icons/md";
import logo from "../logo.svg";

const Header = () => {
    return ( 
        <>
            <div className="py-3 pt-7 pr-5 border-b">
                <div className="ml-40 flex justify-between">
                    <div className="flex relative items-center">
                        <img src={logo} alt="Googlo" className="h-7 absolute -left-32" />

                        <div className="relative w-[692px] group">
                            <input 
                                type="text" 
                                className="rounded-full text-lg py-2 pl-6 pr-20 w-full shadow-form-light outline-0 focus-visible:shadow-form group-hover:border-transparent group-hover:shadow-form"
                                onChange={() => {}}
                            />
                            <div className="absolute top-0 right-0 rounded-full mr-4 py-2 space-x-2 h-full flex my-auto text-2xl">
                                <button className="pr-2">
                                    <MdMic className="text-[#1A73E8]" />
                                </button>
                                <button className="">
                                    <MdSearch className="text-[#1A73E8]" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <button className="rounded-full hover:bg-gray-100 p-2">
                            <MdOutlineSettings className="text-gray-500 text-2xl"/>
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <div className="ml-40 flex">
                    
                </div>
            </div>
        </>
     );
}
 
export default Header;