import { useGetVideoQuery } from "../services/GoogleSearch";
import ReactPlayer from "react-player";

const Videos = () => {
    const { data: videos, isLoading, error } = useGetVideoQuery();
    if (isLoading) return 'Loading...';
    if (error) return error;

    console.log(videos);

    const { results } = videos;

    return ( 
        <div className="container py-5 font-roboto">
            <div className="flex mx-5 lg:ml-40 lg:mr-10 justify-between ">
                <div className="md:basis-2/3 md:max-w-[692px] space-y-6">
                    { results?.map((r, i) => (
                        <div className="space-y-1" key={i}>
                            <a href={r?.link} target="_blank" className="space-y-1">
                                <cite className="text-sm not-italic text-gray-900">
                                    { r?.cite.domain }
                                </cite>
                                <h3 className="my-[2px] text-xl glink">
                                    { r?.title }
                                </h3>
                            </a>
                            <div className="flex">
                                { ReactPlayer.canPlay(r?.additional_links?.[0]?.href) && (
                                    <div className="w-44 h-24 rounded-xl bg-gray-100 overflow-hidden mr-4">
                                        <ReactPlayer url={r?.additional_links?.[0]?.href} width="100%" height="100%" className="h-full object-cover" />
                                    </div>
                                ) }
                                <div className="basis-8/12 space-y-3">
                                    <p className="text-sm text-gray-600">
                                        { r?.description }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) }
                </div>
            </div>
        </div> 
     );
}
 
export default Videos;