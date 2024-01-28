import MainCard from "./components/cards/MainCard";
import WeeklyRow from "./components/cards/WeeklyRow";

export default function App() {
  return (
    <>
      <nav className="navbar bg-body-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <div className="d-flex align-items-center">
              <img
                className="me-2"
                src="public/assets/cerah.png"
                alt="logo"
                width={40}
                height={40}
              />
              <h4 className="text-dark fw-bold mt-2">Weatherz</h4>
            </div>
          </span>
        </div>
      </nav>
      <div className="container text-center pe-5 ps-5">
        <MainCard />
        <WeeklyRow />
      </div>
    </>
  );
}
