import React, {useCallback, useState} from 'react';
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/layout/Input";
import Modal from "@/components/Model";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const onSubmit = useCallback(() => {
            try {
                setIsLoading(true);
                //todo add login in
                loginModal.onClose();
            } catch (error) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        },
        [loginModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder={'Password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
            />
        </div>
    )
    return (
        <div>
            <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title={'Login'}
            actionLabel={'Sign In'}
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            // error={error}
            />
        </div>
    );
};

export default LoginModal;
