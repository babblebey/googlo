import { useGetImageQuery } from "../services/GoogleSearch";
import Loading from "./Loading";
import Error from "./Error";
import { useLocation } from "react-router-dom";
import { MdOutlineImage, MdOutlineChevronLeft, MdOutlineChevronRight, MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Images = ({ widget }) => {
    const { search } = useLocation(); // Destructuring the search property from the location object

    const searchQuery = useSelector(state => state.search.value.query); // Selecting the current state value of the searchQuery
    const searchTerm = useSelector(state => state.search.value.term); // Selecting the current state value of the searchTerm
    
    const { data: images, isLoading, isFetching, error } = useGetImageQuery(`q=${search.slice(1)}`); // Destructuring needed properties from Endpoint with query passed through URL Parameters
    if (!widget && isLoading || isFetching) return <Loading fullwidth />; // Returns Loading Component when data fetching is in Loading state
    if (error) return <Error fullwidth error={error} />; // Returns an error handling component when error is detected

    const { image_results } = images; // Destructuring results from the images data object

    // Component Widget Mode -> Returns when the 'widget' Prop is true
    if (widget) return (
        <div className="space-y-3 mb-14">
            {/* Widget Title with link to the Main Image Result Route with searchQuery passed as URL Parameters */}
            <Link to={`/images?q=${searchQuery}`} 
                className="my-[2px] px-3 text-xl dark:text-[#e8eaed] flex items-center"
            >
                <MdOutlineImage className="mr-2" /> Images for { searchTerm }
            </Link>
            {/* --- */}

            {/* Widget Body */}
            <div className="relative z-10">
                {/* Scroll to Left Button */}
                <div className="absolute -left-4 h-full flex items-center">
                    <button className="border dark:border-0 bg-white/90 p-1 dark:bg-gdark-200/70 shadow top-1/3 dark:hover:bg-gdark-200/100 rounded-full" 
                        onClick={() => document.querySelector('#tab').scrollLeft -= 300}
                    >
                        <MdOutlineChevronLeft className="text-2xl" />
                    </button>
                </div>
                {/* --- */}

                {/* Image Carousel Body */}
                <div className="flex items-center space-x-2 rounded-xl overflow-x-scroll scroll-smooth" id="tab">
                    {/* Mapping through 10 items of all the results from the images data object */}
                    { image_results?.slice(0, 10).map((r, i) => (
                        <img src={r?.image?.src} alt={r?.image?.alt} className="h-32 object-cover" key={i} />
                    )) }
                    {/* --- */}

                    {/* View All Link (On the Carousel), links to the Main Image Result Route */}
                    <div className="text-center">
                        <div className="w-24 mx-6">
                            <Link to={`/images?q=${searchQuery}`} className="space-y-2">
                                <button className="border dark:border-gdark-100 rounded-full glink text-2xl p-4">
                                    <MdArrowForward />
                                </button>
                                <p className="text-sm">
                                    View all
                                </p>
                            </Link>
                        </div>
                    </div>
                    {/* --- */}
                </div>
                {/* --- */}

                {/* Scroll to Right Button */}
                <div className="absolute top-0 -right-4 h-full flex items-center">
                    <button className="border dark:border-0 bg-white/90 p-1 dark:bg-gdark-200/70 shadow top-1/3 dark:hover:bg-gdark-200/100 rounded-full" 
                        onClick={() => document.querySelector('#tab').scrollLeft += 300}
                    >
                        <MdOutlineChevronRight className="text-2xl" />
                    </button>
                </div>
                {/* --- */}
            </div>
            {/* --- */}

            {/* View All Link to the Main Image Result Route with searchQuery passed as URL Parameters */}
            <div className="flex flex-col items-center px-4">
                <Link to={`/images?q=${searchQuery}`} className="rounded-full border dark:border-gdark-100 w-6/12 relative py-1 top-4 bg-white text-center dark:bg-gdark-300">
                    <button>
                        <p className="text-sm">
                            View all
                        </p>
                    </button>
                </Link>
                <div className="br" />
            </div>
            {/* --- */}
        </div>
    );
    ////////------------------------////////

    // Main Component Mode -> Displays only when 'widget' prop is 'false'
    return ( 
        <div className="flex flex-1 flex-col dark:bg-gdark-300">
            <main className="p-4 flex flex-wrap">
                {/* Mapping through the results from the images data object */}
                { image_results?.map((r, i) => (
                    <div className="text-gray-700 dark:text-gdark-50 h-fit w-fit mr-4 mb-4 cursor-pointer" key={i}>
                        <a href={ r?.link?.href } className="group" target="_blank">
                            <img src={r?.image?.src} alt={r?.image?.alt} className="hover:shadow-form h-40 object-cover w-full mb-2" />
                            <p className="text-xs group-hover:underline">
                                {/* Slicing the unneccesary part of the property to render the 'link.title' property */}
                                { r?.link?.title.split("   ").slice(0, 1) }
                            </p>
                            <p className="text-[0.71em] group-hover:underline">
                                {/* Slicing the unneccesary part of the property to render the 'link.domain' property */}
                                { r?.link?.domain.split("   ").slice(1) }
                            </p>
                        </a>
                    </div>
                )) }
                {/* --- */}
            </main>

            <aside className="flex flex-1 justify-center">
                <p className="text-xs text-gray-500 font-medium h-24">
                    Looks like you've reached the end
                </p>
            </aside>
        </div>
    );
    ////////------------------//////////
}
 
export default Images;