import { useState, useRef, useEffect } from 'react';
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { LocationSelector } from '../components/LocationSelector';

// Componente de Cronómetro
export const TimeClock = () => {
  // Estado inicial del cronómetro
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    isRunning: false
  });

  // Referencia para manejar el intervalo
  const intervalRef = useRef(null);
  const totalSecondsRef = useRef(0);

  const calculateProgressPercentage = () => {
    const TOTAL_SECONDS_IN_8_HOURS = 8 * 60 * 60; // 8 horas en segundos
    const currentProgress = (totalSecondsRef.current / TOTAL_SECONDS_IN_8_HOURS) * 100;
    return Math.min(currentProgress, 100);
  };

  // Función para pasar los números a formato string
  const formatTime = (value) => 
    value.toString().padStart(2, '0'); //padStart indica que el string sea de longitud 2 y el segundo parámetro '0' es el valor que se añade al string si es menor a dos dígitos
//   formatTime(5)   // Resultado: "05"
//   formatTime(12)  // Resultado: "12"
//   formatTime(0)   // Resultado: "00"

  // Función para iniciar el cronómetro
  const startTimer = () => {
    if (!timer.isRunning) { // Impide que se ejecute la función si el cronómetro está en ejecución
      intervalRef.current = setInterval(() => { //guarda la referencia del intervalo de setInterval que ejecuta el temporizador cada segundo y current permite accder a la referencia guardada
        setTimer(prevTimer => { //prevTimer trae los datos del estado anterior del temporizador para actualizarlos
          let newSeconds = prevTimer.seconds + 1;
          let newMinutes = prevTimer.minutes;
          let newHours = prevTimer.hours;

           // Incrementar contador de segundos totales
           totalSecondsRef.current += 1;

          if (newSeconds === 60) { //Cuando los segundos llegan a 60, se resetean a 0 y se suma 1 minuto
            newSeconds = 0;
            newMinutes += 1;
          }

          if (newMinutes === 60) { //Cuando los minutos llegan a 60, se resetean a 0 y se suma 1 hora
            newMinutes = 0;
            newHours += 1;
          }

          return { //Devuelve el estado actualizado del temporizador, es decir, pone en marcha el temporizador
            ...prevTimer,
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHours,
            isRunning: true
          };
        });
      }, 1000);
    }
  };

  // Función para pausar el cronómetro
  const pauseTimer = () => {
    if (intervalRef.current) { //Verifica si el cronómetro está en marcha
      clearInterval(intervalRef.current); //Pausa el temporrizador
      intervalRef.current = null; //Limpia la referencia del intervalo
      setTimer(prevTimer => ({ //Actualiza el estado del temporizador y se pasa isRunning a false para indicar que el temporizador ha sido pausado
        ...prevTimer,
        isRunning: false
      }));
    }
  };

  // Función para detener y resetear el cronómetro
  const stopTimer = () => {
    if (intervalRef.current) { //Comprueba que el cronómetro está en marcha o pausado
      clearInterval(intervalRef.current); //Detiene el temporizador
      intervalRef.current = null; //Indica que no hay ningún intervalo en marcha
    }

       // Resetear también los segundos totales
       totalSecondsRef.current = 0;
    
    setTimer({ //Reestablece todas las propiedades de 0
      seconds: 0,
      minutes: 0,
      hours: 0,
      isRunning: false
    });
  };

  // Limpiar intervalo al desmontar el componente
  useEffect(() => {
    return () => {
      if (intervalRef.current) { //Si el intervalo sigue activo lo para con "clearInterval"
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progressPercentage = calculateProgressPercentage();
  const circleColor = `rgba(0, 163, 224, ${1 - progressPercentage / 100})`;

  return (
    <div className="flex flex-col items-center bg-primarybg font-mainFont">
      <LocationSelector />
      <div className="flex items-center max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            
  
            {/* Botón de Play/Pause */}
            {!timer.isRunning ? (
              <button
                onClick={startTimer}
                className="text-primary border border-primary px-6 py-4 rounded hover:bg-hoverButton"
              >
                <FaPlay />
              </button>
            ) : (
              <button
                onClick={pauseTimer}
                className="text-primary border border-primary px-6 py-4 rounded hover:bg-hoverButton"
              >
                <FaPause />
              </button>
            )}
          </div>
  
          {/* Círculo de Progreso */}
          <div className="relative w-44 h-44">
            {/* Círculo de fondo */}
            <div
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
              }}
            />
  
            {/* Círculo de progreso */}
            <div
              className="absolute inset-0 rounded-full border-8 border-primary transition-all duration-1000 ease-linear"
              style={{
                clipPath: `path('M50,50 L50,0 A50,50 0 ${
                  progressPercentage > 50 ? 1 : 0
                },1 ${
                  50 + 50 * Math.sin((Math.PI * 2 * progressPercentage) / 100)
                },${
                  50 - 50 * Math.cos((Math.PI * 2 * progressPercentage) / 100)
                } Z')`,
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
                backgroundColor: circleColor,
                opacity: 0.7,
              }}
            />
  
            {/* Contenedor del tiempo */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-font">
                  {formatTime(timer.hours)}:{formatTime(timer.minutes)}:
                  {formatTime(timer.seconds)}
                </div>
              </div>
            </div>
          </div>
  
          {/* Botón de Stop */}
          <div className="flex items-center">
            <button
              onClick={stopTimer}
              className="text-primary border border-primary px-6 py-4 rounded hover:bg-hoverButton"
            >
              <FaStop />
            </button>
          </div>
        </div>
      </div>
    </div>
  )};
  