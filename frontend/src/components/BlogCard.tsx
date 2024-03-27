import { Link } from "react-router-dom";

interface BlogCardInputs {
    id: string;
    authorName: string;
    blogTitle: string;
    blogContent: string;
    published: string;
}

export const BlogCard = ({id, authorName, blogTitle, blogContent, published}: BlogCardInputs) => {
    return (
    <Link to={`/blog/${id}`}>
        <div className="flex flex-col h-64 p-10 my-3 cursor-pointer">
            <div className="flex items-center mb-3">
                <Avatar name={authorName}/>
                <div className="font-medium text-xl mr-3">{authorName}</div>
                <div className="font-medium text-xl mr-3 text-gray-500">·</div>
                <div className="text-xl text-gray-500">{published}</div>
            </div>
            <div className="font-bold text-3xl mb-3">
                {blogTitle}
            </div>
            <div className="text-xl text-gray-500 mb-3">
                {blogContent.slice(0,200) + "..."}
            </div>
            <div className="font-semibold text-xl text-gray-500 mb-3">
                {`${Math.floor(blogContent.length / 300)} min read`}
            </div>
            <div className="border-t-2 border-gray-200 mt-10">
            </div>
        </div>
    </Link>
    )
}


export const Avatar = ({name}: {name: string}) => {
    const initials = name.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()
    return (
        <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-200 rounded-full mr-3">
            <span className="font-medium text-gray-600">{initials}</span>
        </div>
    )
}