import React, {useState, useEffect} from 'react';
import {ShoppingCart} from './../utils/ShoppingCart';
import {CarTableRow} from './CarTableRow';
import { ErrorMessage } from './ErrorMessage';
import { Spinner } from './Spinner';

const useShoppingCartData = (cars) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setHasError(false);
            try {
                console.log(cars);
                const response = await fetch("api/shoppingCart", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(cars)
                });
                if (response.ok) {
                    const data = await response.json()
                    setData(data);
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

    return { data, isLoading, hasError };
}


export const ViewShoppingCart = () => {
    const shoppingCart = ShoppingCart()
    
    const carIds = shoppingCart.getCarIds();
    const {data, isLoading, hasError} = useShoppingCartData(carIds);

    if (hasError) return <ErrorMessage />
    if (isLoading) return <Spinner />

    return (
        <div>
            <h4>Shopping cart</h4>
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
                    {data.cars.map(car => <CarTableRow key={car.id} car={car}/>)}
                    
                </tbody>
            </table>
            <h4>Total: ${data.total.toFixed(2)}</h4>
        </div>
    )
}