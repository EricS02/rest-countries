import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CountryDetail = ({ isDarkMode }) => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      const fields =
        "name,capital,population,region,flags,cca3,subregion,currencies,languages,tld,borders";
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${countryCode}?fields=${fields}`
        );
        console.log("URL:", response);
        const data = await response.json();
        setCountry(data);

        if (data.borders && data.borders.length > 0) {
          const borderCodes = data.borders.join(",");
          const borderResponse = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${borderCodes}&fields=name,cca3`
          );

          const borderData = await borderResponse.json();
          setBorderCountries(borderData);
        }
      } catch (error) {
        console.log("error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [countryCode]);

  console.log(country);
  return (
    <div className={`${isDarkMode ? `bg-[#202c36]` : `bg-white`}`}>
      <div className="mx-[81px]">
        <Link to="/" className={`font-nunito-sans font-light text-[16px] ${isDarkMode ? 'text-white bg-[#2b3844]' : 'text-[#111517] bg-white'} mb-4 inline-block shadow px-[32.63px] py-1 mt-[80px]`}>
          ← Back
        </Link>

        {isLoading ? (
          <p className={`${isDarkMode ? 'text-white' : 'text-[#111517]'}`}>Loading...</p>
        ) : country ? (
          <div className="w-full h-screen flex gap-[120px] mt-[80px]">
            <img
              src={country.flags?.svg}
              alt={country.name?.common}
              className="rounded-lg w-[559.71px] h-[418.17px] mb-4"
            />
            <div className="py-[41.5px]">
              <h1 className={`text-4xl font-bold mb-[24px] ${isDarkMode ? 'text-white' : 'text-[#111517]'}`}>
                {country.name?.common}
              </h1>
              {/* Two column layout */}
              <div className="flex gap-[120px] max-w-[598px]">
                {/* Left column */}
                <div className="flex flex-col w-full">
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Native Name:</strong>{" "}
                    {country.name?.official}
                  </p>
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Population:</strong>{" "}
                    {country.population?.toLocaleString()}
                  </p>
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Region:</strong> {country.region ? country.region : "None"}
                  </p>
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Sub Region:</strong> {country.subregion ? country.subregion : "None"}
                  </p>
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Capital:</strong> {country.capital?.[0] ? country.capital?.[0] : "None"}
                  </p>
                </div>

                {/* Right column */}
                <div className="flex flex-col w-full">
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Top Level Domain:</strong> {country.tld}
                  </p>
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Currencies:</strong>{" "}
                    {country.currencies
                      ? Object.values(country.currencies || {})
                          .map((c) => c.name)
                          .filter(Boolean)
                          .join(", ")
                      : "N/A"}
                  </p>
                  <p className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                    <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Languages:</strong>{" "}
                    {Object.values(country.languages || {}).join(", ") ? Object.values(country.languages || {}).join(", ") : "None" }
                  </p>
                </div>
              </div>

              {/* Border Countries */}
              <div className="mt-8">
                <p className={`mb-4 text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>
                  <strong className="text-[16px] font-semibold" style={{ fontFamily: 'Nunito Sans' }}>Border Countries:</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {borderCountries.length > 0 ? (
                    borderCountries.map((border) => (
                      <Link
                        key={border.cca3}
                        to={`/country/${border.cca3}`}
                        className={`px-6 py-2 ${isDarkMode ? 'bg-[#2b3844] text-white hover:bg-[#202c36]' : 'bg-white text-[#111517] hover:bg-gray-100'} shadow rounded text-[16px] font-light`}
                        style={{ fontFamily: 'Nunito Sans' }}
                      >
                        {border.name?.common}
                      </Link>
                    ))
                  ) : (
                    <span className={`text-[16px] font-light ${isDarkMode ? 'text-white' : 'text-[#111517]'}`} style={{ fontFamily: 'Nunito Sans' }}>None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className={`${isDarkMode ? 'text-white' : 'text-[#111517]'}`}>Country not found</p>
        )}
      </div>
    </div>
  );
};

export default CountryDetail;
