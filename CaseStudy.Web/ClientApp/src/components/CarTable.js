import React, { useState, useEffect } from 'react';
import {Spinner} from './Spinner';

function useCars() {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            setHasError(false);

            try {
                const response = await fetch('cars');
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

    if (hasError) return (<h3>Loading data failed...</h3>);
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
                {cars.map((c, i) => {
                    return (
                        <tr key={i}>
                            <th scope="row">{c.id}</th>
                            <td>{c.make}</td>
                            <td>{c.model}</td>
                            <td>{c.yearModel}</td>
                            <td>${c.price.toFixed(2)}</td>
                            <td>{c.licensed ? "YES" : "NO"}</td>
                            <td>{new Date(c.dateAdded).toLocaleDateString()}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}