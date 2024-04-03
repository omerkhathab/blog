import { Navigate } from "react-router-dom";
import { BlogCard } from "../components/BlogCard"
import { Loader } from "../components/Loader";
import { NavBar } from "../components/NavBar"
import { useBlogs } from "../hooks"
export const Blogs = () => {
    if(!localStorage.getItem("authorization")){
        return <Navigate to={'/signin'} />
    }
    const {loading, blogs} = useBlogs();
    
    console.log(loading, blogs)

    if(loading) {
        return(
            <div>
                <NavBar />
                <div className="flex flex-col justify-center h-screen">
                    <div className="flex justify-center "><Loader /></div>
                </div>
            </div>
        ) 
    }
    
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center w-full md:w-3/4 xl:w-2/3">
                    {blogs.reverse().map((blog) =>{
                        return <div>
                            <BlogCard id={blog.id} authorName={blog.author.name} published="01/02/24" blogTitle={blog.title} blogContent={blog.content}/>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}