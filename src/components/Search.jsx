import { useGetSearchQuery } from "../services/GoogleSearch";
import { useLocation } from "react-router-dom";
import KnowledgePanel from "./KnowledgePanel";
import Loading from "./Loading";
import Error from "./Error";
import Images from "./Images";

const Search = () => {
    const { search: query } = useLocation(); // Destructuring the search property from the location object as 'query'

    // Passing in the 'search' (i.e. 'query') property as parameter to Endpoint slicing out the first character "?" from the string value 
    const { data, isLoading, isFetching, error } = useGetSearchQuery(`${query.slice(1)}`); // Destructuring needed properties from Endpoint with query passed through URL Parameters
    if (isLoading || isFetching) return <Loading />; // Returns Loading Component when data fetching is in Loading state
    if (error) return <Error error={error} />; // Returns an error handling component when error is detected

    const { results } = data; // Destructuring results from the general search data object

    return ( 
        <div className="flex-1 container px-5 md:px-0 py-5 dark:bg-gdark-300 dark:text-gdark-50">
            <div className="flex flex-col-reverse md:flex-row lg:ml-40 justify-between">
                {/* Mapping through the results from the search data object */}
                <div className="md:basis-2/3 md:max-w-[692px] space-y-6">

                    {/* Image Result Widget  */}
                    <Images widget />
                    {/* --- */}

                    { results?.map((r, i) => (
                        <div className="md:px-3" key={i}>
                            {/* Result Title, cited domain linked withing the source link */}
                            <a href={ r?.link } target="_blank">
                                <cite className="text-sm not-italic text-gray-900 dark:text-gdark-50">
                                    { r?.cite?.domain }
                                </cite>
                                <h3 className="my-[2px] text-xl glink">
                                    { r?.title }
                                </h3>
                            </a>
                            {/* --- */}

                            {/* Result description */}
                            <p className="text-sm text-gray-600 dark:text-gdark-50">
                                { r?.description }
                            </p>
                            {/* --- */}
                        </div>
                    )) }
                </div>
                {/* --- */}
                
                {/* Rendering Knowledge Panel */}
                <KnowledgePanel />
                {/* --- */}
            </div>
        </div>
     );
}
 
export default Search;