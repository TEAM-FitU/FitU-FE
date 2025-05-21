import Header from '../../components/Header';
import React, { useState, useRef, useEffect } from "react";
import ProfileForm from "./ProfileForm";
import BodyImageUploader from './BodyImageUploader';

// TODO 더미 데이터 삭제 
const dummyData = {
    age: 25,
    gender: "FEMALE",
    height: 165,
    weight: 55,
    skinTone: "웜톤",
};

function MyProfile() {
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
        setTimeout(() => {
            setForm(dummyData);
        }, 500);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("폼이 제출되었습니다!");
    };

    return (
        <>
            <div className="min-h-screen bg-[#fafafa]">
                <Header />
                <p className="text-2xl font-bold mt-10 mb-5 text-center">나의 프로필</p>
                <div className="flex flex-col items-center pt-5">
                    <BodyImageUploader
                        ref={imageUploaderRef}
                        uploadedImage={uploadedImage}
                        onImageUpload={handleImageUpload}
                        onImageRemove={handleImageRemove}
                    />
                    <p className="text-xs text-gray-400 mt-2 text-center">
                        전신 사진을 등록하면<br />추천 코디를 착용한 모습을 볼 수 있어요.
                    </p>
                    <div className="w-full max-w-xs mt-8">
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

export default MyProfile;