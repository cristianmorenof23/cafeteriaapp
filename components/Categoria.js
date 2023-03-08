import React from 'react'
import Image from 'next/image'
import useCafeteria from 'hooks/useCafeteria'


const Categoria = ({categoria}) => {

    const {categoriaActual, handleClickCategoria} = useCafeteria()
    const {nombre, icono, id} = categoria

    return (
        <div className={` ${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border p-5 hover:bg-amber-400`}>
            <Image
                alt='imagen icono'
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
            />
            <button
                type='button'
                className='text-2xl font-bold hover:cursor-pointer'
                onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>

        </div>
    )
}

export default Categoria