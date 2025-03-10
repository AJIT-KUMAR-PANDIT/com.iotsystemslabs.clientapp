"use client"

import { useState, useEffect } from "react"
import { 
  Monitor, Lightbulb, Wind, Sun, Moon, 
  AirVent, Grid, DoorOpen, User, Plus,
  Thermometer, Settings, Home, Activity
} from "lucide-react"

export default function SmartHomeDashboard() {
  // State for toggle switches
  const [toggles, setToggles] = useState({
    smartTV: true,
    lights: true,
    airPurifier: true,
    morningScene: true,
    nightScene: true,
    frequentSmartTV: true,
    frequentAirConditioner: true,
    frequentAirPurifier: false,
    frequentSmartLight: true,
    frequentFan: false,
  })

  // State for device type detection
  const [deviceType, setDeviceType] = useState("desktop")

  // Detect device type based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 280) {
        setDeviceType("smartwatch")
      } else if (width < 768) {
        setDeviceType("mobile")
      } else {
        setDeviceType("desktop")
      }
    }

    // Initial detection
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Toggle handler
  const handleToggle = (key) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  // Render different layouts based on device type
  const renderContent = () => {
    // Smartwatch Layout
    if (deviceType === "smartwatch") {
      return (
        <div className="flex flex-col h-screen bg-gray-900 text-white overflow-auto">
          {/* Minimal header */}
          <div className="p-2 text-center">
            <h1 className="text-lg font-bold">Home</h1>
          </div>
          
          {/* Main controls - just scenes */}
          <div className="px-2 py-1">
            <div className="bg-gray-800 rounded-lg p-2 mb-2">
              <div className="flex justify-between items-center">
                <Sun size={16} />
                <div
                  className={`w-8 h-4 rounded-full p-1 transition-colors duration-300 ${toggles.morningScene ? "bg-emerald-400" : "bg-gray-600"}`}
                  onClick={() => handleToggle("morningScene")}
                >
                  <div
                    className={`bg-white w-2 h-2 rounded-full transform transition-transform duration-300 ${toggles.morningScene ? "translate-x-4" : ""}`}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 mb-2">
              <div className="flex justify-between items-center">
                <Moon size={16} />
                <div
                  className={`w-8 h-4 rounded-full p-1 transition-colors duration-300 ${toggles.nightScene ? "bg-emerald-400" : "bg-gray-600"}`}
                  onClick={() => handleToggle("nightScene")}
                >
                  <div
                    className={`bg-white w-2 h-2 rounded-full transform transition-transform duration-300 ${toggles.nightScene ? "translate-x-4" : ""}`}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-2 mb-2">
              <div className="flex justify-between items-center">
                <Lightbulb size={16} />
                <div
                  className={`w-8 h-4 rounded-full p-1 transition-colors duration-300 ${toggles.lights ? "bg-emerald-400" : "bg-gray-600"}`}
                  onClick={() => handleToggle("lights")}
                >
                  <div
                    className={`bg-white w-2 h-2 rounded-full transform transition-transform duration-300 ${toggles.lights ? "translate-x-4" : ""}`}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-2">
              <div className="flex justify-between items-center">
                <Monitor size={16} />
                <div
                  className={`w-8 h-4 rounded-full p-1 transition-colors duration-300 ${toggles.smartTV ? "bg-emerald-400" : "bg-gray-600"}`}
                  onClick={() => handleToggle("smartTV")}
                >
                  <div
                    className={`bg-white w-2 h-2 rounded-full transform transition-transform duration-300 ${toggles.smartTV ? "translate-x-4" : ""}`}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Simple navigation */}
          <div className="mt-auto bg-gray-800 flex justify-around p-1">
            <button className="flex flex-col items-center p-1">
              <Home size={16} />
            </button>
            <button className="flex flex-col items-center p-1">
              <Settings size={16} />
            </button>
          </div>
        </div>
      )
    }
    
    // Mobile Layout
    if (deviceType === "mobile") {
      return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-50 to-blue-50 text-gray-900">
          {/* Status bar */}
          <div className="flex justify-between items-center p-2 text-xs bg-white bg-opacity-80 backdrop-blur-sm">
            <div>9:41</div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3">
                <svg viewBox="0 0 24 24" className="fill-current">
                  <path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z" />
                </svg>
              </div>
              <div className="h-3 w-3">
                <svg viewBox="0 0 24 24" className="fill-current">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                </svg>
              </div>
              <div className="h-3 w-4">
                <svg viewBox="0 0 24 24" className="fill-current">
                  <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex justify-between items-center px-4 pt-4 pb-2">
            <h1 className="text-2xl font-bold">My Home</h1>
            <button className="bg-indigo-600 text-white rounded-full p-2 shadow-md">
              <Plus size={18} />
            </button>
          </div>

          {/* Summary card */}
          <div className="mx-4 mb-4 bg-white rounded-2xl p-4 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Welcome Home</h3>
                <p className="text-sm text-gray-500">4 devices active</p>
              </div>
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                <Thermometer size={20} />
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="text-2xl font-bold">72°F</div>
              <div className="text-sm text-gray-500">36% humidity</div>
            </div>
          </div>

          {/* Quick access devices */}
          <div className="flex gap-2 px-4 py-2 overflow-x-auto">
            <div
              className={`flex items-center gap-2 rounded-full py-2 px-4 ${
                toggles.smartTV 
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md" 
                  : "bg-white"
              }`}
              onClick={() => handleToggle("smartTV")}
            >
              <Monitor size={18} />
              <div>
                <div className="text-sm font-medium">TV</div>
                <div className="text-xs">{toggles.smartTV ? "On" : "Off"}</div>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 rounded-full py-2 px-4 ${
                toggles.lights 
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md" 
                  : "bg-white"
              }`}
              onClick={() => handleToggle("lights")}
            >
              <Lightbulb size={18} />
              <div>
                <div className="text-sm font-medium">Lights</div>
                <div className="text-xs">{toggles.lights ? "On" : "Off"}</div>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 rounded-full py-2 px-4 ${
                toggles.airPurifier 
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md" 
                  : "bg-white"
              }`}
              onClick={() => handleToggle("airPurifier")}
            >
              <Wind size={18} />
              <div>
                <div className="text-sm font-medium">Purifier</div>
                <div className="text-xs">{toggles.airPurifier ? "On" : "Off"}</div>
              </div>
            </div>
          </div>

          {/* Scenes */}
          <div className="px-4 py-2">
            <h2 className="text-xl font-bold mb-2">Scenes</h2>
            <div className="bg-white rounded-xl p-4 mb-2 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Sun size={20} className="text-amber-500" />
                  </div>
                  <span>Morning scene</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                    toggles.morningScene ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                  onClick={() => handleToggle("morningScene")}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                      toggles.morningScene ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Moon size={20} className="text-indigo-500" />
                  </div>
                  <span>Night scene</span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                    toggles.nightScene ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                  onClick={() => handleToggle("nightScene")}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                      toggles.nightScene ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Used */}
          <div className="px-4 py-2 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Frequently Used</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Monitor size={20} />, name: "Smart TV", devices: 1, stateKey: "frequentSmartTV" },
                { icon: <AirVent size={20} />, name: "Air Conditioner", devices: 1, stateKey: "frequentAirConditioner" },
                { icon: <Wind size={20} />, name: "Air Purifier", devices: 4, stateKey: "frequentAirPurifier" },
                { icon: <Lightbulb size={20} />, name: "Smart Light", devices: 4, stateKey: "frequentSmartLight" }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-indigo-50 p-2 rounded-full">
                      {item.icon}
                    </div>
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                        toggles[item.stateKey] ? "bg-indigo-500" : "bg-gray-300"
                      }`}
                      onClick={() => handleToggle(item.stateKey)}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                          toggles[item.stateKey] ? "translate-x-6" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-500">{item.devices} Device{item.devices > 1 ? 's' : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom navigation */}
          <div className="mt-auto bg-white text-gray-900 rounded-t-2xl flex justify-around p-4 shadow-lg">
            <button className="flex flex-col items-center text-indigo-600">
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
              <DoorOpen size={20} />
              <span className="text-xs mt-1">Rooms</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
              <Activity size={20} />
              <span className="text-xs mt-1">Usage</span>
            </button>
            <button className="flex flex-col items-center text-gray-400">
              <User size={20} />
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      )
    }
    
    // Desktop Layout (default)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center gap-2 border-b pb-4 mb-6">
              <div className="bg-indigo-600 text-white rounded-full p-2">
                <Home size={20} />
              </div>
              <h1 className="text-xl font-bold">SmartHome</h1>
            </div>
            
            <nav className="space-y-2">
              <div className="flex items-center gap-3 bg-indigo-50 text-indigo-600 rounded-lg p-3">
                <Grid size={20} />
                <span>Dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 rounded-lg p-3 hover:bg-gray-50">
                <DoorOpen size={20} />
                <span>Rooms</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 rounded-lg p-3 hover:bg-gray-50">
                <Activity size={20} />
                <span>Statistics</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 rounded-lg p-3 hover:bg-gray-50">
                <Settings size={20} />
                <span>Settings</span>
              </div>
            </nav>
            
            <div className="mt-8">
              <h3 className="text-sm text-gray-500 mb-2">SCENES</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-white border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Sun size={18} className="text-amber-500" />
                    <span>Morning</span>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${toggles.morningScene ? "bg-indigo-500" : "bg-gray-300"}`}
                    onClick={() => handleToggle("morningScene")}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${toggles.morningScene ? "translate-x-5" : ""}`}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white border rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <Moon size={18} className="text-indigo-500" />
                    <span>Night</span>
                  </div>
                  <div
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-300 ${toggles.nightScene ? "bg-indigo-500" : "bg-gray-300"}`}
                    onClick={() => handleToggle("nightScene")}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${toggles.nightScene ? "translate-x-5" : ""}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-8 border-t">
              <div className="flex items-center gap-3 p-2">
                <div className="bg-indigo-100 text-indigo-600 rounded-full h-10 w-10 flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-xs text-gray-500">Admin</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Welcome Home</h1>
                <p className="text-gray-600">4 devices active · March 10, 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <Settings size={20} />
                </div>
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <User size={20} />
                </div>
                <button className="bg-indigo-600 text-white rounded-lg p-2 shadow-md">
                  <Plus size={20} />
                </button>
              </div>
            </div>
            
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Thermometer size={20} className="text-amber-500" />
                  </div>
                  <div className="text-sm text-gray-500">Temperature</div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold">72°F</div>
                  <div className="text-sm text-gray-500">Normal</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Wind size={20} className="text-blue-500" />
                  </div>
                  <div className="text-sm text-gray-500">Humidity</div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold">36%</div>
                  <div className="text-sm text-gray-500">Normal</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <Activity size={20} className="text-indigo-500" />
                  </div>
                  <div className="text-sm text-gray-500">Energy</div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold">42kW</div>
                  <div className="text-sm text-gray-500">Daily usage</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex justify-between">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Lightbulb size={20} className="text-green-500" />
                  </div>
                  <div className="text-sm text-gray-500">Devices</div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold">4/12</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>
            </div>
            
            {/* Quick access devices */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Monitor size={24} />, name: "Smart TV", stateKey: "smartTV", bgActive: "bg-indigo-600", bgInactive: "bg-white" },
                  { icon: <Lightbulb size={24} />, name: "Lights", stateKey: "lights", bgActive: "bg-amber-500", bgInactive: "bg-white" },
                  { icon: <Wind size={24} />, name: "Air Purifier", stateKey: "airPurifier", bgActive: "bg-blue-500", bgInactive: "bg-white" },
                  { icon: <AirVent size={24} />, name: "Air Conditioner", stateKey: "frequentAirConditioner", bgActive: "bg-green-500", bgInactive: "bg-white" }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className={`${
                      toggles[item.stateKey] 
                        ? `${item.bgActive} text-white` 
                        : `${item.bgInactive} text-gray-900 border`
                    } rounded-xl p-4 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md`}
                    onClick={() => handleToggle(item.stateKey)}
                  >
                    <div className="flex justify-between items-center">
                      <div className={`${toggles[item.stateKey] ? "bg-white bg-opacity-20" : "bg-gray-100"} p-2 rounded-full`}>
                        {item.icon}
                      </div>
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                          toggles[item.stateKey] 
                            ? "bg-white bg-opacity-50" 
                            : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`${
                            toggles[item.stateKey] ? "bg-white" : "bg-gray-400"
                          } w-4 h-4 rounded-full transform transition-transform duration-300 ${
                            toggles[item.stateKey] ? "translate-x-6" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="font-medium">{item.name}</div>
                      <div className={`text-sm ${toggles[item.stateKey] ? "text-white text-opacity-80" : "text-gray-500"}`}>
                        {toggles[item.stateKey] ? "Active" : "Inactive"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Frequently Used */}
            <div>
              <h2 className="text-xl font-bold mb-4">Frequently Used</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { icon: <Monitor size={20} />, name: "Smart TV", devices: 1, stateKey: "frequentSmartTV" },
                  { icon: <AirVent size={20} />, name: "Air Conditioner", devices: 1, stateKey: "frequentAirConditioner" },
                  { icon: <Wind size={20} />, name: "Air Purifier", devices: 4, stateKey: "frequentAirPurifier" },
                  { icon: <Lightbulb size={20} />, name: "Smart Light", devices: 4, stateKey: "frequentSmartLight" },
                  { icon: <Wind size={20} />, name: "Fan", devices: 2, stateKey: "frequentFan" }
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div className="bg-indigo-50 p-2 rounded-full">
                        {item.icon}
                      </div>
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
                          toggles[item.stateKey] ? "bg-indigo-500" : "bg-gray-300"
                        }`}
                        onClick={() => handleToggle(item.stateKey)}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${
                            toggles[item.stateKey] ? "translate-x-6" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.devices} Device{item.devices > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return renderContent()
}