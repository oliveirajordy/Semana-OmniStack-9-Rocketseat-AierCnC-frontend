import React, { useEffect, useState } from 'react';
import './styles.css';

import api from '../../services/api';

import { Link } from 'react-router-dom'

const Index = _ => {

    const [spots, setSpots] = useState(Array);

    useEffect(_ => {
        const user_id = localStorage.getItem('user');

        api.get('/dashboard', { headers: { user_id } })
            .then(resp => {
                setSpots(resp.data)
            })
    }, []);

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new" ><button className="btn">Cadastrar Novo Spot</button></Link>
        </>
    );
}

export default Index;