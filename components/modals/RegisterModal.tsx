import React, {useCallback, useState} from 'react';
import Input from "@/components/layout/Input";
import Modal from "@/components/Model";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";


const RegisterModal = () => {
    const LoginModal=useLoginModal();
    const RegisterModal = useRegisterModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const onSubmit = useCallback(() => {
            try {
                setIsLoading(true);
                //todo add login in
                RegisterModal.onClose();
            } catch (error: any) {
                console.log(error.message);
            } finally {
                setIsLoading(false);
            }
        },
        [RegisterModal]);

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
                isOpen={RegisterModal.isOpen}
                title={'Login'}
                actionLabel={'Sign In'}
                onClose={RegisterModal.onClose}
                onSubmit={onSubmit}
                body={bodyContent}
                // error={error}
            />
        </div>
    );
};

export default RegisterModal;
