import { SigninInput, SignupInput } from "@omerkhathab/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";

export const Auth = ({type}:{type: "signup"|"signin"}) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    const sendValue = async () => {
        const backendURL = `${BACKEND_URL}/api/v1/user/${type}`
        console.log(backendURL);
        let payload : SignupInput | SigninInput = {
            email: inputs.email,
            password: inputs.password
        };
        if(type == 'signup') {
            payload = {...payload, name: inputs.name}
        }
        console.log(payload)
        try {
            const response = await axios.post(backendURL, payload);
            console.log(response.data);
            const jwt = response.data.jwt;
            localStorage.setItem("authorization",jwt);
            console.log(response, jwt);
            navigate('/blogs')
        } catch (e) {
            console.log("error: ", e);
        }
    }

    return (
        <div className="flex h-screen bg-slate-100 justify-center items-center ">
            <div className="max-w-md text-2xl font-semibold flex flex-col w-1/2">
                <div className="py-5">
                    <div className="text-4xl">{type == "signup" ? "Create an Account" : "Sign In"}</div>  
                    <div className="text-gray-500 text-base pt-2.5">
                        {type == "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="text-gray-800 underline pl-2" to={type == "signup" ? "/signin" : "/signup"} >
                        {type == "signup" ? "Login" : "Signup"}
                        </Link>
                    </div>
                </div>
                {type == 'signup' ? 
                <InputLabel name={"Name"} placeholder="Omer Khathab" onChange={(e)=>setInputs({...inputs, name: e.target.value})} />
                : null}
                <InputLabel name={"Email"} placeholder="yourmail@mail.com" onChange={(e)=>setInputs({...inputs, email: e.target.value})} />
                <InputLabel name={"Password"} placeholder="Enter your password" onChange={(e)=>setInputs({...inputs, password: e.target.value})} />
                <div>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none   font-medium rounded-lg text-base py-5 mt-5 me-2 mb-2 w-full" onClick={()=>sendValue()}>{type.toUpperCase()}</button>
                </div>
            </div>
        </div>
    )
}

interface Input {
    name: string
    placeholder: string
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
}

function InputLabel ({name, placeholder, onChange}: Input) {
    return (
        <div className="">
            <div className="mt-4 mb-3">{name}</div>
            <input onChange={onChange} type={name == "Password" ? "password" : "text"} placeholder={placeholder} className="p-4 mb-2 rounded-lg w-full text-xl"/>
        </div>)
}