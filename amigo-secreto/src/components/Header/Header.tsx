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
                    <House className='house' size={26} color="rgb(60, 60, 202)" weight="bold" alt='Home' />
                </NavLink>

                <NavLink to='/cad'>
                    <AddressBook className='tag' size={26} color="rgb(60, 60, 202)" weight="bold" alt='Cadastro' />
                </NavLink>

                <NavLink to='/sort'>
                    <Tag className='addressbook' size={26} color="rgb(60, 60, 202)" weight="bold" alt='Sorteio' />
                </NavLink>
            </nav>
        </header>
    )
}