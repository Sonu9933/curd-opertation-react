import { useState, useContext } from "react";
import { CarContext } from "../Context/CarContext";
import { useNavigate , Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';

// Validation Schema
const validationSchema = Yup.object().shape({
    company: Yup.string()
        .min(2, 'Company name must be at least 2 characters')
        .required('Company name is required'),
    model: Yup.string()
        .min(2, 'Model name must be at least 2 characters')
        .required('Model name is required'),
    ManufactureDate: Yup.string()
        .required('Manufacture date is required')
});

export const AddCar : React.FunctionComponent = () => {

    const { state, dispatch } = useContext(CarContext);
    const [Company, setCompany] = useState("");
    const [Model, setModel] = useState("");
    const [ManufactureDate, setManufactureDate] = useState("");
    let navigate = useNavigate();

    const onSubmit = () => {
        const car = {
            Id: state.cars.length + 1,
            Company,
            Model,
            ManufactureDate
        };

        dispatch({
            type: "ADD_CAR",
            payload: car
        });

        navigate("/");
    };

    return (
        <div className="add-car-container">
            <div className="row">
                <div className="col-lg-6 col-md-8 mx-auto">
                    {/* Header */}
                    <div className="mb-5 text-center">
                        <h1 className="display-5 fw-bold text-dark mb-2">
                            <i className="bi bi-plus-circle text-primary"></i> Add New Car
                        </h1>
                        <p className="text-muted">Fill in the details below to add a new car to your inventory</p>
                    </div>

                    {/* Form Card */}
                    <div className="card border-0 shadow-lg">
                        <div className="card-body p-4">
                            <Formik
                                initialValues={{
                                    company: "",
                                    model: "",
                                    ManufactureDate: ""
                                }}
                                validationSchema={validationSchema}
                                validate={values => {
                                    let errors = {};
                                    if (values.company) {
                                        setCompany(values.company)
                                    }
                                    if (values.model) {
                                        setModel(values.model)
                                    }
                                    if (values.ManufactureDate) {
                                        setManufactureDate(values.ManufactureDate)
                                    }
                                    return errors;
                                }}
                                onSubmit={onSubmit}
                            >
                                {({ errors, touched, isValid, dirty }) => (
                                    <Form>
                                        {/* Company Field */}
                                        <div className="mb-3">
                                            <label htmlFor="company" className="form-label fw-bold text-dark">
                                                <i className="bi bi-building text-primary"></i> Company Name
                                            </label>
                                            <Field
                                                id="company"
                                                name="company"
                                                type="text"
                                                className={`form-control form-control-lg ${touched.company && errors.company ? "is-invalid" : ""}`}
                                                placeholder="e.g., Toyota, Honda, BMW" 
                                            />
                                            <ErrorMessage name="company">
                                                {msg => <div className="invalid-feedback d-block">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        {/* Model Field */}
                                        <div className="mb-3">
                                            <label htmlFor="model" className="form-label fw-bold text-dark">
                                                <i className="bi bi-car-front text-primary"></i> Model Name
                                            </label>
                                            <Field
                                                id="model"
                                                name="model"
                                                type="text"
                                                className={`form-control form-control-lg ${touched.model && errors.model ? "is-invalid" : ""}`}
                                                placeholder="e.g., Camry, Civic, X5" 
                                            />
                                            <ErrorMessage name="model">
                                                {msg => <div className="invalid-feedback d-block">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        {/* Date Field */}
                                        <div className="mb-4">
                                            <label htmlFor="manufacturDate" className="form-label fw-bold text-dark">
                                                <i className="bi bi-calendar-event text-primary"></i> Manufacture Date
                                            </label>
                                            <Field
                                                id="manufacturDate"
                                                name="ManufactureDate"
                                                type="date"
                                                className={`form-control form-control-lg ${touched.ManufactureDate && errors.ManufactureDate ? "is-invalid" : ""}`}
                                            />
                                            <ErrorMessage name="ManufactureDate">
                                                {msg => <div className="invalid-feedback d-block">{msg}</div>}
                                            </ErrorMessage>
                                        </div>

                                        {/* Buttons */}
                                        <div className="d-flex gap-2">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary btn-lg flex-grow-1"
                                                disabled={!isValid || !dirty}
                                            >
                                                <i className="bi bi-check-circle"></i> Add Car
                                            </button>
                                            <Link to="/" className="btn btn-outline-secondary btn-lg">
                                                <i className="bi bi-x-circle"></i> Cancel
                                            </Link>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="alert alert-info mt-4" role="alert">
                        <i className="bi bi-info-circle"></i> All fields are required. Please fill in all details before submitting.
                    </div>
                </div>
            </div>
        </div>
    );
};