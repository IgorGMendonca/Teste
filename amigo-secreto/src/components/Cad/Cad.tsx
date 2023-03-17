import { TrashSimple, PencilSimple, PlusCircle, X, AlignRight } from 'phosphor-react'

import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import './cad.scss'
import { ModalAdd } from './Modais/AditionCad/ModalAdd'
import { ContextInfos } from '../../Contexts/Context'
import { ModalEdit } from './Modais/EditModal/ModalEdit'
import { ModalExclude } from './Modais/ExcludModal/ModalExclude'

interface Pessoa {
    _id: string;
    name: string;
    email: string;
}

export function Cad() {

    const { IdDelete, AddModal, EditModal, DeleteModal, DeleteId, EditModalData } = useContext(ContextInfos)
    const [pessoas, setPessoas] = useState<Pessoa[]>([]);


    useEffect(() => {
        axios
            .get("http://localhost:3333/search")
            .then(({ data }) => {
                setPessoas(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [pessoas, IdDelete]);


    function handleAddModal() {
        AddModal()
    }

    function handleEditModal(id: string, name: string, email: string) {
        EditModal()

        EditModalData(id, name, email);
    }

    function handleExcludeModal(id: string) {
        DeleteModal()
        DeleteId(id)
    }

    return (
        <>
            <aside className='homeAside'>

                <div className='newCad'>
                    <h1>Novo Participante</h1>
                    <PlusCircle className='addPerson' onClick={handleAddModal} size={24} color="#ffff" />
                </div>

                <table >
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    {pessoas.map((data, index) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>
                                        <PencilSimple size={24} onClick={() => handleEditModal(data._id, data.name, data.email)} className='pencilSimple' color="#d5a234" alt='Alterar' />
                                        <TrashSimple size={24} className='trashSimple' onClick={() => handleExcludeModal(data._id)} color="#d54434" alt='Excluir' />
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>

            </aside>

            <div className='divAddModal'>
                <ModalAdd />
            </div>


            <div className='divEditModal'>
                <ModalEdit />
            </div>

            <div className='divDeleteModal'>
                <ModalExclude />
            </div>
        </>
    )
}