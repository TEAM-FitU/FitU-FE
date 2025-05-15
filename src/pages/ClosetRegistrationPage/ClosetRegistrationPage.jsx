import React, { useState, useEffect, useRef } from "react";
import ImageUploader from "./ImageUploader";
import AttributeSelectors from "./AttributeSelectors";
import Waitlist from "./Waitlist";

const initialAttributes = {
    category: "",
    type: "",
    pattern: "",
    tone: "",
};

function ClosetRegistrationPage() {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [attributes, setAttributes] = useState(initialAttributes);
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [waitlistItems, setWaitlistItems] = useState([]);
    const [isAnalysisInProgress, setIsAnalysisInProgress] = useState(false);
    const [isWaitlistExpanded, setIsWaitlistExpanded] = useState(true);

    const imageUploaderRef = useRef(null);

    useEffect(() => {
        // 이미지가 업로드되면 AI 분석 시작을 시뮬레이션
        if (uploadedImage && !isAnalyzed && !isAnalysisInProgress) {
            setIsAnalysisInProgress(true);
            // AI 분석 시뮬레이션 (2초 후 완료)
            const timer = setTimeout(() => {
                setIsAnalysisInProgress(false);
                setIsAnalyzed(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [uploadedImage, isAnalyzed, isAnalysisInProgress]);

    const handleImageUpload = (file, preview) => {
        setUploadedImage({ file, preview });
        setIsAnalyzed(false); // 새 이미지 업로드 시 분석 상태 초기화
    };

    const handleImageRemove = () => {
        if (uploadedImage?.preview) {
            URL.revokeObjectURL(uploadedImage.preview);
        }
        setUploadedImage(null);
        setIsAnalyzed(false);
        setAttributes(initialAttributes);
    };

    const handleAttributeChange = (name, value) => {
        setAttributes((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleAddToWaitlist = async () => {
        if (!uploadedImage) return;

        // 이미지 URL에서 Blob으로 가져오기
        const response = await fetch(uploadedImage.preview);
        const blob = await response.blob();

        // 새로운 URL 생성. 대기 목록에 추가할때 이미지 URL 새로 생성하지 않으면 대기 목록에서 엑박 뜸
        const newImageUrl = URL.createObjectURL(blob);

        // 새로운 대기 목록 항목 생성
        const newItem = {
            id: Date.now().toString(),
            image: newImageUrl,
            attributes: { ...attributes },
        };

        setWaitlistItems((prevItems) => [...prevItems, newItem]);

        // 대기 목록에 이미지 추가 후, 입력 초기화
        if (imageUploaderRef.current) {
            imageUploaderRef.current.resetFileInput();
        }

        // 입력 필드 초기화
        handleImageRemove();
    };

    const handleRemoveFromWaitlist = (itemId) => {
        setWaitlistItems((prevItems) => {
            // 삭제하기 전에 해당 아이템의 이미지 URL을 해제
            const itemToRemove = prevItems.find((item) => item.id === itemId);
            if (itemToRemove && itemToRemove.image) {
                URL.revokeObjectURL(itemToRemove.image);
            }
            return prevItems.filter((item) => item.id !== itemId);
        });
    };
    
    // ／／ 추후 주석 해제 예정
    //  const canAddToWaitlist = uploadedImage && !isAnalysisInProgress;

    return (
        <div className='bg-[#F7F7F7] py-4 px-4 sm:px-6 lg:px-8 flex flex-col min-h-screen overflow-x-hidden'>
            <main className='max-w-4xl mx-auto flex flex-col w-full flex-1'>
                {/* 헤더 밑부분 영역 */}
                <div className='mb-3'>
                    <h1 className='text-2xl font-bold text-center text-black mb-1'>FitU</h1>
                    <div className='h-7 flex items-center justify-center text-gray-400 text-xs'>[ 의상 등록 프로그레스 바 영역 ]</div>
                </div>
                {/* 옷 등록 영역 - 단일 컨테이너로 구성 */}
                <div className='bg-white shadow-lg rounded-xl pt-8'>
                    {/* 내용 영역: 이미지 업로더와 속성 선택기를 포함한 그리드 */}
                    <div className='grid grid-cols-1 md:grid-cols-2 items-stretch'>
                        {/* 왼쪽: 이미지 업로더 */}
                        <div className='flex justify-center md:justify-end mb-4 md:mb-0 pr-2 md:pr-8'>
                            <div className='max-w-xs'>
                                <ImageUploader
                                    ref={imageUploaderRef}
                                    uploadedImage={uploadedImage}
                                    onImageUpload={handleImageUpload}
                                    onImageRemove={handleImageRemove}
                                />
                            </div>
                        </div>

                        {/* 오른쪽: 속성 선택기 */}
                        <div className='flex flex-col pl-2 md:pl-8'>
                            <div>
                                <AttributeSelectors attributes={attributes} onAttributeChange={handleAttributeChange} isAnalyzed={isAnalyzed} />
                            </div>
                        </div>
                    </div>

                    {/* "대기 목록에 추가하기" 버튼 - 가운데 배치 */}
                    <div className='flex justify-center'>
                        <button
                            type='button'
                            onClick={handleAddToWaitlist}
                            // disabled={!canAddToWaitlist}
                            className='w-[200px] h-[36px] bg-black hover:bg-gray-800 mb-8 mt-8 text-white font-semibold py-2 px-4 rounded-md text-xs
                            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer
                            transition-colors duration-150 ease-in-out'
                        >
                            {/* {isAnalysisInProgress ? "분석 중..." : "대기 목록에 추가하기"} */}
                            대기 목록에 추가하기
                        </button>
                    </div>
                </div>
                {/* 대기 목록 제목 */}
                <div
                    className='flex items-center justify-center my-4 cursor-pointer group hover:bg-gray-100 py-2 px-4 rounded-lg transition-all duration-200'
                    onClick={() => setIsWaitlistExpanded(!isWaitlistExpanded)}
                >
                    <h2 className='text-base font-semibold text-gray-700 mr-2 group-hover:text-black transition-colors duration-200'>
                        대기 목록 ({waitlistItems.length})
                    </h2>
                    {/* 화살표 SVG 아이콘 - 토글 상태에 따라 회전 */}
                    <svg
                        className={`w-5 h-5 text-gray-700 group-hover:text-black transition-all duration-300 ease-in-out transform ${
                            isWaitlistExpanded ? "rotate-180" : "rotate-0"
                        }`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                    </svg>
                </div>
                {/* 대기 목록 표시 영역 - 토글 상태에 따라 표시/숨김 */}
                <div
                    className={`bg-white shadow-lg rounded-xl flex items-start justify-center overflow-hidden transition-all duration-500 ease-in-out ${
                        isWaitlistExpanded
                            ? `opacity-100 mb-4 pt-8 pb-8 ${waitlistItems.length > 8 ? "max-h-[420px]" : ""}`
                            : "max-h-0 opacity-0 mb-0 pt-0 pb-0 border-t-0 border-b-0"
                    }`}
                >
                    <div className='w-full h-full flex-1 px-2'>
                        <Waitlist items={waitlistItems} onRemoveItem={handleRemoveFromWaitlist} />
                    </div>
                </div>
                {/* 하단 네비게이션 버튼 - 가운데 정렬 */}
                <div className='flex justify-center space-x-4 py-2'>
                    <button
                        type='button'
                        className='px-8 py-2 border border-black rounded text-xs font-medium text-black cursor-pointer hover:bg-gray-100 focus:outline-none'
                    >
                        이전
                    </button>
                    <button
                        type='button'
                        className='px-8 py-2 bg-black hover:bg-gray-800 text-white cursor-pointer rounded text-xs font-medium focus:outline-none'
                    >
                        다음
                    </button>
                </div>
            </main>
        </div>
    );
}

export default ClosetRegistrationPage;
