"use client";

import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {
  School,
  GraduationCap,
  Users,
  User,
  Settings
} from "lucide-react"; // Import icons

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        setActiveSection={(section) => {
          const routes = {
            addNews: "/addnews",
            manageNews: "/managenews",
            addNotice: "/addnotice",
            manageNotices: "/managenotices",
            addEvent: "/adddocuments",
            manageEvents: "/managedocuments",
            manageSchoolNews: "/adminschoolnews",
            manageSchoolEvents: "/manageadminevents",
            addGallery: "/addimage",
            addRecentActivity: "/addevents",
            manageRecentActivities: "/manageevents",
            addAchievement: "/addachievements",
            manageAchievements: "/manageachievements",
            addAchievementnews: "/addachievementsnews",
            manageAchievementsnews: "/manageachievementsnews",
            addAlumni: "/addalumni",
            manageAlumni: "/managealumni",
            managefeedbackNews: "/managefeedback",
            addrecruitmentNews: "/addrecruitment",
            managerecruitmentNews: "/managerecruitment",
            addScrollingNews: "/addscrollingnews",
            manageScrollingNews: "/managescrollingnews",
          };
          if (routes[section]) router.push(routes[section]);
        }}
      />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-8">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              icon={<School className="w-6 h-6" />}
              color="bg-sky-500"
              title="Schools"
              value="453"
            />
            <Card
              icon={<GraduationCap className="w-6 h-6" />}
              color="bg-cyan-400"
              title="Senior Colleges"
              value="42"
            />
            <Card
              icon={<User className="w-6 h-6" />}
              color="bg-yellow-400"
              title="Staff"
              value="12,442"
            />
            <Card
              icon={<Users className="w-6 h-6" />}
              color="bg-rose-400"
              title="Students"
              value="434,252"
              bar
            />
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable Card component
function Card({ color, bar = false, title, value, icon }) {
  return (
    <div className={`${color} p-4 rounded-lg shadow-lg text-white relative`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">{value}</div>
          <div className="text-sm">{title}</div>
        </div>
        <div className="text-white/80">{icon}</div>
      </div>

      {/* Mock Chart or Bar */}
      <div className="mt-6 h-16">
        {bar ? (
          <div className="flex items-end gap-1 h-full">
            {[3, 5, 2, 6, 4, 5, 3, 6].map((h, i) => (
              <div
                key={i}
                className="bg-white/40 w-2 rounded"
                style={{ height: `${h * 10}px` }}
              />
            ))}
          </div>
        ) : (
          <svg
            className="w-full h-full"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <polyline
              fill="none"
              stroke="white"
              strokeWidth="2"
              points="0,30 10,20 20,25 30,15 40,18 50,10 60,20 70,22 80,12 90,18 100,15"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
