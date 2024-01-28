import { useState } from "react";
import MainCard from "./components/cards/MainCard";
import DailyCard from "./components/cards/DailyCard";
import Footer from "./components/section/Footer";
import SearchBar from "./components/section/SearchBar";

export default function App() {
  const [city, setCity] = useState(null);
  const handleSaved = (city) => {
    setCity(city);
  };
  return (
    <div className="container text-center">
      <SearchBar saved={handleSaved} />
      <MainCard citySaved={city} />
      <DailyCard />
      <Footer />
    </div>
  );
}
