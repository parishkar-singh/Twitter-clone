import React from "react";
import {usePosts} from "@/hooks";
import PostItem from "@/components/posts/PostItem";

interface PostFeedProps {
    userId?: string
}

const PostFeed: React.FC<PostFeedProps> = ({userId}) => {
    const {data: posts = []} = usePosts(userId);
    return (
        <div className={'z-1'}>
            <>
                {posts?.map((post: Record<string, any>) => (
                        <PostItem  userId={userId} key={post.id} data={post}/>
                    )
                )}
            </>

        </div>
    )
}
export default PostFeed
