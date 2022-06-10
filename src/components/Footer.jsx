import { useSelector } from "react-redux";
import countries from "../app/countries.json";

const Footer = () => {
    const country = useSelector(state => state.country.value); // Selecting currently stated country value
    
    return ( 
        <footer className="bg-gray-100 dark:bg-gdark-400 text-gray-500 dark:text-gdark-50 text-sm">
            <div className="py-3 px-6">
                <p>
                    {/* Rendering currently stated country getting its name from the countries data json */}
                    { countries.map(c => {
                        if (c.Code === country.code) return (
                            c.Name
                        )
                    }) }
                    {/* --- */}
                </p>
            </div>
            <div className="br" />
            <div className="py-4 px-6 block text-center space-y-2 md:flex md:justify-between md:space-y-0">
                <p>
                    Googlo - a Google Clone Made with React x TailwindCSS by <a href="https://instagram.com/babblebey" target="_blank">@babblebey</a>
                </p>
                <p>
                    <a href="#" target="_blank">View Source on GitHub</a>
                </p>
            </div>
        </footer>
    );
}
 
export default Footer;