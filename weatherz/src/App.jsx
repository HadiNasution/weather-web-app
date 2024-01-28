import MainCard from "./components/cards/MainCard";

export default function App() {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">
            <div className="d-flex align-items-center">
              <img
                className="me-3"
                src="public/assets/berawan.png"
                alt="logo"
                width={40}
                height={40}
              />
              <h4>
                <strong>Weatherz</strong>
              </h4>
            </div>
          </span>
        </div>
      </nav>
      <div className="container text-center pe-5 ps-5">
        <div className="row mt-5">
          <div className="col-md">
            <MainCard />
          </div>
        </div>
      </div>
    </>
  );
}
