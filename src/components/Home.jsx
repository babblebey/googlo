import logo from '../logo.svg';
import { MdSearch, MdSettings, MdMic, MdOutlineClose } from "react-icons/md";
import { useGetSearchQuery, useGetImageQuery, useGetNewsQuery, useGetVideoQuery } from "../services/GoogleSearch";
import { useGetKnowledgePanelQuery } from "../services/GoogleKnowledgePanel";

const Home = () => {
    // const { data, error, isLoading } = useGetSearchQuery();
    // const { data, error, isLoading } = useGetImageQuery();
    // const { data, error, isLoading } = useGetNewsQuery();
    // const { data: video, error, isLoading } = useGetVideoQuery();
    const { data, error, isLoading } = useGetKnowledgePanelQuery();

    const { knowledge_panel } = data;

    if (isLoading) return 'Loading';
    if (error) return error;
    
    console.log(knowledge_panel);

    return ( 
        <div className="flex flex-col h-screen space-y-6">
            <header className="p-2 text-right">
                <button className="rounded-full hover:bg-gray-100 p-2">
                    <MdSettings className="text-gray-800 text-xl"/>
                </button>
            </header>

            <main className="flex flex-col items-center space-y-2">
                <div className="h-64 flex items-end">
                    <img src={logo} alt="Googlo" className="w-72" />
                </div>

                <div className="w-full p-[20px] flex justify-center">
                    <div className="relative max-w-[584px] w-full group">
                        <MdSearch className="absolute h-full ml-4 left-0 text-xl text-gray-400" />
                        <input 
                            type="text" 
                            className="rounded-full text-lg border py-2 pl-10 pr-20 w-full focus:border-transparent outline-0 focus-visible:shadow-form group-hover:border-transparent group-hover:shadow-form"
                            onChange={() => {}}
                        />
                        <div className="absolute top-0 right-0 rounded-full mr-4 py-2 space-x-2 h-full flex my-auto text-2xl">
                            <button className="border-r border-r-gray-300 pr-2 hidden">
                                <MdOutlineClose className="text-gray-600" />
                            </button>
                            <button>
                                <MdMic className="text-[#1A73E8]" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-x-2 flex">
                    <button className="rounded bg-gray-100 py-2 px-3 text-sm border border-transparent hover:border-gray-300 hover:shadow">
                        <p>Googlo Search</p>
                    </button>
                    <button className="rounded bg-gray-100 py-2 px-3 text-sm border border-transparent hover:border-gray-300 hover:shadow">
                        <p>I'm Feeling Lucky</p>
                    </button>
                </div>
            </main>

            <aside className="flex flex-1 justify-center">
                <p className="text-sm">
                    Googlo offered in various languages
                </p>
            </aside>

            <footer className="bg-gray-100 text-gray-500 text-sm">
                <div className="py-3 px-6">
                    <p>Location</p>
                </div>
                <div className="w-full h-[1px] bg-gray-300" />
                <div className="py-4 px-6 block text-center space-y-2 md:flex md:justify-between md:space-y-0">
                    <p>
                        Googlo - a Google Clone Made with React x TailwindCSS by @babblebey
                    </p>
                    <p>
                        View Source on GitHub
                    </p>
                </div>
            </footer>
        </div>
     );
}
 
export default Home;