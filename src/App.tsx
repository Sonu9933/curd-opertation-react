import { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AddCar } from './Component/Operation/AddCar';
import { View } from './Component/Operation/View';
import { EditCar } from './Component/Operation/EditCars';
import { SearchCar } from './Component/Operation/Search';
import { CarContext } from "./Component/Context/CarContext";
import { FetctMockCars } from "./Component/Mock/FetchMockCars";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles/App.css';

function App() {
  const { dispatch } = useContext(CarContext);

  useEffect(() => {
    dispatch({
      type: "GET_CAR",
      payload: FetctMockCars()
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
          <div className="container-fluid text-white">
            <Link className="navbar-brand fw-bold fs-5" to="/">
              <i className="text-white bi bi-car-front"></i> AutoManager
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    All Cars
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/SearchCar">
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/AddCar">
                    <i className="bi bi-plus-circle"></i> Add Car
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="my-4 container flex-grow-1">
          <Routes>
            <Route path="/" element={<View></View>} />
            <Route path="/AddCar" element={<AddCar></AddCar>} />
            <Route path="/SearchCar" element={<SearchCar></SearchCar>} />
            <Route path="/EditCar/:id" element={<EditCar></EditCar>} />
          </Routes>
        </main>

        <footer className="bg-dark text-white mt-auto py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h6 className="fw-bold mb-3">AutoManager</h6>
                <p className="text-white small">Professional car management system built with React and Bootstrap.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="text-white small">&copy; 2026 AutoManager. All rights reserved.</p>
              </div>
            </div>
            <hr className="bg-secondary" />
            <div className="text-center">
              <p className="text-white small mb-0">Designed for efficient car inventory management.</p>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
