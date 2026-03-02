export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-zinc-950 overflow-hidden text-white font-sans selection:bg-white/30">
      {children}
    </div>
  );
};
