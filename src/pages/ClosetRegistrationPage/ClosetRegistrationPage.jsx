import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ImageUploader from "./ImageUploader";
import AttributeSelectors from "./AttributeSelectors";
import Waitlist from "./Waitlist";
import Header from "../../components/Header";
import useUserStore from "../../store/userStore";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { analyzeClothingImage, registerUserWithCloset } from "../../api/clothesAPI";

const initialAttributes = {
    category: "",
    type: "",
    pattern: "",
    tone: "",
};

const requiredFields = ["age", "gender", "height", "weight", "skinTone"];

const ClosetRegistrationPage = ({ showProgress = true, title = "FitU" }) => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [attributes, setAttributes] = useState(initialAttributes);
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [isAnalysisInProgress, setIsAnalysisInProgress] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [waitlistItems, setWaitlistItems] = useState([]);
    const [isWaitlistExpanded, setIsWaitlistExpanded] = useState(true);

    const imageUploaderRef = useRef(null);

    const { profile } = useUserStore();

    const navigate = useNavigate();

    // 프로필 정보 확인, 추후 백엔드로 같이 요청 및 최종 저장 후 resetProfile로 프로필 초기화 예정
    useEffect(() => {
        // 프로필 정보가 없으면 프로필 페이지로 리다이렉트
        const hasAllRequiredFields = requiredFields.every((field) => profile[field]);
        const userId = localStorage.getItem("userId");

        if (!hasAllRequiredFields && !userId) {
            alert("프로필 정보가 누락되었습니다. 프로필 페이지로 이동합니다.");
            navigate("/set-profile");
        }
    }, []);

    const handleImageUpload = async (file, preview) => {
        setUploadedImage({ file, preview });
        setIsAnalyzed(false); // 새 이미지 업로드 시 분석 상태 초기화
        setIsAnalysisInProgress(true); // 버튼에 분석 중 상태 표시

        try {
            // 이미지 분석 API 호출
            const result = await analyzeClothingImage(file);
            console.log("이미지 분석 결과:", result);

            // 분석 결과로 속성 업데이트
            if (result.attributes) {
                setAttributes({
                    category: result.attributes.category || "",
                    type: result.attributes.type || "",
                    pattern: result.attributes.pattern || "",
                    tone: result.attributes.tone || "",
                });
            }

            setIsAnalyzed(true);
        } catch (error) {
            console.error("이미지 분석 오류:", error);
            // 추후에 유효성 검사에 실패 했을때와 다른 오류 구분해서 알림 처리 필요
            setTimeout(() => {
                alert("의상 분석에 실패했습니다. 다시시도 하거나 수동으로 선택해주세요.");
            }, 500);
        } finally {
            setIsAnalysisInProgress(false); // 분석 완료 상태
        }
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

        // 속성 유효성 검사
        const isAttributesValid = Object.values(attributes).every((value) => value && value.trim() !== "");
        console.log("속성 유효성 검사 결과:", isAttributesValid);

        if (!isAttributesValid) {
            alert("모든 의류 속성(카테고리, 타입, 패턴, 톤)을 선택해주세요.");
            return;
        }

        // 이미지 URL에서 Blob으로 가져오기
        const response = await fetch(uploadedImage.preview);
        const blob = await response.blob();

        // 새로운 URL 생성. 대기 목록에 추가할때 이미지 URL 새로 생성하지 않으면 대기 목록에서 엑박 뜸
        const newImageUrl = URL.createObjectURL(blob);

        // 새로운 대기 목록 항목 생성
        const newItem = {
            id: Date.now().toString(),
            image: newImageUrl, // 대기 목록에서 프론트 보여주기 용도
            file: uploadedImage.file, //  실제 백엔드로 보내줄 파일
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

    // 의류 카테고리 유효성 검사 추가
    const checkClothingRequirements = () => {
        // 상의와 하의가 각각 1개 이상 있는지 확인 (원피스는 상의+하의로 간주)
        const hasTop = waitlistItems.some((item) => item.attributes.category === "TOP");
        const hasBottom = waitlistItems.some((item) => item.attributes.category === "BOTTOM");
        const hasOnePiece = waitlistItems.some((item) => item.attributes.category === "ONEPIECE");

        // 원피스가 있거나 (상의 + 하의)가 있으면 유효
        return {
            hasTop,
            hasBottom,
            hasOnePiece,
            isValid: hasOnePiece || (hasTop && hasBottom),
        };
    };
    const handleNavigation = async (path) => {
        // '이전' 버튼은 유효성 검사 없이 이동
        if (path === "/set-profile") {
            navigate(path);
            return;
        }

        // '다음' 또는 '추가하기' 버튼은 유효성 검사 후 이동
        const { isValid } = checkClothingRequirements();

        if (isValid) {
            try {
                // 로딩 상태 시작
                setIsRegistering(true);
                // 백엔드로 프로필 및 의류 정보 전송
                const userId = await registerUserWithCloset(profile, waitlistItems);
                // 등록 완료 시 로컬 스토리지에 사용자 UUID 저장
                localStorage.setItem("userId", userId);
                // 등록 완료 후 완료 페이지로 이동
                navigate(path);
            } catch (error) {
                console.error("등록 중 오류 발생:", error);
                alert("등록 중 오류가 발생했습니다. 다시 시도해 주세요.");
            } finally {
                setIsRegistering(false);
            }
        } else {
            const errorMessage = "최소한 원피스 1벌 또는 상의와 하의를 각각 1벌씩 추가해야 합니다.";
            alert(errorMessage);
        }
    };

    return (
        <div className='bg-[#F7F7F7] flex flex-col min-h-screen overflow-x-hidden'>
            {/* 전체 화면 로딩 오버레이 - 등록 중일 때만 표시 */}
            {isRegistering && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <ClipLoader color='#ffffff' size={60} />
                </div>
            )}

            <Header />

            <main className='mb-max-w-4xl mx-auto flex flex-col w-full flex-1 mt-[7.5rem]'>
                {/* 헤더 밑부분 영역 - props에 따라 조건부 렌더링 */}
                <div>
                    <h1 className={`text-[2rem] font-bold text-center text-black ${showProgress ? "mb-0" : "mb-[4.375rem]"}`}>{title}</h1>
                    {showProgress && <ProgressBar activeStep={2} />}
                </div>
                {/* 옷 등록 영역 - 단일 컨테이너로 구성 */}
                <div className='bg-white shadow-lg rounded-xl pt-8 w-1/2 mx-auto mt-[3.75rem]'>
                    {/* 이미지 분석 중 로딩 오버레이 */}
                    {isAnalysisInProgress && (
                        <div className='absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-20 rounded-xl'>
                            <ClipLoader color='#000000' size={60} />
                        </div>
                    )}

                    {/* 내용 영역: 이미지 업로더와 속성 선택기를 포함한 그리드 */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch'>
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
                        <div className='flex flex-col pl-2 md:pl-8 justify-center'>
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
                            disabled={isAnalysisInProgress || !uploadedImage}
                            className='w-[200px] h-[2.8125rem] text-[1rem] bg-black hover:bg-gray-800 mb-8 mt-8 text-white font-semibold py-2 px-4 rounded-md  
                            disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer
                            transition-colors duration-150 ease-in-out'
                        >
                            {isAnalysisInProgress ? "분석 중..." : "대기 목록에 추가하기"}
                        </button>
                    </div>
                </div>
                {/* 대기 목록 제목 */}
                <div
                    className='flex items-center justify-center my-6 cursor-pointer group py-2 px-4 rounded-lg transition-all duration-200'
                    onClick={() => setIsWaitlistExpanded(!isWaitlistExpanded)}
                >
                    <h2 className='text-base font-semibold text-gray-700 mr-2 hover:bg-gray-100  group-hover:text-black transition-colors duration-200'>
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
                    className={`w-1/2 mx-auto bg-white shadow-lg rounded-xl flex items-start justify-center overflow-hidden transition-all duration-500 ease-in-out ${
                        isWaitlistExpanded
                            ? `opacity-100 pt-8 pb-8 ${waitlistItems.length > 8 ? "max-h-[420px]" : ""}`
                            : "max-h-0 opacity-0 mb-0 pt-0 pb-0 border-t-0 border-b-0"
                    }`}
                >
                    <div className='w-full h-full flex-1 px-2'>
                        <Waitlist items={waitlistItems} onRemoveItem={handleRemoveFromWaitlist} />
                    </div>
                </div>
                {/* 하단 네비게이션 버튼 - showProgress에 따라 다른 버튼 표시 */}
                {showProgress ? (
                    <div className={`flex justify-center space-x-4 ${isWaitlistExpanded ? "my-6" : ""}`}>
                        <button
                            onClick={() => handleNavigation("/set-profile")}
                            className='h-[2.8125rem] text-[1rem] px-8 py-2 border border-[#828282] rounded text-xs font-medium text-black cursor-pointer hover:bg-gray-100 focus:outline-none flex items-center justify-center'
                        >
                            이전
                        </button>
                        <button
                            onClick={() => handleNavigation("/completion")}
                            className='h-[2.8125rem] text-[1rem] px-8 py-2 bg-black hover:bg-gray-800 text-white cursor-pointer rounded text-xs font-medium focus:outline-none flex items-center justify-center'
                        >
                            다음
                        </button>
                    </div>
                ) : (
                    <div className={`flex justify-center space-x-4 ${isWaitlistExpanded ? "my-6" : ""}`}>
                        <button
                            onClick={() => handleNavigation("/my-closet")}
                            className='h-[2.8125rem] text-[1rem] px-8 py-2 bg-black hover:bg-gray-800 text-white cursor-pointer rounded text-xs font-medium focus:outline-none flex items-center justify-center'
                        >
                            추가하기
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ClosetRegistrationPage;
