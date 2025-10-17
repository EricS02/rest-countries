import React, { useEffect, useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router-dom";

const ApiCall = ({ search, region, isDarkMode }) => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fields = "name,capital,population,region,flags,cca3";
        let url = `https://restcountries.com/v3.1/all?fields=${fields}`;

        if (search) {
          url = `https://restcountries.com/v3.1/name/${search}?fields=${fields}`;
        } else if (region) {
          url = `https://restcountries.com/v3.1/region/${region}?fields=${fields}`;
        }
        console.log("fetching URL:", url);
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status === 404) {
            setError("No country found with that name");
            setCountries([]);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Api response: ", response.status);
        setCountries(data);
      } catch (error) {
        console.log("Error: ", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    const delaySearch = setTimeout(() => {
      fetchCountries();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search, region]);

  console.log("First country: ", countries[0]);
  return (
    <div className={`${isDarkMode ? `bg-[#202c36]` : `bg-white`} `}>
      {isLoading ? (
        <LoaderIcon
          className="size-10 animate-spin justify-center items-center mt-[100px] ml-[100px]"
          role="status"
          aria-label="Loading"
        />
      ) : (
        <div className="mt-[32px] md:mt-[48px] px-[16px] md:px-[41px] lg:px-[80px]">
          {/* Responsive Grid: 1 col mobile, 2 cols tablet, 4 cols desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] md:gap-[72px] justify-items-center md:justify-items-start">
            {countries.map((country) => (
              <Link to={`/country/${country.cca3}`} key={country.cca3}>
                <div className={`${isDarkMode ? 'bg-[#2b3844]' : 'bg-white'} rounded-[5px] w-[264px] h-[336px] shadow-[0px_0px_7px_2px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_15px_4px_rgba(0,0,0,0.15)] cursor-pointer`}>
                  <img
                    className="w-full h-[160px] object-cover transition-transform duration-300 hover:scale-110"
                    src={country.flags?.svg || null}
                    alt={`${country.name.common} flag`}
                  />
                  <div className="px-[24px] pt-[24px] pb-[48px]">
                    <h3 className={`font-extrabold text-[18px] ${isDarkMode ? 'text-white' : 'text-[#111517]'} font-nunito-sans mb-[16px] leading-[26px]`}>
                      {country.name.common}
                    </h3>
                    <div className="flex flex-col text-[14px] leading-[16px]">
                      <p className={`font-nunito-sans ${isDarkMode ? 'text-white' : 'text-[#111517]'} mb-[8px]`}>
                        <span className="font-semibold">Population:</span>{" "}
                        <span className="font-light">{country.population?.toLocaleString() || "N/A"}</span>
                      </p>
                      <p className={`font-nunito-sans ${isDarkMode ? 'text-white' : 'text-[#111517]'} mb-[8px]`}>
                        <span className="font-semibold">Region:</span>{" "}
                        <span className="font-light">{country.region || "N/A"}</span>
                      </p>
                      <p className={`font-nunito-sans ${isDarkMode ? 'text-white' : 'text-[#111517]'}`}>
                        <span className="font-semibold">Capital:</span>{" "}
                        <span className="font-light">{country.capital?.[0] || "N/A"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiCall;
