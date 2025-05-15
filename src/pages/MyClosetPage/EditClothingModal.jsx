import React, { useState, useRef, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // X 아이콘 가져오기
import ImageUploader from "../ClosetRegistrationPage/ImageUploader";
import AttributeSelectors from "../ClosetRegistrationPage/AttributeSelectors";

function EditClothingModal({ isOpen, onClose, clothingData, onSave }) {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [attributes, setAttributes] = useState({
        category: "",
        type: "",
        pattern: "",
        tone: "",
    });
    const [isAnalyzed, setIsAnalyzed] = useState(true); // 수정 시에는 이미 분석된 상태 

    const imageUploaderRef = useRef(null);

    // 모달이 열릴 때 기존 데이터 로드
    useEffect(() => {
        if (isOpen && clothingData) {
            // 기존 이미지 설정
            setUploadedImage({
                file: null, // 파일 객체는 없지만
                preview: clothingData.imageUrl, // 미리보기 URL은 있음
            });

            // 기존 속성 설정
            setAttributes({
                category: clothingData.tags.find((tag) => tag.type === "category")?.value || "",
                type: clothingData.tags.find((tag) => tag.type === "type")?.value || "",
                pattern: clothingData.tags.find((tag) => tag.type === "pattern")?.value || "",
                tone: clothingData.tags.find((tag) => tag.type === "tone")?.value || "",
            });
        }
    }, [isOpen, clothingData]);

    const handleImageUpload = (file, preview) => {
        setUploadedImage({ file, preview });
    };

    const handleImageRemove = () => {
        if (uploadedImage?.preview) {
            URL.revokeObjectURL(uploadedImage.preview);
        }
        setUploadedImage(null);
    };

    const handleAttributeChange = (name, value) => {
        setAttributes((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // 수정시에는 이미지 데이터가 무조건 필수, 이미지가 없다면 이미지를 업로드 해주세요 알림 고려
        onSave({
            id: clothingData.id,
            imageUrl: uploadedImage?.preview || clothingData.imageUrl,
            tags: [
                { type: "category", value: attributes.category },
                { type: "type", value: attributes.type },
                { type: "pattern", value: attributes.pattern },
                { type: "tone", value: attributes.tone },
            ].filter((tag) => tag.value), // 빈 값 필터링
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-gray-500/75 transition-opacity z-50 flex items-center justify-center p-4 backdrop-blur-[2px]'>
            <div className='bg-white rounded-xl shadow-xl w-full max-w-3xl h-[500px] overflow-y-auto flex flex-col'>
                <div className='p-6 flex flex-col flex-grow'>
                    {/* 헤더 영역 */}
                    <div className='flex items-center justify-center relative mb-6'>
                        <h2 className='text-2xl font-bold text-center'>의상 수정</h2>
                        <button onClick={onClose} className='absolute right-0 top-0 text-gray-500 hover:text-black cursor-pointer' aria-label='닫기'>
                            <XMarkIcon className='h-6 w-6' />
                        </button>
                    </div>
                    <div className='text-center'>
                        <p>이미지 또는 의상 속성을 변경할 수 있습니다.</p>
                        <p>AI 분석 결과는 이미지를 변경할 경우 재분석될 수 있습니다.</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-center justify-center flex-grow'>
                        {/* 이미지 업로더 - 왼쪽 */}
                        <div className='w-full md:w-5/12 flex justify-center items-center'>
                            <div className='w-full max-w-sm'>
                                <ImageUploader
                                    ref={imageUploaderRef}
                                    uploadedImage={uploadedImage}
                                    onImageUpload={handleImageUpload}
                                    onImageRemove={handleImageRemove}
                                />
                            </div>
                        </div>

                        {/* 속성 선택기 - 오른쪽 */}
                        <div className=''>
                            <AttributeSelectors attributes={attributes} onAttributeChange={handleAttributeChange} isAnalyzed={isAnalyzed} />
                        </div>
                    </div>

                    {/* 버튼 영역 */}
                    <div className='flex justify-center space-x-4'>
                        <button onClick={onClose} className='px-6 py-2.5 border border-gray-300 rounded text-sm font-medium cursor-pointer'>
                            취소
                        </button>
                        <button onClick={handleSave} className='px-6 py-2.5 bg-black text-white rounded text-sm font-medium cursor-pointer'>
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditClothingModal;
