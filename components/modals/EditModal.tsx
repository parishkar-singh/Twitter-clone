import {useCurrentUser, useEditModal, useUser} from "@/hooks";
import {useEffect, useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import axios from "axios";
import {Modal, Input, Button, ImageUpload} from "@/components";

const EditModal = () => {
    const {data: currentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(currentUser?.id);
    const editModal = useEditModal();
    // use states for the edit modal
    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    useEffect(() => {
        if (currentUser) {
            setProfileImage(currentUser.profileImage);
            setCoverImage(currentUser.coverImage);
            setName(currentUser.name);
            setUsername(currentUser.username);
            setBio(currentUser.bio);
        }
    }, [currentUser])
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = useCallback(async () => {
            try {
                setIsLoading(true);
                await axios.patch('/api/edit', {
                    profileImage,
                    coverImage,
                    name,
                    username,
                    bio
                });
                mutateFetchedUser();
                toast.success('Profile updated');
                editModal.onClose();
            } catch
                (error) {
                toast.error('Something went wrong');
            }
        }, [profileImage, coverImage, name, username, bio]
    )
    const bodyContent = (
        <div className={`flex flex-col gap-4`}>
            <Input placeholder={'Name'} onChange={(e) => setName(e.target.value)} value={name}/>
            <Input placeholder={'Username'} onChange={(e) => setUsername(e.target.value)} value={username}/>
            <Input placeholder={'Bio'} onChange={(e) => setBio(e.target.value)} value={bio}/>
            <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => {
                setProfileImage(image)
            }} label={`Upload Profile Image`}/>
            <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => {
                setCoverImage(image)
            }} label={`Upload Cover Image`}/>
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            onClose={editModal.onClose}
            body={bodyContent}
            onSubmit={onSubmit}
            title="Edit your Profile"
            actionLabel="Save"/>
    )
}
export default EditModal;
