import React, { useState } from "react";
import Select from "react-select";
import { CLOTHING_CATEGORIES, CLOTHING_TYPES, PATTERN_TYPES, COLOR_TONES } from "../../constants/clothingAttributes"; // 경로 확인 필요
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// 옵션 배열
const categoryOptions = [...Object.values(CLOTHING_CATEGORIES)];
const typeOptions = [...Object.values(CLOTHING_TYPES)];
const patternOptions = [...Object.values(PATTERN_TYPES)];
const toneOptions = [...Object.values(COLOR_TONES)];

// React-Select 용 옵션 배열 변환 함수
const createSelectOptions = (options) => options.map((option) => ({ value: option, label: option }));

// 각 필터에 사용할 옵션
const categorySelectOptions = createSelectOptions(categoryOptions);
const typeSelectOptions = createSelectOptions(typeOptions);
const patternSelectOptions = createSelectOptions(patternOptions);
const toneSelectOptions = createSelectOptions(toneOptions);

// React-Select 커스텀 스타일
const customStyles = {
    // 드롭다운의 메인 컨테이너(선택 영역) 스타일 설정
    control: (provided, state) => ({
        ...provided,
        width: "auto",
        minWidth: "100px",
        backgroundColor: "white",
        border: state.isFocused ? "1px solid black" : "1px solid #e5e7eb",
        borderRadius: "0.375rem",
        padding: "1px 0",
        boxShadow: "none",
        fontSize: "0.75rem",
        minHeight: "30px",
        cursor: "pointer",
        "&:hover": {
            borderColor: state.isFocused ? "black" : "#d1d5db",
        },
    }),
    valueContainer: (provided) => ({
        // 선택된 값들이 표시되는 컨테이너 스타일
        ...provided,
        padding: "1px 4px",
        display: "flex",
        flexWrap: "wrap",
        gap: "3px",
    }),
    multiValue: (provided) => ({
        // 다중 선택 시 각 선택 항목(태그)의 스타일
        ...provided,
        backgroundColor: "#f3f4f6", // bg-gray-100
        borderRadius: "0.25rem", // rounded-sm
        margin: "1px",
        padding: "0px 3px",
    }),
    multiValueLabel: (provided) => ({
        // 선택된 항목 내부의 텍스트 스타일
        ...provided,
        fontSize: "0.7rem", // 폰트 약간 작게
        color: "#374151", // text-gray-700
        paddingRight: "3px",
    }),
    multiValueRemove: () => ({
        // 태그 제거 (x) 버튼 스타일
        display: "none",
    }),
    indicatorSeparator: () => ({
        // 드롭다운 아이콘과 컨트롤 사이의 구분선 스타일
        display: "none",
    }),
    dropdownIndicator: (provided) => ({
        // 드롭다운 화살표 아이콘 스타일
        ...provided,
        color: "#9ca3af",
        padding: "0 6px",
        "&:hover": { color: "#6b7280" },
    }),
    menu: (provided) => ({
        // 드롭다운 메뉴 컨테이너 스타일
        ...provided,
        borderRadius: "0.375rem",
        width: "100%",
        overflow: "hidden",
        zIndex: 50,
        marginTop: "2px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    }),
    menuList: (provided) => ({
        // 드롭다운 메뉴 내부 리스트 스타일
        ...provided,
        padding: "0.25rem 0",
    }),

    option: (provided, state) => ({
        // 드롭다운 옵션 항목 스타일
        ...provided,
        backgroundColor: "white",
        color: "#374151",
        "&:hover": {
            backgroundColor: "white", // hover 시에도 흰색 배경 유지
            color: "#374151",
        },
    }),

    placeholder: (provided) => ({
        // 플레이스홀더 텍스트 스타일
        ...provided,
        fontSize: "0.75rem",
        color: "#6b7280",
        marginLeft: "2px", // valueContainer 패딩 고려
    }),
};
const OptionWithCheckbox = (props) => {
    const { children, isSelected, isFocused, innerProps, innerRef } = props;

    const handleClick = (event) => {
        if (innerProps && innerProps.onClick) {
            innerProps.onClick(event);
        }
    };

    return (
        <div
            ref={innerRef}
            {...innerProps}
            onClick={handleClick}
            className={`flex items-center justify-between px-3 py-1.5 text-xs cursor-pointer text-gray-700`}
        >
            <span>{children}</span>
            <div
                className={`h-3.5 w-3.5 flex items-center justify-center ml-2 rounded ${
                    isSelected ? "bg-black border-black" : "border border-gray-400"
                }`}
            >
                {isSelected && <CheckIcon className='h-2.5 w-2.5 text-white' />}
            </div>
        </div>
    );
};
function ClosetFilter({ onFilterChange }) {
    // 각 필터의 선택된 값들을 배열로 관리 (isMulti=true)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedPatterns, setSelectedPatterns] = useState([]);
    const [selectedTones, setSelectedTones] = useState([]);

    // 필터 변경 핸들러 (다중 선택 기준)
    const handleMultiFilterChange = (filterName, selectedOptions, setter) => {
        setter(selectedOptions || []); // selectedOptions가 null일 수 있으므로 빈 배열로 처리
        const values = selectedOptions && selectedOptions.length > 0 ? selectedOptions.map((option) => option.value) : []; // 빈 배열은 "전체" 또는 필터링 없음을 의미할 수 있음
        onFilterChange(filterName, values);
    };

    const filtersConfig = [
        { name: "category", label: "전체", options: categorySelectOptions, selectedValue: selectedCategories, setter: setSelectedCategories },
        { name: "type", label: "카테고리", options: typeSelectOptions, selectedValue: selectedTypes, setter: setSelectedTypes },
        { name: "pattern", label: "패턴", options: patternSelectOptions, selectedValue: selectedPatterns, setter: setSelectedPatterns },
        { name: "tone", label: "톤", options: toneSelectOptions, selectedValue: selectedTones, setter: setSelectedTones },
    ];

    return (
        <div className='flex flex-wrap items-center justify-start gap-2'>
            {filtersConfig.map((filter) => (
                <div key={filter.name} className='relative' style={{ minWidth: "120px" }}>
                    <Select
                        value={filter.selectedValue}
                        //아래 options는 React Select 컴포넌트에서 사용자가 선택을 변경할 때 자동으로 전달되는 값.
                        onChange={(options) => handleMultiFilterChange(filter.name, options, filter.setter)}
                        options={filter.options}
                        styles={customStyles}
                        isSearchable={false} // 검색 기능 비활성화
                        placeholder={filter.label} // Placeholder에 필터 이름 표시
                        isMulti={true} // 다중 선택 활성화
                        hideSelectedOptions={false} // 선택된 옵션 숨기지 않음
                        closeMenuOnSelect={false} // 옵션 선택 후 메뉴 닫지 않음
                        isClearable={false} // placeholder(valueContainer)에 x 아이콘 생기는거 비활성화
                        components={{
                            Option: OptionWithCheckbox, // 체크박스를 포함한 커스텀 옵션 컴포넌트
                            DropdownIndicator: () => <ChevronDownIcon className='h-4 w-4 text-gray-500 mr-2' />, //  커스텀 드롭다운 화살표 아이콘
                            MultiValueRemove: () => null, // x 아이콘 완전히 제거
                        }}
                        controlShouldRenderValue={false} // placeholder만 표시
                    />
                </div>
            ))}
        </div>
    );
}

export default ClosetFilter;
