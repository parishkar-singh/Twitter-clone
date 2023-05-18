import React from "react";
import {useLoginModal, useRegisterModal} from "@/hooks";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;

}

const Form: React.FC<FormProps> = ({placeholder, postId, isComment}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    return (
        <div>

        </div>
    )
}
export default Form
