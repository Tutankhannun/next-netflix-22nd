// my-app/src/app/home/page.tsx
import Menu from './components/menu';
import Header from './components/header';

export default function Page() {
  return (
    <>
      {/* 헤더 */}
      <Header />

      {/* 여기에 메인 화면(727px) 안의 실제 콘텐츠 */}
      <div className="w-full h-full flex items-center justify-center">
        홈 콘텐츠
      </div>

      {/* 메뉴: 요구대로 y=740px에 배치되는 절대포지션 컴포넌트 */}
      <Menu />
    </>
  );
}
