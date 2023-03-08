import Producto from 'components/Producto'
import Layout from './layout/Layout'
import useCafeteria from 'hooks/useCafeteria'
import Head from 'next/head'
import Image from 'next/image'




export default function Home() {

    const { categoriaActual } = useCafeteria()

    return (
        <Layout pagina={`Menu ${categoriaActual?.nombre}`}>
            <h1 className='text-4xl font-black tracking-in-expand text-center text-amber-500'>{categoriaActual?.nombre}</h1>
            <p className='text-2xl my-10 tracking-in-expand text-center font-bold '>
                Elige y personaliza tu pedido a continuacion
            </p>

            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 fade-in'>
                {categoriaActual?.productos?.map(producto => (
                    <Producto
                        key={producto.id}
                        producto={producto}
                    />
                ))}
            </div>
        </Layout>
    )
}
