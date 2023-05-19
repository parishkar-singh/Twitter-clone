import React, {useCallback, useMemo} from 'react';
import {useRouter} from "next/router";
import {formatDistanceToNow, formatDistanceToNowStrict} from "date-fns";
import {Avatar} from "@/components";
interface CommentItemProps {
    data: Record<string, any>;
}
const CommentItem: React.FC<CommentItemProps> = ({data}) => {
    const router = useRouter()
    const gotoToUser = useCallback((event: any) => {
        event.stopPropagation()
        router.push(`/users/${data.user.id}`)
    }, [router, data.user.id])
    const createdAt = useMemo(() => {
        if (!data.createdAt) return null
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data.createdAt])
    return (
        <div className={`border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition`}>
            <div className={`flex flex-row items-start gap-3`}>
                <Avatar userId={data.user.id} />
                <div>
                    <div className={`flex flex-row items-center gap-2`}>
                        <p onClick={gotoToUser} className={`text-white cursor-pointer hover:underline transition hover:text-sky-500 font-bold`}>{data.user.name}</p>
                        <span className={`cursor-pointer text-sm hover:underline transition text-neutral-500 italic`}>
                            @{data.user.username}
                        </span>
                        <span className={`text-neutral-500 text-sm`}>
                            {createdAt}
                        </span>
                    </div>
                    <div className={`text-white `}>
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CommentItem;
