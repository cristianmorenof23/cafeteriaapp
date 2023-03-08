import useCafeteria from "hooks/useCafeteria"
import Layout from "./layout/Layout"
import ResumenProducto from "components/ResumenProducto"



export default function Resumen () {

    const { pedido } = useCafeteria()

    return (
        <Layout pagina='Resumen'>
            <h1 className='text-4xl font-black tracking-in-expand text-center  text-amber-500'>Resumen</h1>
            <p className='text-2xl my-10 tracking-in-expand text-center font-bold'>Revisa tu Pedido</p>

            {pedido.length === 0 ? (
                <p className='text-center text-2xl'>No hay elementos en tu pedido</p>
            ) : (
                pedido.map(producto => (
                    <ResumenProducto
                        key={producto.id}
                        producto={producto}
                    />
                ))
            )}
        </Layout>
    )
    
}