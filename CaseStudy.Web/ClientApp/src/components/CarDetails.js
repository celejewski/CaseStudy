import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Spinner} from './Spinner';
import {ErrorMessage} from './ErrorMessage';

const useCar = (id) => {
    const [car, setCar] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setHasError(false);
            try {
                const response = await fetch("api/cars/" + id);
                if (response.ok) {
                    const car = await response.json()
                    setCar(car);
                }
                else {
                    setHasError(true);
                }
            }
            catch (error) {
                setHasError(true);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return { car, isLoading, hasError };
}

export const CarDetails = () => {
    const { id } = useParams();
    const { car, isLoading, hasError } = useCar(id);

    const history = useHistory();
    const goToCarList = () => {
        history.push("/");
    }

    if (hasError) return <ErrorMessage />
    if (isLoading) return <Spinner />

    return (
        <form>
            <div className="form-group row">
                <label htmlFor="id" className="col-sm-2 col-form-label">Id</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="id" value={car.id} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="make" className="col-sm-2 col-form-label">Make</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="make" value={car.make} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="model" className="col-sm-2 col-form-label">Model</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="model" value={car.model} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="yearModel" className="col-sm-2 col-form-label">Year model</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="yearModel" value={car.yearModel} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="price" className="col-sm-2 col-form-label">Price</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="price" value={car.price} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="licensed" className="col-sm-2 col-form-label">Licensed</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="licensed" value={car.licensed?.toString()} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="dateAdded" className="col-sm-2 col-form-label">Date added</label>
                <div className="col-sm-10">
                    <input type="text" readOnly className="form-control" id="dateAdded" value={car.dateAdded} />
                </div>
            </div>
            <button className="btn btn-secondary" onClick={goToCarList}>Go to car list</button>
        </form>
    );
}