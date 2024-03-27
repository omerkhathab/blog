import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = () => {
    return (
        <div className="grid grid-cols-2">
            <div className="col-span-2 lg:col-span-1">
                <Auth type={"signup"}/>
            </div>
            <div className="hidden lg:block">
                <Quote quote={"Signup and create an account today!"}/>
            </div>
        </div>
    )
}