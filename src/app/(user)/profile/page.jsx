import Sidebar from './components/Sidebar'
import ProfileInfo from './components/ProfileInfo'
import Collections from './components/Collections'

export default function Profile() {
  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        <Sidebar />
        <div className="flex-1">
          <ProfileInfo />
          <Collections />
        </div>
      </div>
    </div>
  )
}