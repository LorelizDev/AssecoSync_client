export const TimeRegister = () => {

return(
    <div className= "flex flex-col items-center font-mainFont bg-secondarybg p-4 pl-12 pr-12 ">
            <h3 className="text-xl font-bold mb-4 font-mainFont">REGISTRO DE TIEMPOS</h3>
            <table className="w-full border-collapse">
            <tbody>
                <tr className='font-mainFont border-b border-gray-300'>
                    <td className="px-4 py-2">Trabajo</td>
                    <td className="px-4 py-2">9 h - 11'30 h</td>
                    <td className="px-4 py-2">2'5 h</td>
                </tr>
                <tr className='text-primary font-mainFont border-b border-gray-300'>
                    <td className="px-4 py-2">Pausa</td>
                    <td className="px-4 py-2">11'30 h - 12 h</td>
                    <td className="px-4 py-2">30 min</td>
                </tr>
                <tr className='font-mainFont border-b border-gray-300'>
                    <td className="px-4 py-2">Trabajo</td>
                    <td className="px-4 py-2">12 h - 13'30 h</td>
                    <td className="px-4 py-2">1'5 h</td>
                </tr>
            </tbody>
            </table>
    </div>
)};