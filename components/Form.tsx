import React, {useCallback, useState} from "react";
import {useCurrentUser, usePosts, useLoginModal, useRegisterModal} from "@/hooks";
import {toast} from "react-hot-toast";
import axios from "axios";
import {Avatar, Button} from "@/components";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;

}

const Form: React.FC<FormProps> = ({placeholder, postId, isComment}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutatePost} = usePosts();
    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.post(`/api/posts/`, {body});
            toast.success('Tweet Created.');
            setBody("");
            await mutatePost();
        } catch (e) {
            toast.error('An error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [mutatePost, body]);
    return (
        <div className={'border-b-[1px] border-neutral-800 px-5 py-2'}>
            {currentUser ? (
                <div className={`flex flex-row gap-4`}>
                <div>
                    <Avatar userId={currentUser?.id}/>
                </div>
                    <div className={`w-full`}>
                        <textarea placeholder={placeholder} disabled={isLoading} onChange={(e)=>setBody(e.target.value)} value={body} className={`disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white`}>
                        </textarea>
                        <hr className={`opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition`} />
                        <div className={`mt-4 flex flex-row justify-end`}>
                            <Button label={`Tweet`} onClick={onSubmit} disabled={isLoading||!body}/>
                        </div>

                    </div>
            </div>) : (

                <div className={`py-8`}>
                    <h1 className={`text-white text-2xl text-center mb-4 font-bold`}>Welcome to Twitter</h1>
                    <div className={`flex flex-row items-center justify-center gap-4`}>
                        <Button label={`Login`} onClick={loginModal.onOpen}/>
                        <Button label={`Register`} onClick={registerModal.onOpen} secondary/>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Form
