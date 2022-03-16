import { Link } from 'react-router-dom';

const Error = () => { //En caso de dirigirnos a cualquier ruta no válida, se nos rediccionará a este sitio 
    return (

        <div class="w-9/12 m-auto py-16 flex items-center justify-center">
        <div class="shadow-lg rounded-md bg-slate-100 overflow-hidden sm:rounded-lg pb-8">
          <div class="text-center pt-8">
            <h1 class="text-7xl sm:text-8xl font-bold text-purple-400">404</h1>
            <h1 class="text-3xl sm:text-4xl font-medium py-8">Página no encontrada 😪</h1>
            <p class="text-xl sm:text-2xl pb-8 px-12">¡Ups! La página que estás buscando no existe. Es posible que se haya movido o eliminado.</p>
            <Link to='/'><button class="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md mr-6 ml-4 text-xl">
            INICIO
            </button></Link>
          </div>
        </div>
      </div>

    )
}

export default Error; 