import SkinTonePopover from "./SkinTonePopover";

function ProfileForm({ form, setForm, handleSubmit, isEdit }) {

    const skinToneOption = Object.values({
        WARM: "웜톤",
        COOL: "쿨톤",
        NEUTRAL: "뉴트럴톤",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "0 auto" }}>
            <div className="space-y-5">
                <div className="flex items-center">
                    <label htmlFor="age" className="min-w-[70px] text-sm font-medium text-gray-900">
                        나이 <span className="text-sm font-bold text-[#828282]">*</span>
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
                        className="ml-4 w-15 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 text-right "
                    />
                    <span className="ml-2 text-sm">세</span>
                </div>

                <div className="flex items-center">
                    <label className="min-w-[70px] text-sm font-medium text-gray-900">
                        성별 <span className="text-sm font-bold text-[#828282]">*</span>
                    </label>
                    <div className="ml-4 flex-1 flex gap-8">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="MALE"
                                checked={form.gender === "MALE"}
                                onChange={handleChange}
                                className="w-4 h-4 border-[#828282] accent-black focus:ring-0 focus:outline-none"
                                required
                            />
                            <span className="ml-1 text-sm">남성</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="FEMALE"
                                checked={form.gender === "FEMALE"}
                                onChange={handleChange}
                                className="w-4 h-4 border-[#828282] accent-black focus:ring-0 focus:outline-none"
                            />
                            <span className="ml-1 text-sm">여성</span>
                        </label>
                    </div>
                </div>

                <div className="flex items-center">
                    <label htmlFor="height" className="min-w-[70px] text-sm font-medium text-gray-900">
                        신체 정보 <span className="text-sm font-bold text-[#828282]">*</span>
                    </label>
                    <div className="ml-4 flex-1 flex items-center">
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
                            className="placeholder:text-xs text-right w-15 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                        />
                        <span className="ml-2 text-sm">cm</span>
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
                            className="placeholder:text-xs text-right ml-4 w-17 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 "
                        />
                        <span className="ml-2 text-sm">kg</span>
                    </div>
                </div>


                <div className="flex items-center">
                    <label htmlFor="skinTone" className="min-w-[70px] text-sm font-medium text-gray-900 dark:text-white">
                        피부톤 <span className="text-sm font-bold text-[#828282]">*</span>
                    </label>
                    <div className="ml-4 flex-1 flex items-center">
                        <select
                            id="skinTone"
                            name="skinTone"
                            value={form.skinTone}
                            onChange={handleChange}
                            required
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 w-full max-w-[180px]"
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

            <div className="flex justify-center mt-6">
                <button
                    type="submit"
                    className="w-20 text-white bg-black border border-black font-medium rounded-lg text-sm p-2 mb-5 cursor-pointer"
                >
                    {isEdit ? "완료" : "다음"}
                </button>
            </div>
        </form>
    );
}

export default ProfileForm;