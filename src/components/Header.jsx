import logo from '/logo.png';

function Header() {
    return (
        <header className="h-12 shadow flex items-center justify-between px-6">
            <img src={logo} alt="FitU 로고" className="h-12"/>

            <div className="font-semibold text-sm">
                마이페이지
            </div>
        </header>

    );
}

export default Header;