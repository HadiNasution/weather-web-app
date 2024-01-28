import { useState } from "react";
import MainCard from "./components/cards/MainCard";
import DailyCard from "./components/cards/DailyCard";
import Footer from "./components/section/Footer";
import SearchBar from "./components/section/SearchBar";

export default function App() {
  const [city, setCity] = useState(null); // kota tersimpan yang dipilih
  // fungsi akan ditriger oleh SeacrBar
  const handleSaved = (city) => {
    setCity(city); // lalu nilainya akan digunakan oleh MainCard
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
