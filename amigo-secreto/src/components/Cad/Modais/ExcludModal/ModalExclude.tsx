import Modal from 'react-modal'
import { X } from 'phosphor-react'

import { ContextInfos } from "../../../../Contexts/Context"
import { useContext } from 'react'

import './modalExclude.scss'
import axios from 'axios'


export function ModalExclude() {
    Modal.setAppElement('#root')

    const { modalDelete, IdDelete, DeleteModal } = useContext(ContextInfos)

    function handleDeleteModal() {
        DeleteModal()

    }

    function handleDeleteButton() {
        axios.delete(`http://localhost:3333/delete/${IdDelete}`)

        DeleteModal()
    }

    return (
        <Modal
            isOpen={modalDelete}
            onRequestClose={handleDeleteModal}
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
                <h1>Excluir</h1>
                <X size={24} className='closeModalAddIcon' onClick={handleDeleteModal} color="red" />
            </div>
            <hr />
            <label >Tem certeza que deseja excluir?</label>

            <button onClick={handleDeleteButton}>Excluir</button>

        </Modal>
    )
}