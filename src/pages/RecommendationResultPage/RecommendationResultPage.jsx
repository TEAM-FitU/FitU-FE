import React from "react";
import Header from "../../components/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RecommendationResultPage.styles.css";

const mockApiResponse = {
    "summary": "친구네 집들이, 2025-06-13, 서울역, 흐림, 기온 26°C ~ 20°C",
    "contents": [
        {
            "clothesCombination": "조합 1: TOP: BLOUSE, BOTTOM: SLACKS",
            "description": "CLT_000070 블라우스는 쿨톤 피부에 잘 어울리는 색상이며, CLT_000082 슬랙스는 편안하면서도 세련된 느낌을 줘서 집들이에 적합합니다.",
            "imageUrl": "https://amzn-s3-fitu-bucket.s3.ap-northeast-2.amazonaws.com/FASHNAI_result/9f4d3e1a-7c42-4c23-9f36-6beecb27b214_1749373330_26d51c4b-c6a1-4ec7-be10-7878d84ef7ee.jpg"
        },
        {
            "clothesCombination": "조합 2: TOP: CARDIGAN, BOTTOM: JEANS",
            "description": "CLT_000056 카디건은 흐린 날씨에 적당한 레이어링을 제공하고, CLT_000079 청바지는 캐주얼하면서도 스타일을 유지할 수 있어 집들이에 잘 어울립니다.",
            "imageUrl": "https://amzn-s3-fitu-bucket.s3.ap-northeast-2.amazonaws.com/FASHNAI_result/9f4d3e1a-7c42-4c23-9f36-6beecb27b214_1749373302_fecb1ff5-ec45-449b-a32f-40d64c2cd924.jpg"
        },
        {
            "clothesCombination": "조합 3: ONEPIECE: DRESS",
            "description": "CLT_000064 원피스는 쿨톤 피부에 잘 어울리며, 흐린 날씨에도 편안하게 입을 수 있어 집들이에 적합한 선택입니다.",
            "imageUrl": "https://amzn-s3-fitu-bucket.s3.ap-northeast-2.amazonaws.com/FASHNAI_result/9f4d3e1a-7c42-4c23-9f36-6beecb27b214_1749373280_f11045eb-da03-4ea6-80fc-ac31ac30ebe2.jpg"
        }
    ]
};

const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
};

const RecommendationResultPage = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

    const duplicatedContents = [...mockApiResponse.contents, ...mockApiResponse.contents];
  
    const currentContent = duplicatedContents[currentSlideIndex % mockApiResponse.contents.length];
  
    const updatedSettings = {
      ...settings,
      afterChange: (current) => setCurrentSlideIndex(current),
    };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F7]">
        <Header />
        <main className="flex flex-1 justify-center">
            <div className="w-full max-w-xl">
                <h1 className="font-bold text-[32px] text-black text-center mt-[70px] mb-[70px]">
                    추천 코디
                </h1>
                <h2 className="text-[22px] text-black text-center mb-[70px]">
                    {mockApiResponse.summary}
                </h2>
                <div className="slider-wrapper">
                    <Slider {...updatedSettings}>
                        {duplicatedContents.map((contentItem, index) => (
                            <div key={index} data-index={index + 1} className="book-cover">
                                <img src={contentItem.imageUrl} alt={`Outfit Combination ${index + 1}`}/>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="rounded bg-white border border-gray-100 w-full h-[300px] p-6 text-base overflow-y-auto mt-[70px]">
                    <p className="whitespace-pre-line text-black mb-[10px]"> {/* 조합 텍스트 강조 */}
                        {currentContent.clothesCombination}
                    </p>
                    <p className="whitespace-pre-line text-black">
                        {currentContent.description}
                    </p>
                </div>
            </div>
        </main>
    </div>
  );
};

export default RecommendationResultPage;