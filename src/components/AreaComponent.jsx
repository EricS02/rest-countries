import React from "react";

const AreaComponent = ({ isOpen, setSelectedRegion, isDarkMode }) => {
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  if (!isOpen) return null;

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };
  return (
    <div className={`absolute top-full mt-[4px] md:mt-[8px] w-[200px] ${isDarkMode ? 'bg-[#2b3844] text-white' : 'bg-white text-[#111517]'} px-[24px] py-[16px] rounded-[5px] shadow-[0px_2px_9px_0px_rgba(0,0,0,0.05)] z-10`}>
      <div className="flex flex-col gap-[8px]">
        {regions.map((region) => (
          <p
            onClick={() => handleRegionClick(region)}
            key={region}
            className={`text-[12px] md:text-[14px] font-nunito-sans font-normal leading-[16px] ${isDarkMode ? 'hover:bg-[#202c36]' : 'hover:bg-gray-100'} cursor-pointer rounded-sm transition-colors`}
          >
            {region}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AreaComponent;
