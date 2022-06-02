import { MdMic, MdSearch, MdOutlineClose, MdOutlineSettings, MdOutlineSlideshow, MdOutlineImage } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import logo from "../logo.svg";

const Header = () => {
    return ( 
        <>
            <div className="py-3 pt-7 pr-5">
                <div className="ml-40 flex justify-between">
                    <div className="flex relative items-center">
                        <img src={logo} alt="Googlo" className="h-7 absolute -left-32" />

                        <div className="relative w-[692px] group">
                            <input 
                                type="text" 
                                className="rounded-full text-lg py-2 pl-6 pr-32 w-full shadow-form-light outline-0 focus-visible:shadow-form group-hover:border-transparent group-hover:shadow-form"
                                onChange={() => {}}
                            />
                            <div className="absolute top-0 right-0 rounded-full mr-4 py-2 space-x-2 h-full flex my-auto text-2xl">
                                <button className="border-r border-r-gray-300 pr-2">
                                    <MdOutlineClose className="text-gray-600" />
                                </button>
                                <button className="pr-2">
                                    <MdMic className="text-gblue" />
                                </button>
                                <button>
                                    <MdSearch className="text-gblue" />
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

            <div className="border-b">
                <div className="ml-40 pt-2 flex text-sm text-gray-600">
                    <div className="flex items-center space-x-1 py-2 mx-3 cursor-pointer border-b-4 border-gblue text-gblue">
                        <MdSearch className="text-lg" />
                        <p>All</p>
                    </div>
                    <div className="flex items-center space-x-1 py-2 mx-3 cursor-pointer border-b-4 border-transparent">
                        <MdOutlineSlideshow className="text-lg" />
                        <p>Videos</p>
                    </div>
                    <div className="flex items-center space-x-1 py-2 mx-3 cursor-pointer border-b-4 border-transparent">
                        <MdOutlineImage className="text-lg" />
                        <p>Images</p>
                    </div>
                    <div className="flex items-center space-x-1 py-2 mx-3 cursor-pointer border-b-4 border-transparent">
                        <BiNews className="text-lg" />
                        <p>News</p>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Header;