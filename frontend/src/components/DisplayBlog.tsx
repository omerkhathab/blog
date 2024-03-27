import { NavBar } from "./NavBar"

export const DisplayBlog = ({title, content, authorName}:{title: string, content: string, authorName: string}) => {
    return (
        <div className="flex flex-col">
        <NavBar />
        <div className="flex h-screen">
            <div className="w-2/3 bg-slate-200 flex flex-col py-20 px-16">
                <div className="text-6xl font-bold my-10">{title}</div>
                <div className="text-2xl">{content}</div>
            </div>
            <div className="bg-slate-200 w-1/3 py-20 px-10 flex flex-col">
                <div className="text-2xl font-semibold text-gray-600 pt-10 px-10">Author</div>
                <div className="flex px-10 pt-5">
                    <Avatar name={authorName} />
                    <div className="text-3xl font-semibold pl-3">{authorName}</div>
                </div>
            </div>
        </div>
    </div>
    )
}

const Avatar = ({name}: {name: string}) => {
    const initials = name.split(' ').map(x => x.charAt(0)).join('').substr(0, 2).toUpperCase()
    return (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full mr-3">
            <span className="font-medium text-gray-600">{initials}</span>
        </div>
    )
}