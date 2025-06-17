interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <div className="h-screen w-screen bg-slate-800">{children}</div>;
};
export default Layout;
