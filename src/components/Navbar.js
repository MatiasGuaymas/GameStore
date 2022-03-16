import { useState } from 'react';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';

export default () => { //Navbar con Link a las distintas categorías

  const [state, setState] = useState(false)

  return (
      <nav className="bg-slate-200 w-full border-b md:border-0 md:static shadow-md font-[Poppins] ">
          <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
              <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Link to="/"><a className='font-bold text-3xl cursor-point flex items-center text-gray-800'>
                    <span className='text-4xl text-blue-600 mr-2 pt-2'>
                    <ion-icon name="game-controller-outline"></ion-icon>
                    </span>
                    GAME STORE
                </a></Link>
                  <div className="md:hidden">
                      <button className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                          onClick={() => setState(!state)}
                      >
                          {
                              state ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                  </svg>
                              )
                          }
                      </button>
                  </div>
              </div>
              <div className={`flex-1 justify-self-center pb-1 mt-5 md:block md:pb-0 md:mt-0 ${ state ? 'block' : 'hidden'}`}>
                  <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                  <Link to="/"><li className="text-2xl font-bold text-gray-600 hover:text-indigo-600">
                      PRODUCTOS
                    </li></Link>
                    <Link to="/category/1"><li className="text-2xl font-bold text-gray-600 hover:text-indigo-600">
                      CONSOLA
                    </li></Link>
                    <Link to="/category/2"><li className="text-2xl font-bold text-gray-600 hover:text-indigo-600">
                                     PC 
                    </li></Link>
                  </ul>
              </div>
              <div className="mt-3">
              <Link to="/cart"><CartWidget/></Link>
              </div>
          </div>
      </nav>
  )
}
