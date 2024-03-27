import { Link, useNavigate } from "react-router-dom"

export const NavBar = ({type = ""}) => {
    const navigate = useNavigate();
    const removeAuth = () => {
        localStorage.removeItem("authorization");
        navigate('/signin')
    }
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
                <button onClick={removeAuth} type="button" className="text-white bg-red-600 hover:bg-red-700 focus:outline-none font-medium rounded-full text-md px-5 py-2.5 text-center me-2">Logout</button>
            </div>   
        </div>
    )
}