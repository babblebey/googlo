import { useGetVideoQuery } from "../services/GoogleSearch";
import ReactPlayer from "react-player";
import Loading from "./Loading";
import Error from "./Error";
import { useLocation } from "react-router-dom";

const Videos = () => {
    const { search } = useLocation(); // Destructuring the search property from the location object

    const { data: videos, isLoading, isFetching, error } = useGetVideoQuery(`q=${search.slice(1)}`); // Destructuring needed properties from Endpoint with query passed through URL Parameters
    if (isLoading || isFetching) return <Loading />; // Returns Loading Component when data fetching is in Loading state
    if (error) return <Error error={error} />; // Returns an error handling component when error is detected

    const { results } = videos; // Destructuring results from the video data object

    return ( 
        <div className="flex-1 container py-5 font-roboto dark:bg-gdark-300">
            <div className="w-full flex mx-5 lg:ml-40 lg:mr-10 justify-between ">
                {/* Mapping through the results from the search data object */}
                <div className="md:basis-2/3 md:max-w-[692px] space-y-6">
                    { results?.map((r, i) => (
                        <div className="space-y-1" key={i}>
                            {/* Result Title, cited domain linked withing the source link */}
                            <a href={r?.link} target="_blank" className="space-y-1">
                                <cite className="text-sm not-italic text-gray-900 dark:text-gdark-50">
                                    { r?.cite.domain }
                                </cite>
                                <h3 className="my-[2px] md:text-xl glink">
                                    { r?.title }
                                </h3>
                            </a>
                            {/* --- */}

                            <div className="flex">
                                {/* Checking if the video URL/Link in the result is playable or is a video url */}
                                { ReactPlayer.canPlay(r?.additional_links?.[0]?.href) && (
                                    // Renders element when Video URL/Link is playable
                                    <div className="w-44 h-24 rounded-xl bg-gray-100 dark:bg-gdark-200 overflow-hidden mr-4">
                                        <ReactPlayer url={r?.additional_links?.[0]?.href} width="100%" height="100%" className="h-full object-cover" />
                                    </div>
                                ) }
                                {/* --- */}
                                
                                {/* Result Description */}
                                <div className="basis-10/12 md:basis-9/12 space-y-3">
                                    <p className="text-sm text-gray-600 dark:text-gdark-50">
                                        { r?.description }
                                    </p>
                                </div>
                                {/* --- */}
                            </div>
                        </div>
                    )) }
                </div>
                {/* --- */}
            </div>
        </div> 
     );
}
 
export default Videos;