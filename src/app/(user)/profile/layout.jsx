import Sidebar from "./components/Sidebar";

export default function ProfileLayout({ children }) {
  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        <Sidebar />
        {/* <div className="flex-1">
          <ProfileInfo />
          <Collections />
        </div> */}
        {children}
      </div>
    </div>
  );
}
