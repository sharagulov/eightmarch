export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-zinc-950 text-white font-sans selection:bg-white/30 [padding-bottom:env(safe-area-inset-bottom)]">
      {children}
    </div>
  );
};
