import React from "react";
import { useState } from "react";
import AreaComponent from "./AreaComponent.jsx";
import ApiCall from "./ApiCall.jsx";
import Layout from "./Layout.jsx";

const Home = ({ isDarkMode, setIsDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      {/* Mobile: Stacked layout, Tablet+: Horizontal layout */}
      <div className="mt-[24px] md:mt-[48px] px-[16px] md:px-[41px] lg:px-[80px]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-[40px] md:gap-[8px]">
          {/* Search Input */}
          <div className="relative w-full md:w-[480px]">
            <img
              src="/images/magnifying-glass-solid-full.svg"
              className="absolute left-[32px] top-1/2 -translate-y-1/2 pointer-events-none h-[15.556px] w-[15.556px] md:h-[17.5px] md:w-[17.5px]"
            ></img>
            <input
              onChange={handleSearchChange}
              placeholder="Search for a country..."
              className={`w-full h-[48px] md:h-[56px] rounded-[5px] ${
                isDarkMode
                  ? "bg-[#2b3844] text-white placeholder-white"
                  : "bg-white text-[#c4c4c4] md:text-gray-400"
              } text-[12px] md:text-[14px] font-nunito-sans pl-[73.5px] pr-[32px] font-normal md:font-semibold shadow-[0px_2px_9px_0px_rgba(0,0,0,0.05)]`}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-[200px]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-[200px] h-[48px] md:h-[56px] py-[14px] md:py-[18px] px-[24px] ${
                isDarkMode ? "bg-[#2b3844] text-white" : "bg-white text-[#111517]"
              } shadow-[0px_2px_9px_0px_rgba(0,0,0,0.05)] rounded-[5px]`}
            >
              <div className="flex justify-between items-center">
                <p className="text-[12px] md:text-[14px] font-nunito-sans font-normal md:font-regular">
                  Filter by Region
                </p>
                {isDarkMode ? (
                  <img
                    src="/images/caret-down-solid-full-white.svg"
                    className="w-[20px] h-[20px]"
                  />
                ) : (
                  <img
                    src="/images/caret-down-solid-full.svg"
                    className="w-[20px] h-[20px]"
                  />
                )}
              </div>
            </button>
            <AreaComponent
              isOpen={isOpen}
              setSelectedRegion={setSelectedRegion}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>

      <ApiCall
        search={search}
        region={selectedRegion}
        isDarkMode={isDarkMode}
      />
    </>
  );
};

export default Home;
