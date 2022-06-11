import { useGetNewsQuery } from "../services/GoogleSearch";
import Loading from "./Loading";
import Error from "./Error";
import { useLocation } from "react-router-dom";

const News = () => {
    const { search } = useLocation(); // Destructuring the search property from the location object
    
    const { data: news, isLoading, isFetching, error } = useGetNewsQuery(`q=${search.slice(1)}`); // Destructuring needed properties from Endpoint with query passed through URL Parameters
    if (isLoading || isFetching) return <Loading />; // Returns Loading Component when data fetching is in Loading state
    if (error) return <Error error={error} />; // Returns an error handling component when error is detected

    const { entries } = news; // Destructuring results from the news data object

    return ( 
        <div className="flex-1 container font-roboto py-5 dark:bg-gdark-300 dark:text-gdark-50">
            <div className="flex flex-col-reverse md:flex-row mx-5 lg:ml-40 lg:mr-2 justify-between">
                <div className="w-full md:max-w-[692px] space-y-6">
                    {/* Mapping through the entries from the news data object */}
                    { entries?.map((e, i) => (
                        <div className="flex justify-between border dark:border-0 rounded-md p-3" key={i}>
                            <div className="w-full basis-10/12 space-y-2 pr-6">
                                {/* News entry Title and Source */}
                                <a href={e?.link} className="space-y-1 group">
                                    <p className="text-xs">
                                        { e?.source?.title }
                                    </p>
                                    <h3 className="text-md group-hover:text-gblue dark:text-[#8ab4f8]">
                                        { e?.title }
                                    </h3>
                                </a>
                                {/* --- */}

                                {/* News entry Description and date */}
                                <p className="text-sm text-gray-600 dark:text-gdark-50">
                                    Sharp contrasting triangular shapes in a pink, blue, and navy colourway look iridescent and like a finely cut diamond. This is only...
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gdark-50">
                                    5 days ago
                                </p>
                                {/* --- */}
                            </div>
                            <div className="w-28 h-28 rounded-md bg-gray-100 dark:bg-gdark-200 overflow-hidden">
                                {/* News entry Image */}
                                <img src="https://profitworks.ca/images/PMoiE8tk.jpg" className="object-cover h-full" alt="" />
                                {/* --- */}
                            </div>
                        </div>
                    )) }
                    {/* --- */}
                </div>
            </div>
        </div>
     );
}
 
export default News;