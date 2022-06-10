import { MdError } from "react-icons/md"

const Error = ({ error, fullwidth }) => {
    return ( 
        <div className={`w-full min-h-[78vh] dark:text-gdark-50 ${ !fullwidth && 'max-w-[692px] md:ml-40' } flex items-center justify-center`}>
            <p className="flex items-center">
                {/* Display Error Message */}
                <MdError className="text-2xl mr-1 text-red-500" />
                { error.error }
            </p>
        </div>
     );
}
 
export default Error;