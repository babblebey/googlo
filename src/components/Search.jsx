import { useGetSearchQuery } from "../services/GoogleSearch";
import { useGetKnowledgePanelQuery } from "../services/GoogleKnowledgePanel";
import Header from "./Header";

const Search = () => {
    const { data, isLoading, error } = useGetKnowledgePanelQuery();
    if (isLoading) return 'Loading';
    if (error) return error;

    const { knowledge_panel: kp } = data;

    console.log(kp);

    return ( 
        <>
            <Header />

            <div className="container py-5">
                <div className="flex ml-5 lg:ml-40 justify-between">
                    <div className="basis-2/3 max-w-[692px]">
                        
                    </div>
                    <div className="basis-1/3 w-full border border-gray-300 rounded-lg py-5 space-y-3">
                        {true && (
                            <>
                                <div className="flex items-center px-3">
                                    <div className="basis-3/5 flex flex-col justify-center lg:pr-20">
                                        <p className="text-4xl font">
                                            { kp?.name }
                                        </p>
                                        <p className="text-sm text-gray-500">
                                        { kp?.label } 
                                        </p>
                                    </div>
                                    <div className="basis-2/5">
                                        <img src={ kp?.image?.url } alt={ kp?.name } />
                                    </div>
                                </div>
                                
                                <div className="w-full bg-gray-200 h-[1px]" />

                                <div className="px-3">
                                    <p className="text-sm">
                                        { kp?.description?.text } {' '} 
                                        <a className="decoration-" href={ kp?.description?.url }>{ kp?.description?.site }</a>
                                    </p>
                                </div>

                                <div className="px-3">
                                    { kp?.info?.map(({ title, labels }, i) => {
                                        const detail = labels.length > 5 ? `${labels.slice(0, 4).join(', ')} ...More` : labels.join(', ');
                                        if (!title.includes('Customer')) return (
                                            <p className="text-sm leading-loose" key={i}>
                                                <b>{ title }: </b> { detail }
                                            </p>
                                        )
                                    }) }
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Search;