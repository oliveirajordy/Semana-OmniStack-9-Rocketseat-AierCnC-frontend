import React, { useState, useMemo } from 'react';
import './styles.css';

import camera from '../../assets/camera.svg';
import api from '../../services/api';

const Index = ({history}) => {

    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(_ => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const handleSubmit = async e => {
        e.preventDefault();
        const user_id = localStorage.getItem('user');
        const data = new FormData();


        data.append('price', price);
        data.append('techs', techs);
        data.append('company', company);
        data.append('thumbnail', thumbnail);

        await api.post('/spots', data, { headers: { user_id } });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail" className={thumbnail ? 'hasthumbnail' : ''} style={{ backgroundImage: `url(${preview})` }} >
                <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                <img src={camera} alt="camera" />
            </label>

            <label htmlFor="company">Empresa *</label>
            <input
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={e => setCompany(e.target.value)}
                type="text" />

            <label htmlFor="techs">TECNOLOGIAS * <span>Separado por virgula( , )</span></label>
            <input
                id="techs"
                placeholder="Quais tecnologias vocês usam?"
                value={techs}
                onChange={e => setTechs(e.target.value)}
                type="text" />

            <label htmlFor="price">VALOR DA DIARIA <span>em branco para gratuito</span></label>
            <input
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="number" />

            <button className="btn">Cadastrar</button>
        </form>
    );
}

export default Index;