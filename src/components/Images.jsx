import { useGetImageQuery } from "../services/GoogleSearch";
import Loading from "./Loading";
import Error from "./Error";

const Images = () => {
    const { data: images, isLoading, error } = useGetImageQuery(); // Destructuring needed properties from Endpoint
    if (isLoading) return <Loading fullwidth />; // Returns Loading Component when data fetching is in Loading state
    if (error) return <Error fullwidth error={error} />; // Returns an error handling component when error is detected

    const { image_results } = images; // Destructuring results from the images data object

    return ( 
        <div className="flex flex-col dark:bg-gdark-300">
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
}
 
export default Images;