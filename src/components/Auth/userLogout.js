import { projectAuth } from "../../Firebase";

let error=null;
const logout=async()=>{
    error=null;
    try {
        await  projectAuth.signOut();
    } catch (err) {
        error=err.message;
    }

}

const userLogout=()=>{
    return {error,logout};
}

export default userLogout;