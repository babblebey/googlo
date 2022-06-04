import { useGetSearchQuery } from "../services/GoogleSearch";
import Header from "./Header";
import Footer from "./Footer";
import KnowledgePanel from "./KnowledgePanel";

const Search = () => {
    const { data: search, isLoading, error } = useGetSearchQuery();
    if (isLoading) return 'Loading...';
    if (error) return error;

    const { results } = search;

    console.log(search);

    return ( 
        <div className="flex flex-1 flex-col h-screen">
            <Header />

            <div className="container py-5">
                <div className="flex flex-col-reverse md:flex-row mx-5 lg:ml-40 lg:mr-2 justify-between">
                    <div className="md:basis-2/3 md:max-w-[692px] space-y-6">
                        { results?.map((r, i) => (
                            <div className="md:px-3" key={i}>
                                <a href={ r?.link }>
                                    <cite className="text-sm not-italic text-gray-900">
                                        { r?.cite?.domain }
                                    </cite>
                                    <h3 className="my-[2px] text-xl glink">
                                        { r?.title }
                                    </h3>
                                </a>
                                <p className="text-sm text-gray-600">
                                    { r?.description }
                                </p>
                            </div>
                        )) }
                    </div>

                    <KnowledgePanel />
                </div>
            </div>

            <div className="flex flex-1" />

            <Footer />
        </div>
     );
}
 
export default Search;