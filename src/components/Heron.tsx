import React from 'react';
import logo from '../img/heron.png';

export const Heron: React.FC = () => {
    return (
        <div className="heron">
            <img className="heronLogo" src={logo} />
        </div>
    )
}