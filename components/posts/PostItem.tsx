import React, {useCallback, useMemo} from "react";
import {useCurrentUser, useLoginModal} from "@/hooks";
import {useRouter} from "next/router";
import {formatDistanceToNow, formatDistanceToNowStrict} from "date-fns";
import {Avatar} from "@/components";
import {AiOutlineHeart, AiOutlineMessage} from "react-icons/ai";

interface PostItemProps {
    userId?: string
    data: Record<string, any>
}

const PostItem: React.FC<PostItemProps> = ({userId, data}) => {
    const router = useRouter()
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser()

    const goToUser = useCallback((event: any) => {
        event.stopPropagation()
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])

    const goToPost = useCallback((event: any) => {
        event.stopPropagation()
        router.push(`/posts/${data.id}`)
    }, [router, data.id])

    const onLike = useCallback((event: any) => {
        event.stopPropagation()
        if (!currentUser) {
            loginModal.onOpen()
        }
        // likePost({postId: data.id})
    }, [loginModal, currentUser, data.id])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt), {addSuffix: true})
    }, [data.createdAt])
    return (
        <div className={`border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition`}
             onClick={goToPost}>
            <div className={`flex flex-row items-start gap-3`}>
                <Avatar userId={data.user.id}/>
                <div>
                    <div className={`flex flex-row items-center gap-2`}>
                        <p onClick={goToUser}
                           className={`text-white font-semibold cursor-pointer transition hover:text-sky-500 hover:underline`}>
                            {data.user.name}
                        </p>
                        <span onClick={goToUser}
                              className={`text-neutral-500 hover:underline text-sm italic hidden md:block`}>
                            @{data.user.username}
                        </span>
                        <span className={`text-neutral-500 text-sm`}>
                            {createdAt}
                        </span>
                    </div>
                    <div className={`text-white mt-1`}>
                        {data.body}
                    </div>
                    <div className={`flex flex-row items-center mt-3 gap-10`}>
                        <div className={`flex flex-row items-center text-neutral-500
                    gap-2 cursor-pointer `}>
                            <AiOutlineMessage className={'transition hover:text-sky-500'} size={20}/>
                            <p>
                                {data.comments?.length || 0}
                            </p>

                        </div>
                        <div className={`flex flex-row items-center text-neutral-500
                    gap-2 cursor-pointer `}>
                            <AiOutlineHeart className={'transition hover:text-red-500'} size={20}/>
                            <p>
                                {data.comments?.length || 0}
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default PostItem
