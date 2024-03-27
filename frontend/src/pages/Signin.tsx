import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signin = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="col-span-2 lg:col-span-1">
                <Auth type={"signin"}/>
            </div>
            <div className="hidden lg:block">
                <Quote quote={"Signin and start posting!"}/>
            </div>
        </div>
    )
}