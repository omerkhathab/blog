import { Navigate } from "react-router-dom";

export const Home = () => {

    if(localStorage.getItem("authorization")){
        return <Navigate to={'/blogs'} />
    }
    else {
        return <Navigate to={'/signin'} />
    }
}