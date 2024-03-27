export const Quote = (props: any) => {
    return (
        <div className="flex h-screen bg-slate-200 justify-center items-center ">
            <div className="max-w-md text-2xl font-semibold">
                {props.quote}
            </div>
        </div>
    )
}