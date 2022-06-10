const Error = ({ error, fullwidth }) => {
    return ( 
        <div className={`w-full min-h-[78vh] dark:text-gdark-50 ${ !fullwidth && 'max-w-[692px] md:ml-40' } flex items-center justify-center`}>
            <p>
                {/* Display Error Message */}
                { error.error }
            </p>
        </div>
     );
}
 
export default Error;