import React, { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'

const Busca = () => {
    const [termoDeBusca, setTermoDeBusca] = useState('')
    useEffect (() => {
        const aux = async () => {
            try{
                const res = await axios.get('https://reactjs.dev')
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        aux()
    }, [termoDeBusca])
    return (
        <div>
            <span className='p-input-icon-left'>
                <i className='pi pi-search'></i>
                <InputText 
                    onChange={(e) => setTermoDeBusca(e.target.value)}/>
            </span>
        </div>
    )
}

export default Busca