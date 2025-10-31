// my-app/src/app/home/components/header.tsx
export default function Header() {
  return (
    <header
      className="fixed top-6 left-1/2 -translate-x-1/2 px-4 bg-transparent"
      style={{
        width: '338px',
        height: '57px',
      }}
    >
      <div className="h-full flex items-center">
        <img
          src="/icon/netflix-logo.svg" // 현재 경로 유지
          alt="Netflix Logo"
          className="h-full w-auto"
        />
      </div>
    </header>
  );
}
