import React from "react";
import {useRouter} from "next/router";
import {usePost} from "@/hooks";
import {ClipLoader} from "react-spinners";
import {Form, Header} from "@/components";
import PostItem from "@/components/posts/PostItem";

const PostView: React.FC = () => {
    const router = useRouter();
    const {postId} = router.query;
    const {data: fetchedPost, isLoading} = usePost(postId as string);
    if (isLoading || !fetchedPost) return (
        <div className={`flex justify-center items-center h-full`}>
            <ClipLoader color={`lightblue`} size={80}/>
        </div>)

    return <div>
        <Header label={`Tweet`} showBackArrow/>
        <PostItem data={fetchedPost}/>
        <Form postId={postId as string}
              isComment
              placeholder={'Tweet your reply'}
        />
    </div>;
}
export default PostView;
