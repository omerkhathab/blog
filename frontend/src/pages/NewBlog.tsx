import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const NewBlog = () => {
    if(!localStorage.getItem("authorization")){
        return <Navigate to={'/signin'} />
    }
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    
    useAutosizeTextArea(textAreaRef.current, content);

    const handleOnclick = () => {
        console.log(title, content)
        axios.post(`${BACKEND_URL}/api/v1/blog/create`,{
            title: title,
            content: content
        }, {
            headers: {
                'authorization':localStorage.getItem('authorization')
            }
        }).then(response => {
            if(response.data.id) {
                navigate(`/blog/${response.data.id}`);
            }
        })
    }

    return (
    <div className="flex flex-col">
        <div className="flex w-full bg-slate-100 justify-between items-center px-10 py-5">
            <Link to={"/blogs"}>
                <div className="pl-20 text-4xl font-bold cursor-pointer">Blog</div>
            </Link>
            <div className="flex justify-center">
                <button type="button" className="text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-full text-md px-5 py-2.5 text-center me-2" onClick={handleOnclick}>Publish</button>
            </div>   
        </div>
        <div className="flex justify-center">
            <div className="w-2/3 flex flex-col py-20 px-16">
                <input onChange={(e)=>setTitle(e.target.value)} className="text-6xl font-semibold my-10 pb-6 border-b-slate-100 border-b-2 focus:outline-none" placeholder="Title"/>
                <textarea onChange={(e)=>setContent(e.target.value)} ref={textAreaRef} rows={1} value={content} className="text-2xl focus:outline-none resize-none h-auto " placeholder="Tell your story..."/>
            </div>
        </div>
    </div>
    )
}

const useAutosizeTextArea = ( textAreaRef: HTMLTextAreaElement | null, content: string ) => {
    useEffect(() => {
      if (textAreaRef) {
        // reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.style.height = "0px";
        const scrollHeight = textAreaRef.scrollHeight;
  
        // set the height directly
        textAreaRef.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, content]);
  };