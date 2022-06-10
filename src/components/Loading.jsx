const Loading = ({ fullwidth }) => {
    return ( 
        <div className={`w-full min-h-[78vh] ${ !fullwidth && 'max-w-[692px] md:ml-40' } flex items-center justify-center`}>
            <div className="w-10 h-10 rounded-full border-4 border-gray-200 dark:border-gdark-200 border-t-gblue dark:border-t-gblue animate-spin" />
        </div>
     );
}
 
export default Loading;