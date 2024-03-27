import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blog {
    title: string;
    id: string;
    author: {name: string};
    content: string;
}

export const useBlog = ({id}:{id: string}) => {
    
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>({title: "", id: "", author: {name: ""}, content: ""});

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                'authorization':localStorage.getItem('authorization')
            }
        }).then(response => {
            console.log(response.data);
            setBlog(response.data.post);
            setLoading(false)
        })
    },[])

    return {loading, blog}
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                'authorization':localStorage.getItem('authorization')
            }
        }).then(response => {
            setBlogs(response.data.posts);
            setLoading(false)
        })
    },[])

    return {loading, blogs}
}