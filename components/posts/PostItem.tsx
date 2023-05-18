import React, {useCallback, useMemo} from "react";
import {useCurrentUser, useLoginModal} from "@/hooks";
import {useRouter} from "next/router";
import {formatDistanceToNow, formatDistanceToNowStrict} from "date-fns";
import {Avatar} from "@/components";

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

    const onLike= useCallback((event: any) => {
        event.stopPropagation()
        if (!currentUser) {
            loginModal.onOpen()
        }
        // likePost({postId: data.id})
    },[loginModal, currentUser, data.id])

    const createdAt = useMemo(() => {
        if (!data?.createdAt) {
            return null
        }
        return formatDistanceToNowStrict(new Date(data.createdAt), {addSuffix: true})
    }, [data.createdAt])
    return (
        <div className={`border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition`} onClick={goToPost}>
        <div className={`flex flex-row items-start gap-3`}>
            <Avatar userId={data.user.id}  />
        </div>
        </div>
    )

}
export default PostItem
