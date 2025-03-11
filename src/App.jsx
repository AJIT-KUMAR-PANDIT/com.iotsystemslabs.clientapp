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
    <div className="h-screen flex flex-col">
      {/* Top navigation */}
      <div className="bg-white text-gray-900 rounded-t-2xl flex justify-around p-4 shadow-lg">
        IOT Systems Labs &copy; by nakprc.com
      </div>

      {/* Main Content Area (Scrollable) */}
      <Main>
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center">
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
      </Main>

      {/* Bottom navigation */}
      <div className="bg-white text-gray-900 rounded-t-2xl flex justify-around p-4 shadow-lg">
        <NavButton to="/" icon={<HomeIcon size={20} />} label="Home" />
        <NavButton to="/rooms" icon={<DoorOpen size={20} />} label="Rooms" />
        <NavButton to="/voice" icon={<Mic size={20} />} label="Voice" />
        <NavButton to="/usage" icon={<Activity size={20} />} label="Usage" />
        <NavButton to="/profile" icon={<User size={20} />} label="Profile" />
      </div>
    </div>
  );
}

export default App;

// Main Component for Scrollable Content
function Main({ children }) {
  return (
    <div className="flex-grow overflow-y-auto p-4">
      {children}
    </div>
  );
}

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
