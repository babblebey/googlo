import { useGetKnowledgePanelQuery } from "../services/GoogleKnowledgePanel";

const KnowledgePanel = () => {
    const { data, isLoading, error } = useGetKnowledgePanelQuery();
    if (isLoading) return '';
    if (error) return error;

    const { knowledge_panel: kp } = data;

    // console.log(kp);

    return ( 
        kp !== null && (
            <div className="md:basis-1/3 w-full h-fit border border-gray-300 rounded-lg pb-3 md:py-3 mb-6 overflow-hidden">
                <div className="flex items-center pl-3 md:px-3">
                    <div className="basis-4/5 md:basis-3/5 flex flex-col justify-center">
                        <p className="text-2xl lg:text-3xl font">
                            { kp?.name }
                        </p>
                        <p className="text-sm text-gray-500 pr-4">
                            { kp?.label }
                        </p>
                    </div>
                    <div className="basis-1/5 md:basis-2/5">
                        <img src={ kp?.image?.url } alt={ kp?.name } className="md:rounded-lg" />
                    </div>
                </div>
                
                <div className="w-full bg-gray-200 h-[1px] md:my-3" /> 

                <div className="px-3 my-3">
                    <p className="text-sm">
                        { kp?.description?.text } {' '} 
                        <a className="glink" href={ kp?.description?.url }>{ kp?.description?.site }</a>
                    </p>
                </div>

                <div className="px-3">
                    { kp?.info?.map(({ title, labels }, i) => {
                        const detail = labels.length > 5 ? `${labels.slice(0, 6).join(', ')} ...More` : labels.join(', ');
                        // Removing Customer Care/Service Related Detail from UI
                        if (!title.includes('Customer')) return (
                            <p className="text-sm leading-loose" key={i}>
                                <b>{ title }: </b> { detail }
                            </p>
                        )
                    }) }
                </div>
            </div>
        )
    );
}
 
export default KnowledgePanel;