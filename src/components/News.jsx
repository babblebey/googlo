import { useGetNewsQuery } from "../services/GoogleSearch";

const News = () => {
    const { data: news, isLoading, error } = useGetNewsQuery();
    if (isLoading) return 'Loading...';
    if (error) return error;

    const { entries } = news;

    console.log(news);
    return ( 
        <div className="container font-roboto py-5">
            <div className="flex flex-col-reverse md:flex-row mx-5 lg:ml-40 lg:mr-2 justify-between">
                <div className="w-full md:max-w-[692px] space-y-6">
                    { entries?.map((e, i) => {

                        return (
                            <div className="flex justify-between border rounded-md p-3" key={i}>
                                <div className="w-full basis-10/12 space-y-2 pr-6">
                                    <a href={e?.link} className="space-y-1 group">
                                        <p className="text-xs">
                                            { e?.source?.title }
                                        </p>
                                        <h3 className="text-md group-hover:text-gblue">
                                            { e?.title }
                                        </h3>
                                    </a>
                                    <p className="text-sm text-gray-600">
                                        Sharp contrasting triangular shapes in a pink, blue, and navy colourway look iridescent and like a finely cut diamond. This is only...
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        5 days ago
                                    </p>
                                </div>
                                <div className="w-28 h-28 rounded-md bg-gray-100 overflow-hidden">
                                    <img src="https://profitworks.ca/images/PMoiE8tk.jpg" className="object-cover h-full" alt="" />
                                </div>
                            </div>
                        )
                    }) }
                </div>
            </div>
        </div>
     );
}
 
export default News;