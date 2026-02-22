import { useContext } from "react";
import { CarContext } from "../Context/CarContext";
import { Link } from "react-router-dom";

export const View : React.FunctionComponent = () => {
    const { state, dispatch } = useContext(CarContext);

    return (
        <div className="view-container">
            {/* Header Section */}
            <div className="mb-5">
                <h1 className="display-5 fw-bold text-dark mb-2">
                    <i className="bi bi-car-front text-primary"></i> Car Inventory
                </h1>
                <p className="text-muted fs-6">Manage and view all cars in your inventory</p>
                <hr className="text-primary" style={{ height: '3px', width: '100px' }} />
            </div>

            {/* Stats Cards */}
            <div className="row mb-4">
                <div className="col-md-3 col-sm-6 mb-3">
                    <div className="card stats-card shadow-sm border-0">
                        <div className="card-body text-center">
                            <h5 className="card-title text-muted small mb-2">Total Cars</h5>
                            <h2 className="text-primary fw-bold">{state.cars?.length || 0}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">
                        <i className="bi bi-list-ul"></i> All Cars
                    </h5>
                </div>
                <div className="card-body p-0">
                    {state.cars?.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="fw-bold text-dark">Company</th>
                                        <th className="fw-bold text-dark">Model</th>
                                        <th className="fw-bold text-dark">Manufacture Date</th>
                                        <th className="fw-bold text-dark text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {state.cars.map((car, i) => (
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
                                            <td className="text-center">
                                                <Link to={`/EditCar/${car.Id}`}>
                                                    <button
                                                        onClick={() => dispatch({
                                                            type: "LOOK_CAR",
                                                            payload: car.Id
                                                        })}
                                                        className="btn btn-sm btn-warning me-2"
                                                        title="Edit this car"
                                                    >
                                                        <i className="bi bi-pencil-square"></i> Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this car?')) {
                                                            dispatch({
                                                                type: "REMOVE_CAR",
                                                                payload: car.Id
                                                            });
                                                        }
                                                    }}
                                                    className="btn btn-sm btn-danger"
                                                    title="Delete this car"
                                                >
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-5 text-center">
                            <div className="mb-3">
                                <i className="bi bi-inbox text-muted" style={{ fontSize: '3rem' }}></i>
                            </div>
                            <h5 className="text-muted">No Cars Found</h5>
                            <p className="text-muted mb-3">Your inventory is empty. Start by adding a new car.</p>
                            <Link to="/AddCar" className="btn btn-primary">
                                <i className="bi bi-plus-circle"></i> Add First Car
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            {state.cars?.length > 0 && (
                <div className="row mt-4 g-2">
                    <div className="col-auto">
                        <Link to="/SearchCar" className="btn btn-outline-primary">
                            <i className="bi bi-search"></i> Search Cars
                        </Link>
                    </div>
                    <div className="col-auto">
                        <Link to="/AddCar" className="btn btn-primary">
                            <i className="bi bi-plus-circle"></i> Add New Car
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};