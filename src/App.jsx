import { lazy, Suspense } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Home as HomeIcon, Activity, DoorOpen, User, Mic } from "lucide-react";
import "./App.css";

// Lazy Imports
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/Home"));

function App() {
  return (
    <>
      {/* Top navigation */}
      <div className="fixed top-0 w-full bg-white text-gray-900 rounded-t-2xl flex justify-around p-4 shadow-lg">
        IOT Systems Labs &copy; by nakprc.com
      </div>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 w-full bg-white text-gray-900 rounded-t-2xl flex justify-around p-4 shadow-lg">
        <NavButton to="/" icon={<HomeIcon size={20} />} label="Home" />
        <NavButton to="/rooms" icon={<DoorOpen size={20} />} label="Rooms" />
        <NavButton to="/voice" icon={<Mic size={20} />} label="Voice" />
        <NavButton to="/usage" icon={<Activity size={20} />} label="Usage" />
        <NavButton to="/profile" icon={<User size={20} />} label="Profile" />
      </div>
    </>
  );
}

export default App;

// NavButton Component
function NavButton({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center ${
          isActive ? "text-indigo-600" : "text-gray-400"
        }`
      }
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
}
