import { useState, useContext, ChangeEvent } from "react"
import axios from "axios"

import './modalAdd.scss'

import { X } from 'phosphor-react'
import Modal from 'react-modal'
import { ContextInfos } from "../../../../Contexts/Context"

export function ModalAdd() {
    Modal.setAppElement('#root')

    const { modalAdd, AddModal } = useContext(ContextInfos)

    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')

    function handleAddModal() {
        AddModal()
        setNameValue('')
        setEmailValue('')
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

    function sendCad() {
        if (!validateEmail(emailValue)) {
            alert('Por favor, forneça um endereço de e-mail válido.')
            return
        }

        const data = {
            name: `${nameValue}`,
            email: `${emailValue}`
        };

        axios.post('http://localhost:3333/cad', data)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        AddModal()
        setNameValue('')
        setEmailValue('')
    }

    return (
        <>
            <Modal
                isOpen={modalAdd}
                onRequestClose={handleAddModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.438)',
                    },
                    content: {
                        backgroundColor: '#f1f1f1',
                        marginLeft: '600px',
                        marginTop: '150px',
                        width: '30%',
                        height: '50%',
                    },
                }}
            >
                <div className="add">
                    <h1>Adicionar</h1>
                    <X size={24} className='closeModalAddIcon' onClick={handleAddModal} color="red" />
                </div>
                <hr />
                <label >Nome</label>
                <input type="text" name='nome' value={nameValue} onChange={handleValueAdd} />

                <label >E-mail</label>
                <input type="email" name='email' value={emailValue} onChange={handleValueAdd} />

                <button className="buttonCad" onClick={sendCad}>Cadastrar</button>

            </Modal>
        </>

    )
}