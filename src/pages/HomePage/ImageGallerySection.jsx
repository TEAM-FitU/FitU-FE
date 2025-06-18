import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ImageGallerySection.styles.css";
import MODEL_IMG1 from "../../assets/model1.jpg";
import MODEL_IMG2 from "../../assets/model2.png";
import MODEL_IMG3 from "../../assets/model3.png";

const imageGroup = [
    {
        src: MODEL_IMG1,
        description: "린넨 혼방 반팔 셔츠 – 여름철 시원하게 입기 좋아요."
    },
    {
        src: MODEL_IMG2,
        description: "베이지 톤의 캐주얼 팬츠 – 어디에나 잘 어울려요."
    },
    {
        src: MODEL_IMG3,
        description: "기본 블랙 반팔 – 심플하고 깔끔한 느낌!"
    }
];

const ImageGallerySection = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <section className="relative w-full h-screen bg-white">
                <h2 className="text-black text-[2rem] p-[4rem] font-bold text-center">
                    나만의 추천 코디, FitU
                </h2>
                <p className="text-center text-[#828282] text-base font-medium -mt-8 mb-8">
        AI가 추천한 코디예요.<br />
        이미지를 클릭하면 자세히 볼 수 있어요!
    </p>
                <div className="image-gallery-container w-full">
                    {imageGroup.map((item, idx) => (
                        <motion.div
                            className="image-gallery-card"
                            key={idx}
                            onClick={() => setSelectedImage(item)}
                            whileHover={{ scale: 1.03 }}
                            transition={{ type: "tween", duration: 0.3 }}
                            layoutId={`image-${idx}`}
                        >
                            <img
                                src={item.src}
                                alt={item.description}
                            />
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="backdrop"
                            onClick={() => setSelectedImage(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="modal-content"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 50, opacity: 0 }}
                            >
                                <img src={selectedImage.src} alt={selectedImage.description} />

                                <div className="modal-description">
                                    <p className="text-m font-bold">캠핑</p>
                                    <p className="text-2xl font-bold mb-2">활동은 자유롭게, 관리도 손쉽게</p>
                                    <p className="text-lg">
                                        선선한 바람. 흡습속건 블랙 티셔츠라 땀에 금방 마르고 구김 걱정도 적어요. 데님이나 조거 팬츠와 바로 매치하면 깔끔한 캠핑룩 완성.</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};

export default ImageGallerySection;