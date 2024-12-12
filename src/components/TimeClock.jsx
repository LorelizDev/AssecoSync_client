import { useState, useRef, useEffect } from 'react';
import { FaPlay } from "react-icons/fa6";
import { FaStop } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Componente de Cronómetro
export const TimeClock = () => {
  // Estado inicial del cronómetro
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    isRunning: false,
    workLocation: null
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
    value.toString().padStart(2, '0');

  const MySwal = withReactContent(Swal);

  const showWorkLocationAlert = () => {
    MySwal.fire({
      title: '¡Bienvenido!',
      text: '¿Desde dónde vas a trabajar hoy?',
      showCancelButton: true,
      confirmButtonText: `<span style="display: flex; align-items: center; gap: 5px;">
                            Oficina
                          </span>`,
      cancelButtonText: `<span style="display: flex; align-items: center; gap: 5px;">
                           Casa
                         </span>`,
      confirmButtonColor: '#00A3E0',
      cancelButtonColor: '#00A3E0',
      customClass: {
        confirmButton: 'swal-button-custom',
        cancelButton: 'swal-button-custom',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Trabajo en oficina
        startTimer('office');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Teletrabajo
        startTimer('remote');
      }
    });
  };

  // Función para iniciar el cronómetro
  const startTimer = (workLocation) => {
    if (!timer.isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          let newSeconds = prevTimer.seconds + 1;
          let newMinutes = prevTimer.minutes;
          let newHours = prevTimer.hours;

          // Incrementar contador de segundos totales
          totalSecondsRef.current += 1;

          if (newSeconds === 60) {
            newSeconds = 0;
            newMinutes += 1;
          }

          if (newMinutes === 60) {
            newMinutes = 0;
            newHours += 1;
          }

          return {
            ...prevTimer,
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHours,
            isRunning: true,
            workLocation: workLocation // Guardar la ubicación de trabajo
          };
        });
      }, 1000);
    }
  };

  // Función para pausar el cronómetro
  const pauseTimer = () => {
    MySwal.fire({
      title: '¿Estás seguro de pausar el tiempo?',
      text: 'Puedes continuar tu trabajo más tarde',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00A3E0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, pausar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTimer(prevTimer => ({
            ...prevTimer,
            isRunning: false
          }));

          MySwal.fire(
            'Pausado',
            'Tu tiempo de trabajo ha sido pausado',
            'success'
          );
        }
      }
    });
  };

  // Función para reanudar el cronómetro
  const resumeTimer = () => {
    if (timer.workLocation) {
      // Si ya se ha seleccionado una ubicación anteriormente
      MySwal.fire({
        title: '¿Estás listo para continuar?',
        text: `Continuarás trabajando desde ${timer.workLocation === 'office' ? 'la oficina' : 'casa'}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00A3E0',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          startTimer(timer.workLocation);
        }
      });
    } else {
      // Si no se ha seleccionado ubicación, mostrar el alert original
      showWorkLocationAlert();
    }
  };

  // Función para detener y resetear el cronómetro
  const stopTimer = () => {
    MySwal.fire({
      title: '¿Estás seguro de detener el tiempo?',
      text: 'No podrás recuperar el tiempo registrado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00A3E0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, detener',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        // Resetear también los segundos totales
        totalSecondsRef.current = 0;
        
        setTimer({
          seconds: 0,
          minutes: 0,
          hours: 0,
          isRunning: false,
          workLocation: null // Resetear también la ubicación de trabajo
        });

        MySwal.fire(
          'Detenido',
          'Tu tiempo de trabajo ha sido detenido',
          'success'
        );
      }
    });
  };

  // Limpiar intervalo al desmontar el componente
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progressPercentage = calculateProgressPercentage();
  const circleColor = `rgba(0, 163, 224, ${1 - progressPercentage / 100})`;

  return (
    <div className="flex flex-col items-center bg-primarybg font-mainFont">
      <div className="flex items-center max-w-2xl p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            {!timer.isRunning ? (
              <button
                onClick={resumeTimer}
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

          <div className="relative w-44 h-44">
            <div
              className="absolute inset-0 rounded-full border-8 border-primary"
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: 'center',
              }}
            />
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
  
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-font">
                  {formatTime(timer.hours)}:{formatTime(timer.minutes)}:
                  {formatTime(timer.seconds)}
                </div>
              </div>
            </div>
          </div>
  
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
  );
};