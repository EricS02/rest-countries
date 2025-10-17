import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import CountryDetail from "./components/CountryDetail.jsx";
import Layout from "./components/Layout.jsx";
import { useState } from "react"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode}/>} />
        <Route path="/country/:countryCode" element={<CountryDetail isDarkMode={isDarkMode}/>} />
      </Routes>
    </Layout>
  );
}

export default App;
