import React from 'react'
import Image from 'next/image'
import Categoria from './Categoria'
import useCafeteria from 'hooks/useCafeteria'


const Sidebar = () => {
    const { categorias } = useCafeteria()
    return (
        <>
            <Image className='slide-in-elliptic-top-fwd' width={300} height={80} src="./assets/img/logo.svg" alt='imagen logo tipo' />

            <nav className='mt-10'>
                {categorias.map(categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}


                    />
                ))}
            </nav>
        </>
    )
}

export default Sidebar