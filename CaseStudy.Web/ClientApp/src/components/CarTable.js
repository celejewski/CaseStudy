import React, { useState, useEffect } from 'react';
import { CarTableRow } from './CarTableRow';
import {Spinner} from './Spinner';
import {ErrorMessage} from './ErrorMessage';

function useCars() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setHasError(false);

            try {
                const response = await fetch('api/cars');
                if (response.ok) {
                    const cars = await response.json();
                    setCars(cars);
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
    },[setCars]);

    return {cars, isLoading, hasError}
}

export const CarTable = () => {
    const {cars, isLoading, hasError} = useCars();

    if (hasError) return <ErrorMessage />;
    if (isLoading) return <Spinner />

    return (
        <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Make</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year model</th>
                    <th scope="col">Price</th>
                    <th scope="col">Licensed</th>
                    <th scope="col">Date Added</th>
                </tr>
            </thead>
            <tbody>
                {cars.map(car => <CarTableRow key={car.id} car={car}/>)}
            </tbody>
        </table>
    );
}