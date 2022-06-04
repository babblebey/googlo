import { useEffect, useState } from "react";
import { MdMic, MdSearch, MdOutlineClose, MdOutlineSettings, MdOutlineSlideshow, MdOutlineImage } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import logo from "../logo.svg";
import icon from "../favicon.svg";

const Header = ({ page }) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handleScroll = () => window.scrollY >= 130 ? setScrolled(true) : setScrolled(false);
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [scrolled]);

    return ( 
        <>
            <img src={logo} alt="Googlo" className="h-7 mx-auto mt-3 block md:hidden" />
            
            <div className={scrolled ? 'header-scrolled' : 'header'}>
                <div className="ml-3 md:ml-40 flex md:justify-between">
                    <div className="flex flex-1 md:flex-0 relative items-center">
                        <img src={logo} alt="Googlo" className="h-7 absolute -left-32 z-20 hidden md:block" />

                        <div className="relative w-full max-w-[692px] group">
                            <MdSearch className="absolute h-full ml-4 left-0 text-xl text-gray-600 block md:hidden" />
                            <input 
                                type="text"
                                value={searchTerm} 
                                className={`${scrolled ? 'py-1 border' : 'py-2 shadow-form-light'} rounded-full text-lg pl-12 md:pl-6 pr-32 w-full outline-0 focus-visible:shadow-form group-hover:border-transparent group-hover:shadow-form`}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className={`${scrolled ? 'py-1 text-xl' : 'py-2 text-2xl'} absolute top-0 right-0 rounded-full mr-4 space-x-2 h-full flex my-auto`}>
                                {searchTerm.length >= 1 &&  (
                                    <button className="border-r border-r-gray-300 pr-2" onClick={() => setSearchTerm('')}>
                                        <MdOutlineClose className="text-gray-600" />
                                    </button>
                                )}
                                <button className="md:pr-2">
                                    <MdMic className="text-gblue" />
                                </button>
                                <button className="hidden md:block">
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
                <div className="ml-5 lg:ml-40 pt-2 flex text-sm text-gray-600">
                    <div className={`search-type-link ${ !page ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                        <MdSearch className="md:text-lg" />
                        <p>All</p>
                    </div>
                    <div className={`search-type-link ${ page == 'images' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                        <MdOutlineImage className="md:text-lg" />
                        <p>Images</p>
                    </div>
                    <div className={`search-type-link ${ page == 'news' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                        <BiNews className="md:text-lg" />
                        <p>News</p>
                    </div>
                    <div className={`search-type-link ${ page == 'videos' ? 'border-gblue text-gblue' : 'border-transparent' }`}>
                        <MdOutlineSlideshow className="md:text-lg" />
                        <p>Videos</p>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Header;