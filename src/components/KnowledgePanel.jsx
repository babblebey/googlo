import { useGetKnowledgePanelQuery } from "../services/GoogleKnowledgePanel";
import { useLocation } from "react-router-dom";

const KnowledgePanel = () => {
    const { search } = useLocation(); // Destructuring the Search property from the location object
    const queryParam = new URLSearchParams(search); // Instantiating a URL Parameter search
    const searchTerm = queryParam.get('q'); // Retrieving the value of "q" as searchTerm

    const { data, isLoading, isFetching, error } = useGetKnowledgePanelQuery(searchTerm); // Destructuring needed properties from Endpoint
    if (isLoading || isFetching) return '';
    if (error) throw new Error(error); 

    const { knowledge_panel: kp } = data; // Destructuring knowledge_panel as "kp" from the enpoint data object

    // If Knowledge Panel exists for current search term, then this is rendered
    if (kp !== null) return ( 
        <div className="md:basis-1/3 w-full h-fit border border-gray-300 dark:border-gdark-100 rounded-lg pb-3 md:py-3 mb-6 overflow-hidden">
            <div className="flex items-center pl-3 md:px-3">
                {/* Knowledge Panel Name and Label */}
                <div className="basis-4/5 md:basis-3/5 flex flex-col justify-center">
                    <p className="text-xl md:text-2xl lg:text-3xl font">
                        { kp?.name }
                    </p>
                    <p className="text-sm text-gray-500 pr-4">
                        { kp?.label }
                    </p>
                </div>
                {/* --- */}

                {/* Knowledge Panel Image */}
                <div className="basis-1/5 md:basis-2/5">
                    <img src={ kp?.image?.url } alt={ kp?.name } className="md:rounded-lg" />
                </div>
                {/* --- */}
            </div>
            
            <div className="br md:my-3" /> 

            <div className="px-3 my-3">
                {/* Knowledge Panel Description */}
                <p className="text-sm">
                    { kp?.description?.text } {' '} <a className="glink" href={ kp?.description?.url }>{ kp?.description?.site }</a>
                </p>
                {/* --- */}
            </div>

            {/* Mapping through knowledge_panel's info Object destructuring it { title, label } properties */}
            <div className="px-3">
                { kp?.info?.map(({ title, labels }, i) => {
                    // Limiting the number of labels rendered to 5 if label length is more than 5
                    const detail = labels.length > 5 ? `${labels.slice(0, 6).join(', ')} ...More` : labels.join(', ');

                    // Removing instances of Customer Care/Service Related Details from properties rendered to UI
                    if (!title.includes('Customer')) return (
                        <p className="text-sm leading-loose" key={i}>
                            <b>{ title }: </b> { detail }
                        </p>
                    )
                }) }
            </div>
            {/* --- */}
        </div>
    );
}
 
export default KnowledgePanel;