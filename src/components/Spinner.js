const Spinner = () => {
    return ( <div className='fixed top-0 right-0 h-screen w-screen z-30 flex justify-center items-center mt-5 sm:mt-0'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
        </div>
    )
}

export default Spinner; //Girador de carga de productos