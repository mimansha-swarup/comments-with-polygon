import * as React from 'react';
import {Button,ButtonProps} from "@chakra-ui/react";
import {useAccount,useConnect} from "wagmi";
import toast from "react-hot-toast";

interface AuthButtonProps extends ButtonProps {}

const AuthButton: React.FunctionComponent<AuthButtonProps> = (props) => {
    const [connectQuery,connect] =useConnect()
    const [acountQuery] =useAccount()

    React.useEffect(()=>{
        if(connectQuery.error?.name === "ConnectorNotFoundError"){
            toast.error("Metamask extension is required to sign in");
        }

    },[connectQuery.error])

    if(!acountQuery.data?.address){
        return (
            <Button
            {...props}
            onClick ={()=>connect(connectQuery.data.connector[0])}
            >
                Sign In
            </Button>
        )
    }
    return <Button {...props}>{props.children}</Button>


}


export default AuthButton;