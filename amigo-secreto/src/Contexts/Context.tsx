import {
    createContext,
    ReactNode,
    useState,
} from 'react'

interface ContextProviderProps {
    children: ReactNode
}

interface ContextType {
    IdDelete: string
    id: string
    nome: string
    email: string
    modalAdd: boolean
    modalEdit: boolean
    modalDelete: boolean
    AddModal: () => void
    EditModal: () => void
    DeleteModal: () => void
    DeleteId: (id: string) => void
    EditModalData: (id: string, name: string, email: string) => void
}

export const ContextInfos = createContext({} as ContextType)

export function ContextProvider({ children }: ContextProviderProps) {
    const teste = 'teste'

    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const [IdDelete, setDeleteId] = useState('')

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')

    function AddModal() {
        setModalAdd(!modalAdd)
    }

    function EditModal() {
        setModalEdit(!modalEdit)
    }

    function DeleteModal() {
        setModalDelete(!modalDelete)

    }

    function DeleteId(id: string) {
        setDeleteId(id)
    }

    function EditModalData(id: string, name: string, email: string) {
        setId(id)
        setNome(name)
        setEmail(email)
    }


    return (
        <ContextInfos.Provider
            value={{
                IdDelete,
                id,
                nome,
                email,
                modalAdd,
                modalEdit,
                modalDelete,
                AddModal,
                EditModal,
                DeleteModal,
                DeleteId,
                EditModalData
            }}
        >
            {children}
        </ContextInfos.Provider>
    )
}