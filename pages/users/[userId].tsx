import Header from '@/components/Header'
import {useRouter} from "next/router";
import useUser from "@/hooks/useUser";
import {ClipLoader} from "react-spinners";



const UserView = () => {
    const router = useRouter()
    const {userId} = router.query
    const {data: fetcherUser, isLoading} = useUser(userId as string)
    console.log(fetcherUser)
    // if (isLoading || !fetcherUser)
    if(false)
    {
        return (
            <div className={`flex justify-center items-center h-full`}>
                <ClipLoader color={`lightblue`} size={80}/>
            </div>
        )
    }
    return (
        <>
            <Header label={fetcherUser?.name} showBackArrow />
        </>
    )
}
export default UserView
