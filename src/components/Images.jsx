import Header from "./Header";
import Footer from "./Footer";
import { useGetImageQuery } from "../services/GoogleSearch";

const Images = () => {
    const { data: images, isLoading, error } = useGetImageQuery();
    if (isLoading) return '';
    if (error) return error;

    console.log(images);

    const { image_results } = images;

    return ( 
        <div className="flex flex-1 h-screen flex-col">
            <Header page='images' />

            <main className="p-4 flex flex-wrap">
                { image_results?.map((r, i) => {
                    const domain = r?.link?.domain.split("   ").slice(1);
                    const title = r?.link?.title.split("   ").slice(0, 1);
                    return (
                        <div className="text-gray-700 h-fit w-fit mr-4 mb-4 cursor-pointer" key={i}>
                            <a href="" className="group">
                                <img src={r?.image?.src} alt={r?.image?.alt} className="hover:shadow-form h-40 object-cover w-full mb-2" />
                                <p className="text-xs group-hover:underline">
                                    { title }
                                </p>
                                <p className="text-[0.71em] group-hover:underline">
                                    { domain }
                                </p>
                            </a>
                        </div>
                    )}
                ) }
            </main>

            <aside className="flex flex-1 justify-center">
                <p className="text-xs text-gray-500 font-medium h-24">
                    Looks like you've reached the end
                </p>
            </aside>

            <Footer />
        </div>
     );
}
 
export default Images;