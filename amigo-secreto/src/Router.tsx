import { Routes, Route } from 'react-router-dom'
import { Cad } from './components/Cad/Cad'
import { Home } from './components/Home/Home'
import { Sort } from './components/Sort/Sort'
import { Default } from './DefaultLayout/Default'

export function Router() {
    return (
        <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/' element={<Home />} />

            <Route path='/' element={<Default />}>
                <Route path='/cad' element={<Cad />} />
                <Route path='/sort' element={<Sort />} />
            </Route>
        </Routes>
    )
}