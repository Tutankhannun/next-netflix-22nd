export default function SplashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh w-full bg-black flex items-start justify-center">
      <div className="relative w-[375px] h-[812px] text-white bg-black">
        <section className="absolute inset-0 grid place-items-center">
          {children}
        </section>
      </div>
    </div>
  );
}
