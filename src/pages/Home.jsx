import { Link } from 'react-router-dom';
import Header from '../components/Header';
import background from '../assets/main-bg.jpg';

function Home() {
  return (
    <div>
      <Header fixed />
      <section className="relative w-full h-screen">
        <img
          src={background}
          alt="home"
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center leading-tight mb-5">
            고민할 필요 없이<br />
            FitU로 간편하게
          </h1>
          <p className="text-white text-base md:text-xl mb-10 text-center">
            어디에서든 완벽한 순간을 찾다.
          </p>

          {/* TODO 등록한 회원인 경우 바로 상황 입력 페이지로 이동 */}
          <Link
            to="/set-profile"
            className="cursor-pointer shadow px-10 py-2 bg-white text-black text-base font-bold rounded mt-2 text-center"
          >
            시작하기
          </Link>
        </div>
      </section>

      <section className="bg-white w-full h-screen py-16 flex flex-col items-center ">
        <img src="/logo.png" alt="FitU Logo" className="w-32 mb-8" />
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg mb-2">TIME</h2>
            <p className="text-center text-sm">언제 입을 코디를<br />찾고 계신가요?</p>
          </div>
          <div className="flex flex-col items-center border-l border-r border-gray-300">
            <h2 className="font-bold text-lg mb-2">PLACE</h2>
            <p className="text-center text-sm">어디에서 입을 코디를<br />원하시나요?</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg mb-2">OCCATION</h2>
            <p className="text-center text-sm">어떤 상황의 코디를<br />원하시나요?</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;