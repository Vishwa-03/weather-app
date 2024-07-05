import { projectAuth } from "../../Firebase";
let error=null;

const signup=async (email,password,name)=>{
    error=null;
    try {
        const res=await projectAuth.createUserWithEmailAndPassword(email,password);
        if(!res){
            throw new Error("Something went wrong");
        }
        await res.user.updateProfile({ displayName: name });
        error=null;
        console.log(res.user);

    } catch (err) {
        error=err.message;
        console.log(error);
    }
};

const userSignup=()=>{
    return {error,signup};
}

export default userSignup;