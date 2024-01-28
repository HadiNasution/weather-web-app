import { useState } from "react";
import MainCard from "./components/cards/MainCard";
import WeeklyRow from "./components/cards/WeeklyRow";
import Footer from "./components/section/Footer";
import SearchBar from "./components/section/SearchBar";

export default function App() {
  const [city, setCity] = useState(null);
  const handleSearch = (city) => {
    setCity(city);
  };
  return (
    <div className="container text-center pe-5 ps-5">
      <SearchBar searched={handleSearch} />
      <MainCard citySearched={city} />
      <WeeklyRow />
      <Footer />
    </div>
  );
}
