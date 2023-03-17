import axios from 'axios'
import { X } from 'phosphor-react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'

import './modalEdit.scss'

import { ContextInfos } from "../../../../Contexts/Context"

export function ModalEdit() {
    Modal.setAppElement('#root')

    const { modalEdit, id, nome, email, EditModal } = useContext(ContextInfos)

    const [nameValue, setNameValue] = useState(nome)
    const [emailValue, setEmailValue] = useState(email)

    useEffect(() => {
        setNameValue(nome);
        setEmailValue(email);
    }, [nome, email]);

    function handleEditModal() {
        setNameValue(nome);
        setEmailValue(email);
        EditModal()
    }

    function handleValueAdd(event: ChangeEvent<HTMLInputElement>) {
        switch (event.target.name) {
            case 'nome':
                setNameValue(event.target.value)
                break
            case 'email':
                setEmailValue(event.target.value)
                break
        }
    }

    function validateEmail(email: string) {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }

    function handleEditUser() {
        if (!validateEmail(emailValue)) {
            alert('Por favor, forneça um endereço de e-mail válido.')
            return
        }
        const data = {
            name: `${nameValue}`,
            email: `${emailValue}`
        };

        axios.put(`http://localhost:3333/put/${id}`, data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        EditModal();
    }

    return (
        <Modal
            isOpen={modalEdit}
            onRequestClose={handleEditModal}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.438)',
                },
                content: {
                    backgroundColor: '#f1f1f1',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: '10%',
                    width: '80%',
                    maxWidth: '600px',
                    minHeight: '50%',
                    maxHeight: '55%',
                },
            }}
        >
            <div className="add">
                <h1>Editar</h1>
                <X size={24} className='closeModalAddIcon' onClick={handleEditModal} color="red" />
            </div>
            <hr />
            <label >Nome</label>
            <input type="text" name='nome' value={nameValue} onChange={handleValueAdd} />

            <label >E-mail</label>
            <input type="email" name='email' value={emailValue} onChange={handleValueAdd} />

            <button className='buttonEdit' onClick={handleEditUser}>Editar</button>

        </Modal>
    )
}