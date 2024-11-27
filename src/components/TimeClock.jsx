import React, { useState, useRef, useEffect } from 'react';

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

  return (
    <div className="timer-container p-4 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <div className="timer-display text-center text-4xl font-bold mb-4">
        {formatTime(timer.hours)}:{formatTime(timer.minutes)}:{formatTime(timer.seconds)}
      </div>
      
      <div className="timer-controls flex justify-center space-x-4">
        {!timer.isRunning ? (
          <button 
            onClick={startTimer} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Iniciar
          </button>
        ) : (
          <button 
            onClick={pauseTimer} 
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Pausar
          </button>
        )}
        
        <button 
          onClick={stopTimer} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Detener
        </button>
      </div>
    </div>
  );
};