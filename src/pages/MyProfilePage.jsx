import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import BodyImageUploader from "../components/BodyImageUploader";


const MyProfilePage = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [isAnalysisInProgress, setIsAnalysisInProgress] = useState(false);
    const imageUploaderRef = useRef(null);

    const [form, setForm] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        skinTone: "",
    });

    useEffect(() => {
        if (uploadedImage && !isAnalyzed && !isAnalysisInProgress) {
            setIsAnalysisInProgress(true);

            const timer = setTimeout(() => {
                setIsAnalysisInProgress(false);
                setIsAnalyzed(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [uploadedImage, isAnalyzed, isAnalysisInProgress]);

    const handleImageUpload = (file, preview) => {
        setUploadedImage({ file, preview });
        setIsAnalyzed(false);
    };

    const handleImageRemove = () => {
        if (uploadedImage?.preview) {
            URL.revokeObjectURL(uploadedImage.preview);
        }
        setUploadedImage(null);
        setIsAnalyzed(false);
    };

    useEffect(() => {
        // TODO 개인 프로필 조회 API 호출 
        // axios.get("/user/profile").then(res => setForm(res.data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("폼이 제출되었습니다!");
    };

    return (
        <>
            <div className="min-h-screen bg-[#F7F7F7]">
                <Header />
                <h1 className="pt-[7.5rem] text-[2rem] font-bold text-center">내 프로필</h1>
                <div className="flex flex-col items-center mt-[3.75rem]">
                    <BodyImageUploader
                        ref={imageUploaderRef}
                        uploadedImage={uploadedImage}
                        onImageUpload={handleImageUpload}
                        onImageRemove={handleImageRemove}
                    />
                    <p className="text-[12px] text-[#828282] mt-1 text-center">
                        전신 사진을 등록하면<br />추천 코디를 착용한 모습을 볼 수 있어요.
                    </p>
                    <div className="mt-[3.75rem]">
                        <ProfileForm
                            form={form}
                            setForm={setForm}
                            handleSubmit={handleSubmit}
                            isEdit={true}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfilePage;