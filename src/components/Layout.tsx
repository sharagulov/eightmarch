export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full h-dvh bg-zinc-950 overflow-hidden text-white font-sans selection:bg-white/30">
      {children}
    </div>
  );
};
