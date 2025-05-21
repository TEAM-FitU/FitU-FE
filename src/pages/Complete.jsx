import Header from '../components/Header';
import LOGO from '../../public/logo.png';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { Link } from 'react-router-dom';

function Complete() {
    return (
        <>
            <Header />
            <p className="text-2xl font-bold mt-10 mb-5 text-center">FitU</p>
            <ProgressBar activeStep={3} />
            <div className="flex flex-col items-center">
                <img
                    src={LOGO}
                    alt="logo"
                    className="w-[100px] h-[100px] mt-20"
                />
                <p className="text-center mb-10">
                    <span className="font-semibold">FitU</span>에 오신 것을 환영합니다! <br />
                    당신만을 위한 스타일, <span className="font-semibold">FitU</span>에서 시작하세요.
                </p>
                {/* TODO 상황 입력 페이지로 이동 */}
                <Link
                    to="/"
                    className="shadow cursor-pointer px-10 py-2 bg-black text-base text-white font-bold rounded border-2 border-black mt-2 text-center"
                >
                    상황 입력하고 코디 추천 받기
                </Link>
            </div>
        </>
    );
}

export default Complete;