import React from "react";
import Header from "../components/Header";

const SetSituation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-1 justify-center">
        <div className="w-full max-w-xl">
          <h1 className="font-bold text-[32px] text-black text-center mt-[70px] mb-[70px]">
            FitU
          </h1>
          <form method="post" className="flex flex-col space-y-[100px]">
            <div>
              <label htmlFor="occasion" className="block font-bold text-[20px] text-black text-center mb-[15px]">
                  어떤 상황에서 입을 예정인가요? <span className="text-[#828282]">*</span>
              </label>
              <input
                type="text"
                id="occasion"
                name="occasion"
                placeholder="코디를 입을 상황(여행, 데이트 등)을 입력해주세요."
                className="w-full h-[45px] rounded border border-[#828282] px-[10px] text-[14px] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="time" className="block font-bold text-[20px] text-black text-center mb-[15px]">
                  언제 입을 예정인가요? <span className="text-[#828282]">*</span>
              </label>
              <input
                  type="date"
                  id="time"
                  name="time"
                  className="w-full h-[45px] rounded border border-[#828282] px-[10px] text-[14px] focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="place" className="block font-bold text-[20px] text-black text-center mb-[15px]">
                  어디에서 입을 예정인가요? <span className="text-[#828282]">*</span>
              </label>
              <input
                type="text"
                id="place"
                name="place"
                placeholder="코디를 입을 장소(롯데월드, 경포대 등)을 입력해주세요."
                className="w-full h-[45px] rounded border border-[#828282] px-[10px] text-[14px] focus:outline-none"
              />
            </div>
            <div>
              <div className="block font-bold text-[20px] text-black text-center">
                옷장 속 의상만 추천할까요? <span className="text-[#828282]">*</span>
              </div>
              <div className="block text-[14px] text-[#828282] text-center mb-[15px]">
                체크 박스 해제 시, 나의 옷장에 없는 옷도 추천될 수 있습니다.
              </div>
              <label className="flex items-center justify-center gap-[10px]">
                <input
                  type="checkbox"
                  id="onlyCloset"
                  className="w-[20px] h-[20px] border-[#828282] accent-black"
                />
                <span className="text-[14px] text-black">옷장 속 의상만 추천받기</span>
              </label>
            </div>
            <button type="submit" className="h-[45px] rounded bg-black text-[16px] text-white">
              코디 추천 받기
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SetSituation;
