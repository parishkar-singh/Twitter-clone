import {NextApiRequest} from 'next'
import {getSession} from "next-auth/react";
import prisma from "@/libs/prismadb";
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
const serverAuth =async (req:NextApiRequest)=>{
    const session=await getSession({req});
    if(!session?.user?.email){
        throw new Error('Not signed in')
    }
    const currentUser=await prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    })
    if(!currentUser){
        throw new Error('User not found')
    }
    return {currentUser}

}
export default serverAuth
