import React, { useState } from 'react';
import api from '../../services/api';

import logo from '../../assets/logo.svg';


const Index = ({ history }) => {

    const [email, setEmail] = useState('');

    const submint = async e => {
        e.preventDefault();

        const resp = await api.post('/sessions', { email });

        const { _id } = resp.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para empresas</p>
            <form onSubmit={submint} >

                <label htmlFor="email">E-Mail*</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                <button className="btn" >Entrar</button>
            </form>
        </>
    );
}

export default Index