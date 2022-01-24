import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Spinner} from './Spinner';
import {ErrorMessage} from './ErrorMessage';
import { ShoppingCart } from './../utils/ShoppingCart';

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
    const shoppingCart = ShoppingCart();
    const [carIsInCart, setCarIsInCart] = useState(shoppingCart.getCarIds().includes(+id));

    const history = useHistory();
    const goToCarList = () => {
        history.push("/");
    }
    
    if (hasError) return <ErrorMessage />
    if (isLoading) return <Spinner />

    const onAdd = (e) => {
        shoppingCart.add(car.id)
        setCarIsInCart(true);
        e.preventDefault();
    }

    const onRemove = (e) => {        
        shoppingCart.remove(car.id);
        setCarIsInCart(false);
        e.preventDefault();
    }    

    return (
        <div className="row">
            <form className="col-sm-6">
                <h4>Car details:</h4>
                <div className="form-group row">
                    <label htmlFor="id" className="col-sm-4 col-form-label">Id</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="id" value={car.id} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="make" className="col-sm-4 col-form-label">Make</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="make" value={car.make} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="model" className="col-sm-4 col-form-label">Model</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="model" value={car.model} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="yearModel" className="col-sm-4 col-form-label">Year model</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="yearModel" value={car.yearModel} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="price" className="col-sm-4 col-form-label">Price</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="price" value={car.price} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="licensed" className="col-sm-4 col-form-label">Licensed</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="licensed" value={car.licensed?.toString()} />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="dateAdded" className="col-sm-4 col-form-label">Date added</label>
                    <div className="col-sm-8">
                        <input type="text" readOnly className="form-control" id="dateAdded" value={car.dateAdded} />
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" onClick={goToCarList}>Go to car list</button>
                    {
                        carIsInCart 
                        ? <button className="btn btn-warning" onClick={onRemove}>Remove</button> 
                        : <button className="btn btn-primary" onClick={onAdd}>Add</button> 
                    }
                    
                </div>
            </form>
            <form className="col-sm-6">
                <h4>Warehouse details:</h4>
                <div className="form-group row">
                        <label htmlFor="warehouseId" className="col-sm-4 col-form-label">Id</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control" id="warehouseId" value={car.warehouseId} />
                        </div>
                </div>
                
                <div className="form-group row">
                        <label htmlFor="warehouseName" className="col-sm-4 col-form-label">Name</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control" id="warehouseName" value={car.warehouseName} />
                        </div>
                </div>

                <fieldset className="form-group">
                    <div className="row">
                        <legend className="col-sm-4 col-form-label">Coords</legend>
                        <div className="col-sm-4">
                            <input type="text" readOnly className="form-control" id="warehouseLatitude" value={car.warehouseLocationLatitude} />
                        </div>
                        <div className="col-sm-4">
                            <input type="text" readOnly className="form-control" id="warehouseLongitude" value={car.warehouseLocationLongitude} />
                        </div>
                    </div>
                </fieldset>
                
                <div className="form-group row">
                        <label htmlFor="location" className="col-sm-4 col-form-label">Location</label>
                        <div className="col-sm-8">
                            <input type="text" readOnly className="form-control" id="location" value={car.carsLocation} />
                        </div>
                </div>
            </form>
        </div>
    );
}