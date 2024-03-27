import { DisplayBlog } from "../components/DisplayBlog"
import { Loader } from "../components/Loader";
import { NavBar } from "../components/NavBar";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom"

export const Blog = () => {

    const { id }= useParams();
    const { loading, blog } = useBlog({id: id || ""})
    
    if(loading) {
        return(
            <div>
                <NavBar />
                <div className="flex flex-col justify-center h-screen bg-slate-200">
                    <div className="flex justify-center "><Loader /></div>
                </div>
            </div>
        ) 
    }
    return (
        <div>
            <DisplayBlog title={blog.title} content={blog.content} authorName={blog.author.name}/>
        </div>
    )
}