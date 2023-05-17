import React, {useCallback} from "react";
import Image from "next/image";
import {useDropzone} from "react-dropzone";

interface ImageUploadProps {
    label?: string;
    value?: string;
    disabled?: boolean;
    onChange?: (base64: string) => void;

}

const ImageUpload: React.FC<ImageUploadProps> = ({label, value, disabled, onChange}) => {
    const [base64, setBase64] = React.useState(value);
    const handleChange = useCallback((base64: string) => {
        onChange?.(base64);
    }, [onChange])
    const handleDrop = useCallback((files: any) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        }
        reader.readAsDataURL(file);
    }, [handleChange])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop: handleDrop, maxFiles: 1, accept: {
            "image/jpeg": [],
            "image/png": [],
        }, disabled
    });
    return (
        <div
            {...getRootProps({
                className: `w-full p-4 text-white border-2 border-dotted rounded-full rounded-md border-neutral-700`
            })}>
            <input {...getInputProps()} />
            {base64?(
                <div className={`flex items-center justify-center`}>
                    <Image src={base64} width={100} height={100}  alt={'Uploaded Image'}/>
                </div>
            ):(
                <p className={`text-white`}>{label}</p>
            )}
        </div>
    );
}
export default ImageUpload;
