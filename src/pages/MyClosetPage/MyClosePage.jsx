import React, { useState } from "react";
import ClosetFilter from "./ClosetFilter";
import ClosetItemCard from "./ClosetItemCard";
import { PlusIcon } from "@heroicons/react/20/solid";
import EditClothingModal from "./EditClothingModal";

// 임시 더미 데이터
const dummyClosetItems = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    imageUrl: `https://picsum.photos/seed/${i + 100}/200/250`, // 임시 이미지
    tags: i % 2 === 0 ? [`티셔츠`, `기타`, `밝은 계열`] : [`Tag ${i + 1}`, `Tag ${i + 2}`, `Tag ${i + 3}`],
}));

function MyClosetPage() {
    const [closetItems, setClosetItems] = useState(dummyClosetItems);
    const [filters, setFilters] = useState({});

    // 수정 모달 관련 상태
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState(null);

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        // 실제로는 이 필터 값으로 closetItems를 필터링하는 로직 필요
        console.log("Selected Filter:", filterName, value);
    };

    const handleAddItem = () => {
        console.log("옷 추가하기 버튼 클릭됨");
        // 옷 추가 페이지로 이동 예정
    };

    const handleEditItem = (itemId) => {
        const itemToEdit = closetItems.find((item) => item.id === itemId);
        setCurrentEditItem(itemToEdit);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = (editedItem) => {
        // 수정된 아이템으로 상태 업데이트
        setClosetItems((prevItems) => prevItems.map((item) => (item.id === editedItem.id ? editedItem : item)));

        // 실제 API 호출 코드 필요
        // updateItemAPI(editedItem);
        setIsEditModalOpen(false);
        setCurrentEditItem(null);
    };

    const handleDeleteItem = (itemId) => {
        // API 호출 필요, 삭제 성공 알림 고려. 또는 삭제 알림창 후 확인하면 삭제 및 API 호출 후 삭제 성공 알림
        // 아래는 임시
        console.log("삭제할 아이템 ID:", itemId);
        setClosetItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    return (
        <div className='min-h-screen bg-[#F7F7F7] py-6 px-4 sm:px-6 lg:px-8'>
            <main className='max-w-6xl mx-auto flex flex-col'>
                <div className='mb-8 w-full'>
                    <h1 className='text-3xl font-bold text-center text-black mb-6'>나의 옷장</h1>
                    {/* 필터와 옷 추가하기 */}
                    <div className='flex flex-col sm:flex-row justify-between items-center sm:space-x-4'>
                        {/* 필터는 왼쪽에 */}
                        <div className='w-full sm:w-auto mb-4 sm:mb-0'>
                            <ClosetFilter onFilterChange={handleFilterChange} />
                        </div>
                        {/* 옷 추가하기 버튼은 오른쪽에 */}
                        <button
                            onClick={handleAddItem}
                            className='flex items-center bg-black text-white text-xs font-semibold px-3 py-2 rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer'
                        >
                            <PlusIcon className='w-4 h-4 mr-1 fill-white stroke-white' />옷 추가하기
                        </button>
                    </div>
                </div>

                {/* 옷 목록 */}
                {closetItems.length > 0 ? (
                    <div className='bg-white p-4 sm:p-6 shadow-lg rounded-xl w-full'>
                        {/* 카드의 높이를 일정하게 유지하기 위해 grid에 aspect-ratio 또는 고정 높이 설정 가능 */}
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                            {closetItems.map((item) => (
                                // 각 카드가 일정한 높이를 갖도록 aspect-ratio 또는 h-xx 클래스 추가
                                <div key={item.id} className='aspect-[3/4] sm:aspect-[4/5]'>
                                    <ClosetItemCard
                                        imageUrl={item.imageUrl}
                                        tags={item.tags}
                                        onEdit={() => handleEditItem(item.id)}
                                        onDelete={() => handleDeleteItem(item.id)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className='bg-white p-12 text-center text-gray-500 shadow-lg rounded-xl'>
                        <p className='text-gray-500 text-lg mb-2'>옷장이 비어있습니다</p>
                        <p className='text-gray-400 text-sm mb-4'>옷을 추가하여 나만의 옷장을 채워보세요</p>
                    </div>
                )}
            </main>

            {/* 수정 모달  */}
            <EditClothingModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                clothingData={currentEditItem}
                onSave={handleSaveEdit}
            />
        </div>
    );
}

export default MyClosetPage;
