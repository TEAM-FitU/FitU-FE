import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

function WaitlistItem({ item, onRemove }) {
    // 속성값들을 배열로 변환 (빈 값 제외)
    const attributeValues = Object.values(item.attributes).filter((value) => value);
    return (
        <div className='relative border border-gray-300 rounded-lg overflow-hidden flex flex-col bg-white w-full h-[180px] shadow-sm'>
            {/* 삭제 버튼 */}
            <button
                type='button'
                onClick={() => onRemove(item.id)}
                className='absolute top-1 right-1 bg-black bg-opacity-70 text-white rounded-full p-0.5 hover:bg-gray-700 focus:outline-none z-10'
                aria-label='목록에서 삭제'
            >
                <XMarkIcon className='w-3.5 h-3.5 cursor-pointer' />
            </button>

            {/* 이미지 영역 (70%) */}
            <div className='w-full h-[70%] overflow-hidden'>
                <img src={item.image} alt='의류 이미지' className='w-full h-full object-cover' />
            </div>

            {/* 구분선 */}
            <div className='w-full h-[1px] bg-gray-200'></div>

            {/* 태그 영역 (30%) */}
            <div className='flex flex-wrap gap-1 p-1.5 justify-center items-center h-[30%] bg-gray-50'>
                {attributeValues.map((value, index) => (
                    <span key={index} className='px-2 py-0.5 bg-black text-white text-[9px] rounded-full whitespace-nowrap'>
                        {value}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default WaitlistItem;
