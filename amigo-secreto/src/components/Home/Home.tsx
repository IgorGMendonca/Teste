import './home.scss'

import Fachada from '../../assets/undraw.svg'
import { Gift } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

export function Home() {
    return (
        <main>
            <div className='infos'>
                <h1>Secret Friend</h1>
                <hr />
                <h2>Aqui você pode tirar seu amigo secreto sem complicações</h2>
                <aside>
                    <Gift className='iconGift' size={84} color="#F4AF33" />
                    <h3>Sorteie aqui sua lista de amigos secretos!</h3>
                </aside>

                <div className='linkCad'>
                    <NavLink to='/cad'>
                        <button>Cadastre os participantes
                        </button>
                    </NavLink>
                </div>


            </div>

            <div className='img'>
                <img src={Fachada} alt="Logo" />
            </div>
        </main >
    )
}