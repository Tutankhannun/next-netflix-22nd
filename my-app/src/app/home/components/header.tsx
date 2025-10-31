// my-app/src/app/home/components/header.tsx
export default function Header() {
  return (
    <header className="mx-auto" style={{ width: '338px', height: '57px' }}>
      <div className="h-full flex items-center">
        <img
          src="/icon/netflix-logo.svg"
          alt="Netflix Logo"
          className="h-full w-auto"
        />
      </div>
    </header>
  );
}
