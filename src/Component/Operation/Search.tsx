import { useContext } from "react";
import { CarContext } from "../Context/CarContext";
import { Link } from "react-router-dom";

export const SearchCar : React.FunctionComponent = () => {
    const { state, dispatch } = useContext(CarContext);
    
    return (
        <div className="search-container">
            {/* Header Section */}
            <div className="mb-5 text-center">
                <h1 className="display-5 fw-bold text-dark mb-2">
                    <i className="bi bi-search text-primary"></i> Search Cars
                </h1>
                <p className="text-muted">Find cars by company name or model</p>
            </div>

            {/* Search Card */}
            <div className="row">
                <div className="col-lg-6 mx-auto">
                    <div className="card border-0 shadow-lg mb-5">
                        <div className="card-body p-4">
                            <form>
                                <div className="input-group input-group-lg">
                                    <span className="input-group-text bg-primary border-primary">
                                        <i className="bi bi-search text-white"></i>
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg border-primary"
                                        onChange={e => dispatch({
                                            type: "SEARCH_CAR",
                                            payload: e.target.value
                                        })}
                                        placeholder="Type car company or model..." 
                                        autoFocus
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="row">
                <div className="col-lg-10 mx-auto">
                    {/* Results Header */}
                    <div className="mb-4">
                        <h4 className="fw-bold text-dark">
                            <i className="bi bi-list-ul text-primary"></i> Search Results 
                            {state.carResult?.length > 0 && (
                                <span className="badge bg-primary ms-2">{state.carResult.length}</span>
                            )}
                        </h4>
                    </div>

                    {/* Results Table */}
                    <div className="card border-0 shadow-sm">
                        {state.carResult?.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="fw-bold text-dark">Company</th>
                                            <th className="fw-bold text-dark">Model</th>
                                            <th className="fw-bold text-dark">Manufacture Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {state.carResult.map((car, i) => (
                                            <tr key={i} className="align-middle">
                                                <td>
                                                    <strong className="text-dark">{car.Company}</strong>
                                                </td>
                                                <td>{car.Model}</td>
                                                <td>
                                                    <span className="badge bg-info text-dark">
                                                        {car.ManufactureDate}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="card-body text-center py-5">
                                <div className="mb-3">
                                    <i className="bi bi-search text-muted" style={{ fontSize: '3rem' }}></i>
                                </div>
                                <h5 className="text-muted">No Results Found</h5>
                                <p className="text-muted">
                                    Start typing in the search field to find cars by company or model name.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="row mt-5">
                <div className="col-lg-10 mx-auto">
                    <Link to="/" className="btn btn-outline-primary">
                        <i className="bi bi-arrow-left"></i> Back to Inventory
                    </Link>
                </div>
            </div>
        </div>
    );
};