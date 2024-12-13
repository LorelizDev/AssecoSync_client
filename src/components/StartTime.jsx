import { useTimeStore } from '../context/timeStore';

export const StartTime = () => {
  const startTime = useTimeStore((state) => state.startTime);  // Obtener el estado

  return (
    <div className='flex flex-col items-center bg-secondarybg p-2 pl-16 pr-16 font-mainFont'>
        <h3 className='text-darkicon'>Tu jornada laboral ha comenzado a</h3>
        <p className='text-primary font-bold'>{startTime ? startTime : "Aún no ha comenzado"}</p>
        <h4 className='text-grayicon'>¡Que tengas un buen día!</h4>
    </div>
  );
};

  