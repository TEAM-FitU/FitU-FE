import { SKINTONES } from "../constants/skintones";
import SkinTonePopover from "./SkinTonePopover";

const skinToneOption = [...Object.values(SKINTONES)];

const ProfileForm = ({ form, setForm, handleSubmit, isEdit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-[360px] mx-auto">
            <div className="space-y-5">
                <div className="flex items-center">
                    <label htmlFor="age" className="min-w-[70px] text-[1rem] font-medium text-gray-900">
                        나이 <span className="text-[1rem] font-bold text-[#828282]">*</span>
                    </label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={form.age}
                        onChange={handleChange}
                        min={10}
                        max={100}
                        required
                        className="ml-[3.5rem] h-[43px] w-[70px] bg-white border border-[#828282] text-[1rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2 text-right"
                    />
                    <span className="ml-2 text-[1rem]">세</span>
                </div>

                <div className="flex items-center mt-[2.375rem]">
                    <label className="min-w-[70px] text-[1rem] font-medium text-gray-900">
                        성별 <span className="text-[1rem] font-bold text-[#828282]">*</span>
                    </label>
                    <div className="ml-[3.5rem] flex-1 flex gap-8">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={form.gender === "MALE"}
                                onChange={handleChange}
                                className="w-4 h-[43px] border-[#828282] accent-black focus:ring-0 focus:outline-none"
                                required
                            />
                            <span className="ml-[0.875rem] text-[1rem]">남성</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={form.gender === "FEMALE"}
                                onChange={handleChange}
                                className="ml-[3rem] w-4 h-[43px] border-[#828282] accent-black focus:ring-0 focus:outline-none"
                            />
                            <span className="ml-[0.875rem] text-[1rem]">여성</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center mt-[2.375rem]">
                    <label htmlFor="height" className="min-w-[70px] text-[1rem] font-medium">
                        신체 정보 <span className="text-[1rem] font-bold text-[#828282]">*</span>
                    </label>
                    <div className="ml-[3.5rem] flex-1 flex items-center">
                        <input
                            type="number"
                            name="height"
                            id="height"
                            value={form.height}
                            onChange={handleChange}
                            placeholder="키"
                            min={0}
                            max={250}
                            required
                            className="placeholder:text-[#828282] text-[1rem] text-right w-[4.25rem] h-[43px] bg-white border border-[#828282] rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2"
                        />
                        <span className="ml-2 text-[1rem]">cm</span>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={form.weight}
                            onChange={handleChange}
                            placeholder="몸무게"
                            min={3}
                            max={200}
                            required
                            className="placeholder:text-[#828282] text-[1rem] text-right ml-[1.9rem] w-[4.5rem] h-[43px] bg-white border border-[#828282] rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2 "
                        />
                        <span className="ml-2 text-[1rem]">kg</span>
                    </div>
                </div>


                <div className="flex items-center mt-[2.375rem]">
                    <label htmlFor="skinTone" className="min-w-[70px] text-[1rem] font-medium">
                        피부톤 <span className="text-[1rem] font-bold text-[#828282]">*</span>
                    </label>
                    <div className="ml-[3.5rem] flex-1 flex items-center">
                        <select
                            id="skinTone"
                            name="skinTone"
                            value={form.skinTone}
                            onChange={handleChange}
                            required
                            className="bg-white border border-[#828282] w-[13rem] h-[43px] text-[1rem] rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2"
                        >
                            <option value="">피부톤을 선택해주세요</option>
                            {skinToneOption.map((tone, idx) => (
                                <option key={idx} value={tone}>{tone}</option>
                            ))}
                        </select>
                        {/* TODO 피부톤 설명 추가 */}
                        <SkinTonePopover />
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-[3.75rem] mb-4">
                <button
                    type="submit"
                    className="h-[43px] px-[1.375rem] py-[11px] text-[1rem] text-white bg-black rounded-lg flex items-center justify-center cursor-pointer"
                >
                    {isEdit ? "완료" : "다음"}
                </button>
            </div>
        </form>
    );
}

export default ProfileForm;