import AdminSidebar from "./component/AdminSidebar";

export default async function Layout(props) {
  const { children } = props;

  return (
    <div className="h-screen">
      <AdminSidebar />
      {children}
    </div>
  );
}
