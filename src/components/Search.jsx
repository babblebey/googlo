import { useGetSearchQuery } from "../services/GoogleSearch";
import { useGetKnowledgePanelQuery } from "../services/GoogleKnowledgePanel";
import Header from "./Header";

const Search = () => {
    const { data, isLoading, error } = useGetKnowledgePanelQuery();
    if (isLoading) return 'Loading';
    if (error) return error;

    const { knowledge_panel } = data;

    console.log(knowledge_panel);

    return ( 
        <div>
            <Header />
        </div>
     );
}
 
export default Search;