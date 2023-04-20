import React, {useCallback, useState} from 'react';
import Input from "@/components/layout/Input";
import Modal from "@/components/Model";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";


const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const onSubmit = useCallback(() => {
            try {
                setIsLoading(true);
                //todo add login in
                registerModal.onClose();
            } catch (error: any) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        },
        [RegisterModal]);
    const onToggle = useCallback(() => {
        if (!isLoading) {
            registerModal.onClose();
            loginModal.onOpen();
        }
    }, [registerModal, loginModal, isLoading]);
    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Input
                placeholder={'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder={'Name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
            />
            <Input
                placeholder={'Username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already Have an account?
                <span
                    onClick={onToggle}
                    className='text-white cursor-pointer hover:underline'>
                 Sign In
            </span>
            </p>
        </div>
    )
    return (
        <div>
            <Modal
                disabled={isLoading}
                isOpen={registerModal.isOpen}
                title={'Create an account'}
                actionLabel={'Register'}
                onClose={registerModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                footer={footerContent}
                // error={error}
            />
        </div>
    );
};

export default RegisterModal;
