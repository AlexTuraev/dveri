import React from 'react';
import {Link} from 'react-router-dom';

import './header.scss';

const Header = () => {
    return (
        <section className='container-big container-big--bkColor'>
            <div className='container'>
                <header className='header'>
                    <div className='header__logo'>
                        <img className='header__logo-img' alt='logo'></img>
                        <span className='header__logo-title'>Logo Title</span>
                    </div>

                    <nav>
                        <ul className='header__nav'>
                            <li className='header__nav-item'>Home</li>
                            <li className='header__nav-item'>
                                <Link to='/catalog'>Catalog-LINK</Link>
                            </li>
                            <li className='header__nav-item'>Blog</li>
                            <li className='header__nav-item'>About Company</li>
                            <li className='header__nav-item'>Contact</li>
                        </ul>
                    </nav>

                    <div className='header__login'>
                    </div>
                </header>
            </div>
        </section>
    );
}

export default Header;



