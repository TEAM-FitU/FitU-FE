import React from "react";
import { motion } from "framer-motion";
import FORM_IMAGE from "../../assets/mock-up-situation-form.png"; // 상황 입력 폼 목업
import RESULT_IMAGE from "../../assets/mock-up-recommend-result.png"; // 추천 결과 목업

const SituationGuideSection = () => (
  <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center bg-black px-4">
    {/* 왼쪽: 설명 */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex-1 flex flex-col justify-center items-start md:pl-24 md:pr-8 w-full h-full"
      style={{ minWidth: 320 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight text-white">
        언제, 어디서, 어떤 상황에서<br />
        <span className="text-[#828282] font-bold">입을 코디가 고민된다면</span>
      </h2>
      <div className="text-lg md:text-xl text-white mb-8 leading-relaxed space-y-6">
        <p>
          간단하게 입력만 해주세요.<br />
          <b>FitU가 입력하신 정보를 바탕으로</b>
        </p>
        <p>
          <b>딱 맞는 코디를 총 3세트</b> 추천해드려요.
        </p>
      </div>
    </motion.div>
    <div className="flex-1 flex justify-center items-center h-full relative md:pr-24 overflow-hidden">
      <motion.img
        src={FORM_IMAGE}
        alt="상황 입력 폼 목업"
        className="w-auto h-[60vh] max-h-full object-contain mt-[-20px] self-start"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        style={{ zIndex: 1, position: "relative"}}
      />
      <motion.img
        src={RESULT_IMAGE}
        alt="추천 결과 목업"
        className="w-auto h-[48vh] max-h-full object-contain absolute left-0 right-0 mx-auto"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}
        style={{
          top: "50%",
          zIndex: 2,
          maxWidth: "80%",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          transform: "translateY(-50%)"
        }}
      />
    </div>
  </section>
);

export default SituationGuideSection;