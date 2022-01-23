import React from 'react'
import { useHistory } from 'react-router-dom';

export const CarTableRow = ({car}) => {
    const history = useHistory();

    const handleRowClick = () => {
        if (!car.licensed) return;
        history.push(`cars/${car.id}`);
    }

    return (
        <tr onClick={handleRowClick}>
            <th scope="row">{car.id}</th>
            <td>{car.make}</td>
            <td>{car.model}</td>
            <td>{car.yearModel}</td>
            <td>${car.price.toFixed(2)}</td>
            <td>{car.licensed ? "YES" : "NO"}</td>
            <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
        </tr>
    )
}