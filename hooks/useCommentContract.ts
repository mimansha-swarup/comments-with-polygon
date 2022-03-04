import * as wagmi from "wagmi";
import { useProvider,useSigner } from "wagmi";
import { BigNumber, Contract } from "ethers";

import CommentsContract from "../artifacts/contracts/Comments.sol/Comments.json"

export interface Comment {
    id: string,
    topic: string,
    message: string,
    creator_address: string,
    created_at: BigNumber,
}

export enum EventType {
    CommentAdded = "CommentAdded"
}


const useCommentsContract = () =>{
    const [signer] = useSigner();
    const provider = useProvider();

    const contract = wagmi.useContract({
        addressOrName: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        contractInterface: CommentsContract.abi,
        signerOrProvider: signer.data || provider
    });

    const getComments = async(topic:string): Promise<Comment[]> =>{
        return contract.getComments(topic).then((comments)=>comments.map((comment)=>({...comment})))
    
    };
    const addComment = async(topic:string,message:string): Promise<void> =>{
        const tx = await contract.addComment(topic,message);
        await tx.wait()
    };

    return {
        contract,
        chainId: contract.provider.netwaork?.chainId,
        getComments,
        addComment
    };

}

export default useCommentsContract