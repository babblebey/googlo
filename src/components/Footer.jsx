const Footer = () => {
    return ( 
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
    );
}
 
export default Footer;