import { SKINTONES } from "../constants/skintones";
import SkinTonePopover from "./SkinTonePopover";

const skinToneOption = [...Object.values(SKINTONES)];

const ProfileForm = ({ form, setForm, handleSubmit, isEdit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-[350px] mx-auto">
            <div className="space-y-5">
                <div className="flex items-center text-[1rem]">
                    <label htmlFor="age" className="w-[100px] min-w-[70px] font-medium">
                        나이 <span className="font-bold text-[#828282]">*</span>
                    </label>
                    <div className="h-[43px] w-[100px] bg-white border border-[#828282] rounded-lg flex items-center px-3">
                        <input
                            type="number"

                            name="age"
                            id="age"
                            value={form.age}
                            onChange={handleChange}
                            min={10}
                            max={100}
                            pattern="[0-9]*"
                            required
                            className="h-[43px] w-[60px] text-[1rem] px-2 border-none focus:ring-0 focus:outline-none bg-transparent text-center  appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                        />
                        <span>세</span>
                    </div>
                </div>

                <div className="flex items-center mt-[2.375rem] text-[1rem]">
                    <label className="w-[100px] min-w-[70px] font-medium">
                        성별 <span className="font-bold text-[#828282]">*</span>
                    </label>
                    <div className="flex-1 flex gap-[50px]">
                        <label className="flex items-center w-[100px]">
                            <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={form.gender === "MALE"}
                                onChange={handleChange}
                                className="w-4 h-[43px] border-[#828282] accent-black focus:ring-0 focus:outline-none"
                                required
                            />
                            <span className="ml-[0.875rem]">남성</span>
                        </label>
                        <label className="flex items-center w-[100px]">
                            <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={form.gender === "FEMALE"}
                                onChange={handleChange}
                                className="w-4 h-[43px] border-[#828282] accent-black focus:ring-0 focus:outline-none"
                            />
                            <span className="ml-[0.875rem]">여성</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center mt-[2.375rem] text-[1rem]">
                    <label htmlFor="height" className="w-[100px] min-w-[70px] font-medium">
                        신체 정보 <span className="font-bold text-[#828282]">*</span>
                    </label>
                    <div className="flex-1 flex items-center gap-[50px]">

                        <div className="h-[43px] w-[100px] bg-white border border-[#828282] rounded-lg flex items-center px-3">
                            <input
                                type="number"
                                name="height"
                                id="height"
                                value={form.height}
                                onChange={handleChange}
                                placeholder="키"
                                min={0}
                                max={250}
                                pattern="[0-9]*"
                                required
                                className="h-[43px] w-[60px] px-2 border-none focus:ring-0 focus:outline-none bg-transparent text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                            />
                            <span>cm</span>
                        </div>

                        <div className="h-[43px] w-[100px] bg-white border border-[#828282] rounded-lg flex items-center px-3">
                            <input
                                type="number"
                                name="weight"
                                id="weight"
                                value={form.weight}
                                onChange={handleChange}
                                placeholder="몸무게"
                                min={3}
                                max={200}
                                pattern="[0-9]*"
                                required
                                className="h-[43px] w-[60px] px-2 border-none focus:ring-0 focus:outline-none bg-transparent text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield]"
                            />
                            <span>kg</span>
                        </div>
                    </div>
                </div>


                <div className="flex items-center mt-[2.375rem] text-[1rem]">
                    <label htmlFor="skinTone" className="w-[100px] min-w-[70px] font-medium">
                        피부톤 <span className="font-bold text-[#828282]">*</span>
                    </label>
                    <div className="flex-1 flex items-center w-[230px]">
                        <select
                            id="skinTone"
                            name="skinTone"
                            value={form.skinTone}
                            onChange={handleChange}
                            required
                            className="w-[250px] bg-white border border-[#828282] h-[43px] rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2"
                        >
                            <option value="">피부톤을 선택해주세요</option>
                            {skinToneOption.map((tone, idx) => (
                                <option key={idx} value={tone}>{tone}</option>
                            ))}
                        </select>
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