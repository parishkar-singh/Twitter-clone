import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from "bcrypt";
import prisma from '@/libs/prismadb';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method!=="POST") return res.status(405).end()
    try {
        const{email,password,username,name}=req.body
        if(!email || !password || !username || !name) return res.status(400).end()
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await prisma.user.create({
            data:{
                email,
                hashedPassword,
                username,
                name
            }
        })
        return res.status(200).json(user)
    }catch (error)
    {
        console.log(error)
        return res.status(500).end()
    }

}
