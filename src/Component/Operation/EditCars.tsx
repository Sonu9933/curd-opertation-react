import { useState, useContext, useEffect } from "react";
import { CarContext } from "../Context/CarContext";
import { useNavigate, Link, useParams} from "react-router-dom";

export const EditCar: React.FunctionComponent = () => {

  let navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const { state, dispatch } = useContext(CarContext);

  const [selectedCar, setSeletedCar] = useState({
    Id: null,
    Company: "",
    Model: "",
    ManufactureDate: ""
  });

  const [touched, setTouched] = useState({
    Company: false,
    Model: false,
    ManufactureDate: false
  });

  const Id = params.id;;

  useEffect(() => {
    const carId = Id;
    const selectedCar = state.cars.find(car => car.Id === parseInt(carId));
    setSeletedCar(selectedCar);
  }, [Id, state.cars]);

  const onSubmit = () => {
    dispatch({
      type: "UPDATE_CAR",
      payload: selectedCar
    });

    navigate("/");
  };

  const handleOnChange = (userKey: any, value: any) => {
    setSeletedCar({ ...selectedCar, [userKey]: value });
  }

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
  }

  const isFormValid = selectedCar?.Company && selectedCar?.Model && selectedCar?.ManufactureDate;

  return (
    <div className="edit-car-container">
      <div className="row">
        <div className="col-lg-6 col-md-8 mx-auto">
          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="display-5 fw-bold text-dark mb-2">
              <i className="bi bi-pencil-square text-primary"></i> Edit Car Details
            </h1>
            <p className="text-muted">Update the car information below</p>
          </div>

          {/* Form Card */}
          {selectedCar && (
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <form>
                  {/* Company Field */}
                  <div className="mb-3">
                    <label htmlFor="company" className="form-label fw-bold text-dark">
                      <i className="bi bi-building text-primary"></i> Company Name
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="form-control form-control-lg"
                      value={selectedCar?.Company || ""}
                      onChange={e => handleOnChange("Company", e.target.value)}
                      onBlur={() => handleBlur("Company")}
                      placeholder="e.g., Toyota, Honda, BMW"
                      required
                    />
                    {touched.Company && !selectedCar?.Company && (
                      <div className="invalid-feedback d-block">Company name is required</div>
                    )}
                  </div>

                  {/* Model Field */}
                  <div className="mb-3">
                    <label htmlFor="model" className="form-label fw-bold text-dark">
                      <i className="bi bi-car-front text-primary"></i> Model Name
                    </label>
                    <input
                      id="model"
                      type="text"
                      className="form-control form-control-lg"
                      value={selectedCar?.Model || ""}
                      onChange={e => handleOnChange("Model", e.target.value)}
                      onBlur={() => handleBlur("Model")}
                      placeholder="e.g., Camry, Civic, X5"
                      required
                    />
                    {touched.Model && !selectedCar?.Model && (
                      <div className="invalid-feedback d-block">Model name is required</div>
                    )}
                  </div>

                  {/* Date Field */}
                  <div className="mb-4">
                    <label htmlFor="manufactureDate" className="form-label fw-bold text-dark">
                      <i className="bi bi-calendar-event text-primary"></i> Manufacture Date
                    </label>
                    <input
                      id="manufactureDate"
                      type="date"
                      className="form-control form-control-lg"
                      value={selectedCar?.ManufactureDate || ""}
                      onChange={e => handleOnChange("ManufactureDate", e.target.value)}
                      onBlur={() => handleBlur("ManufactureDate")}
                      required
                    />
                    {touched.ManufactureDate && !selectedCar?.ManufactureDate && (
                      <div className="invalid-feedback d-block">Manufacture date is required</div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="d-flex gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-success btn-lg flex-grow-1" 
                      onClick={onSubmit}
                      disabled={!isFormValid}
                    >
                      <i className="bi bi-check-circle"></i> Update Car
                    </button>
                    <Link to="/" className="btn btn-outline-secondary btn-lg">
                      <i className="bi bi-x-circle"></i> Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="alert alert-info mt-4" role="alert">
            <i className="bi bi-info-circle"></i> Make changes to the car details and click "Update Car" to save your changes.
          </div>
        </div>
      </div>
    </div>
  );
};