import React from "react";

const Layout = ({ children, isDarkMode, setIsDarkMode }) => {
  return (
    <div className={`min-h-screen h-screen ${isDarkMode ? 'bg-[#202c36]' : 'bg-[#FAFAFA]'}`}>
      <nav className={`shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06)] ${isDarkMode ? 'bg-[#2b3844]' : 'bg-white'}`}>
        <div className="flex justify-between items-center py-[23.5px] mx-[50px]">
          <h3 className={`font-nunito-sans font-extrabold text-[24px] ${isDarkMode ? 'text-white' : 'text-[#111517]'}`}>
            Where in the world?
          </h3>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex gap-2 items-center font-nunito-sans font-semibold ${isDarkMode ? 'text-white' : 'text-[#111517]'}`}
          >
            {isDarkMode ? (
              <>
                <img
                  src="/images/sun-solid-full.svg"
                  className="w-[15px] h-[13.75px]"
                />
                <p>Light Mode</p>
              </>
            ) : (
              <>
                <img
                  src="/images/moon-solid-full.svg"
                  className="w-[15px] h-[13.75px]"
                />
                <p>Dark Mode</p>
              </>
            )}
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
