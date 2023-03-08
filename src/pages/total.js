import useCafeteria from "hooks/useCafeteria"
import Layout from "./layout/Layout"
import { useEffect, useCallback } from 'react'
import { formatearDinero } from "helpers"



export default function Total() {

    const { pedido, nombre, setNombre, colocarOrden, total} = useCafeteria()

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3;
    }, [pedido, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedido, comprobarPedido])

    return (
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className='text-4xl font-black tracking-in-expand text-center  text-amber-500'>Total y Confirmar Pedido</h1>
            <p className='text-2xl my-10 tracking-in-expand text-center font-bold'>Confirma tu Pedido a Continuacion</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label className='block uppercase text-slate-800 font-bold text-xl' htmlFor='nombre'>
                        Nombre
                    </label>

                    <input
                        type='text'
                        className=' w-full lg:w-1/3 mt-3 p-2 rounded-md hover:bg-amber-200'
                        id='nombre'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>

                <div className='mt-10'>
                    <p className='text-2xl font-bold'>Total a Pagar: {''} <span className='font-bold'>{formatearDinero(total)}</span></p>
                </div>

                <div className='mt-5'>
                    <input
                        type='submit'
                        className={` ${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center`}
                        value='Confirmar Pedido'
                        disabled={comprobarPedido()}
                    />
                </div>

            </form>
        </Layout>
    )
}