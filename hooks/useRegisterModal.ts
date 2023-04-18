import {create} from 'zustand'
import Modal from "@/components/Model";

interface RegisterModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: true,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))
export default useRegisterModal;
