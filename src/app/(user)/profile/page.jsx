import Sidebar from "./components/Sidebar";
import ProfileInfo from "./components/ProfileInfo";
import Collections from "./components/Collections";

export default function Profile() {
  return (
    <div className="flex-1">
      <ProfileInfo />
      <Collections />
    </div>
  );
}
