import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useRouter } from "next/router";

const CafeteriaContext = createContext()

const CafeteriaProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()


    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({ categoriaId, ...producto }) => {

        if (pedido.some(productoState => productoState.id === producto.id)) {
            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)

            toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
        setModal(false)
    }

    const handleEditarCatidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0])

        setModal(!modal)
    }

    const handleEliminarProducto = id => {

        const pedidoActualizado = pedido.filter(producto => producto.id !== id)

        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Se ha borrado!',
                    'El producto se ha borrado correctamente',
                    'success'
                );
                setPedido(pedidoActualizado)
            }
        })
    }


    const colocarOrden = async (e) => {
        e.preventDefault()

        try {
            await axios.post('/api/ordenes', { pedido, nombre, total, fecha: Date.now().toString() })

            //Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 1500);

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <CafeteriaContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleSetProducto,
                producto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCatidades,
                handleEliminarProducto,
                setNombre,
                nombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </CafeteriaContext.Provider>
    )
}

export {
    CafeteriaProvider
}

export default CafeteriaContext