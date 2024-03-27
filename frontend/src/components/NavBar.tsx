import { Link } from "react-router-dom"

export const NavBar = ({type = ""}) => {
    return (
        <div className="flex w-full bg-slate-100 justify-between items-center px-10 py-5">
            <Link to={"/blogs"}>
                <div className="pl-20 text-4xl font-bold cursor-pointer">Blog</div>
            </Link>
            <div className="flex justify-center">
                <Link to={ type == 'publish' ? "/publish" : "/new" }>
                    {/* <div className="pl-20 text-2xl">{ type == 'publish' ? "Publish" : "New Blog" }</div> */}
                    <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-full text-md px-5 py-2.5 text-center me-2">{ type == 'publish' ? "Publish" : "New" }</button>
                </Link>
            </div>   
        </div>
    )
}