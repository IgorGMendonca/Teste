import axios from 'axios'
import shuffle from 'lodash.shuffle'

import emailjs from 'emailjs-com'

import { EnvelopeSimple } from 'phosphor-react'
import { useEffect, useState } from 'react'
import './sort.scss'

interface Pessoa {
    _id: string;
    name: string;
    email: string;
}

interface SortResult {
    _id: string;
    name: string;
    email: string;
    sorteado: {
        name: string;
        email: string;
    }
}

export function Sort() {
    const [showTable, setShowTable] = useState(false)
    const [pessoas, setPessoas] = useState<Pessoa[]>([])

    const [sortResult, setSortResult] = useState<SortResult[]>([])

    useEffect(() => {
        axios
            .get("http://localhost:3333/search")
            .then(({ data }) => {
                setPessoas(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    function handleShowTable() {
        setShowTable(true)

        const shuffledPessoas = shuffle(pessoas)
        const result = shuffledPessoas.map((pessoa, index) => {
            const sorteado = index === pessoas.length - 1 ? shuffledPessoas[0] : shuffledPessoas[index + 1]
            return { _id: pessoa._id, name: pessoa.name, email: pessoa.email, sorteado: { name: sorteado.name, email: sorteado.email } }
        })

        setSortResult(result)
    }

    function handleSendEmails() {
        const serviceId = 'service_21j1sz5'
        const templateId = 'template_r2tttfo'
        const userId = '1pbtd52XGBMbe4qsn'

        const data = sortResult

        data.forEach(({ name, email, sorteado }) => {
            const templateParams = {
                to_name: name,
                from_name: name,
                to_email: email,
                message: `Parabéns! Você foi sorteado(a) para presentear ${sorteado.name.toUpperCase()} neste ano.`
            }

            emailjs.send(serviceId, templateId, templateParams, userId)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text)
                })
                .catch((error) => {
                    console.log('FAILED...', error)
                })
        })

    }


    return (
        <div className="sortDiv">
            <button onClick={handleShowTable} className='buttonSort'>Sortear</button>

            {showTable && <aside className='sortAside'>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Sorteado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortResult.map((data, index) => (
                            <tr key={index}>
                                <td>{data.name}</td>
                                <td>{data.sorteado.name}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <aside className='sendAside'>
                    <h1>Enviar E-mail?</h1>
                    <EnvelopeSimple className='sendEmail' onClick={handleSendEmails} size={32} color="#d5a234" />
                </aside>
            </aside>}
        </div>
    )
}
