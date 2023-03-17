import './header.scss'

import { AddressBook, Tag, House } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Header() {

    return (
        <header >
            <aside>
                <NavLink to='./home'>
                    <h1>Sorteio</h1>
                </NavLink>
            </aside>

            <nav>
                <NavLink to='/home'>
                    <House className='house' size={24} color="#ffff" weight="bold" alt='Home' />
                </NavLink>

                <NavLink to='/cad'>
                    <AddressBook className='tag' size={24} color="#ffff" weight="bold" alt='Cadastro' />
                </NavLink>

                <NavLink to='/sort'>
                    <Tag className='addressbook' size={24} color="#ffff" weight="bold" alt='Sorteio' />
                </NavLink>
            </nav>
        </header>
    )
}