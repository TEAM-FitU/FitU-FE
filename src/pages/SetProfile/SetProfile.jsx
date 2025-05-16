import React, { useRef, useState, useEffect } from 'react';
import Header from '../../components/Header';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import ProfileForm from './ProfileForm';
import BodyImageUploader from './BodyImageUploader';

function Setprofile() {

  const [uploadedImage, setUploadedImage] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [isAnalysisInProgress, setIsAnalysisInProgress] = useState(false);
  const imageUploaderRef = useRef(null);

  useEffect(() => {
    if (uploadedImage && !isAnalyzed && !isAnalysisInProgress) {
      setIsAnalysisInProgress(true);
      const timer = setTimeout(() => {
        setIsAnalysisInProgress(false);
        setIsAnalyzed(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [uploadedImage, isAnalyzed, isAnalysisInProgress]);

  const handleImageUpload = (file, preview) => {
    setUploadedImage({ file, preview });
    setIsAnalyzed(false);
  };

  const handleImageRemove = () => {
    if (uploadedImage?.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setIsAnalyzed(false);
  };

  // 프로필 폼 상태
  const [form, setForm] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    skinTone: ""
  });

  const [errors, setErrors] = useState({});

  // 프로필 폼 유효성 검사
  const validate = () => {
    const newErrors = {};
    if (
      form.age === "" ||
      isNaN(form.age) ||
      Number(form.age) < 0 ||
      Number(form.age) > 100
    ) {
      newErrors.age = "나이는 0~100 사이로 입력해주세요.";
    }
    if (!form.gender) newErrors.gender = "성별을 선택해주세요.";
    if (
      form.height === "" ||
      isNaN(form.height) ||
      Number(form.height) < 0 ||
      Number(form.height) > 250
    ) {
      newErrors.height = "키는 0~250cm 사이로 입력해주세요.";
    }
    if (
      form.weight === "" ||
      isNaN(form.weight) ||
      Number(form.weight) < 3 ||
      Number(form.weight) > 200
    ) {
      newErrors.weight = "몸무게는 3~200kg 사이로 입력해주세요.";
    }
    if (!form.skinTone) newErrors.skinTone = "피부톤을 선택해주세요.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    alert("폼이 제출되었습니다!");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <p className="text-2xl font-bold mt-10 mb-5 text-center">FitU</p>
      <ProgressBar activeStep={1} />
      <div className="flex flex-col items-center pt-12">
        <BodyImageUploader
          ref={imageUploaderRef}
          uploadedImage={uploadedImage}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
        />
        <p className="text-xs text-gray-400 mt-2 text-center">
          전신 사진을 등록하면<br />추천 코디를 착용한 모습을 볼 수 있어요.
        </p>
        <div className="w-full max-w-xs mt-8">
          <ProfileForm
            form={form}
            setForm={setForm}
            errors={errors}
            setErrors={setErrors}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default Setprofile;