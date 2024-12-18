import { useState, useRef, useEffect } from 'react';
import { FaPlay } from 'react-icons/fa6';
import { FaStop } from 'react-icons/fa6';
import { FaPause } from 'react-icons/fa';
import { PiHouseLineBold } from 'react-icons/pi';
import { PiBuildingOfficeBold } from 'react-icons/pi';
import { useTimeStore } from '../context/timeStore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  startTimeLog,
  updateTimeLogByAction,
  getActiveTimeLog,
} from '../services/timeLogServices';

export const TimeClock = () => {
  const setStartTime = useTimeStore((state) => state.setStartTime);
  const setPauseTime = useTimeStore((state) => state.setPauseTime);
  const setStopTime = useTimeStore((state) => state.setStopTime);
  const setResumeTime = useTimeStore((state) => state.setResumeTime);
  const actions = useTimeStore((state) => state.actions);
  const pauseAction = actions.find((action) => action.type === 'Pausa');
  const [timeLog, setTimeLog] = useState(null);
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
    isRunning: false,
    workLocation: null,
  });

  const intervalRef = useRef(null);
  const totalSecondsRef = useRef(0);

  const calculateProgressPercentage = () => {
    const TOTAL_SECONDS_IN_8_HOURS = 8 * 60 * 60;
    const currentProgress =
      (totalSecondsRef.current / TOTAL_SECONDS_IN_8_HOURS) * 100;
    return Math.min(currentProgress, 100);
  };

  const formatTime = (value) => value.toString().padStart(2, '0');

  const calculateElapsedSeconds = (startTime, startPause, endPause) => {
    const startDate = new Date(startTime);
    const now = new Date();
    const breakTime = startPause
      ? (endPause ? new Date(endPause) : now) - new Date(startPause)
      : null;
    const elapsedMs = now - startDate - (breakTime || 0);
    return Math.floor(elapsedMs / 1000);
  };

  const MySwal = withReactContent(Swal);

  const showWorkLocationAlert = () => {
    if (!timer.workLocation) {
      MySwal.fire({
        title: '¡Bienvenido!',
        text: '¿Desde dónde vas a trabajar hoy?',
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Casa',
        denyButtonText: 'Oficina',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#00A3E0',
        denyButtonColor: '#00A3E0',
        cancelButtonColor: '#d33',
        customClass: {
          confirmButton: 'swal-button-custom',
          cancelButton: 'swal-button-custom',
          denyButton: 'swal-button-custom',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          startTimer('remote');
        } else if (result.dismiss === Swal.DismissReason.deny) {
          startTimer('office');
        }
      });
    } else {
      const location = timer.workLocation === 'office' ? 'OFICINA' : 'CASA';
      MySwal.fire({
        title: '¡Bienvenido!',
        html: `¿Estás seguro de comenzar tu jornada desde <b style="color: #00A3E0;">${location}</b>?`,
        showCancelButton: true,
        confirmButtonColor: '#00A3E0',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comenzar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          startTimer(timer.workLocation);
        }
      });
    }
  };

  // Función para iniciar el cronómetro
  const startTimer = async (workLocation) => {
    try {
      if (!timer.isRunning && !intervalRef.current) {
        const now = new Date();
        if (!timeLog) {
          const newTimeLog = await startTimeLog(workLocation);
          setStartTime(now.toLocaleTimeString());
          setTimeLog(newTimeLog);
        } else {
          setResumeTime(now.toLocaleTimeString());
        }

        intervalRef.current = setInterval(() => {
          setTimer((prevTimer) => {
            let newSeconds = prevTimer.seconds + 1;
            let newMinutes = prevTimer.minutes;
            let newHours = prevTimer.hours;

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
              workLocation: workLocation,
            };
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error starting timer:', error);
      MySwal.fire({
        title: 'Error al iniciar el tiempo',
        text: 'No se pudo iniciar el registro de tiempo. Por favor, inténtalo de nuevo.',
        icon: 'error',
      });
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
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (intervalRef.current) {
          try {
            await updateTimeLogByAction(timeLog.id, 'pause');
            const now = new Date();
            setPauseTime(now.toLocaleTimeString());
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setTimer((prevTimer) => ({
              ...prevTimer,
              isRunning: false,
            }));
          } catch (error) {
            MySwal.fire({
              title: 'Error al pausar el tiempo',
              text: 'No se pudo pausar el registro de tiempo. Por favor, inténtalo de nuevo.',
              icon: 'error',
            });
          }
        }
      }
    });
  };

  // Función para reanudar el cronómetro
  const resumeTimer = () => {
    if (timeLog && timer.workLocation) {
      MySwal.fire({
        title: '¿Estás listo para continuar?',
        text: `Continuarás trabajando desde ${timer.workLocation === 'office' ? 'la oficina' : 'casa'}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#00A3E0',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateTimeLogByAction(timeLog.id, 'resume');
            startTimer(timer.workLocation);
          } catch (error) {
            MySwal.fire({
              title: 'Error al reanudar el tiempo',
              text: 'No se pudo reanudar el registro de tiempo. Por favor, inténtalo de nuevo.',
              icon: 'error',
            });
          }
        }
      });
    } else {
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
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateTimeLogByAction(timeLog.id, 'end');
          setTimeLog(null);
          const now = new Date();
          setStopTime(now.toLocaleTimeString());
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          totalSecondsRef.current = 0;
          setStartTime(null);
          setPauseTime(null);
          setResumeTime(null);

          setTimer({
            seconds: 0,
            minutes: 0,
            hours: 0,
            isRunning: false,
            workLocation: null,
          });

          useTimeStore.setState((state) => ({
            ...state,
            actions: [],
          }));
        } catch (error) {
          MySwal.fire({
            title: 'Error al detener el tiempo',
            text: 'No se pudo detener el registro de tiempo. Por favor, inténtalo de nuevo.',
            icon: 'error',
          });
        }
      }
    });
  };

  // Limpiar intervalo al desmontar el componente
  useEffect(() => {
    const fetchActiveTimeLog = async () => {
      try {
        const activeTimeLog = await getActiveTimeLog();
        let formattedStartTime, formattedStartPause, formattedEndPause;

        if (activeTimeLog) {
          setTimeLog(activeTimeLog);
          setStartTime(activeTimeLog.startTime);
          formattedStartTime = `${activeTimeLog.date}T${activeTimeLog.startTime}`;

          if (activeTimeLog.startPause) {
            setPauseTime(activeTimeLog.startPause);
            formattedStartPause = `${activeTimeLog.date}T${activeTimeLog.startPause}`;
          }
          if (activeTimeLog.endPause) {
            setResumeTime(activeTimeLog.endPause);
            formattedEndPause = `${activeTimeLog.date}T${activeTimeLog.endPause}`;
          }

          const elapsedSeconds = calculateElapsedSeconds(
            formattedStartTime,
            formattedStartPause,
            formattedEndPause
          );

          totalSecondsRef.current = elapsedSeconds;
          const hours = Math.floor(elapsedSeconds / 3600);
          const minutes = Math.floor((elapsedSeconds % 3600) / 60);
          const seconds = elapsedSeconds % 60;

          setTimer((prevTimer) => ({
            ...prevTimer,
            hours,
            minutes,
            seconds,
            isRunning: activeTimeLog.status === 'working',
            workLocation: activeTimeLog.location,
          }));

          // Iniciar el cronómetro si la jornada está en curso
          if (activeTimeLog.status === 'working') {
            intervalRef.current = setInterval(() => {
              totalSecondsRef.current += 1;
              setTimer((prevTimer) => {
                let newSeconds = prevTimer.seconds + 1;
                let newMinutes = prevTimer.minutes;
                let newHours = prevTimer.hours;

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
                };
              });
            }, 1000);
          }
        }
      } catch (error) {
        console.error('Error fetching active time log:', error);
        MySwal.fire({
          title: 'Error al obtener el registro de tiempo',
          text: 'No se pudo obtener el registro de tiempo. Por favor, inténtalo de nuevo.',
          icon: 'error',
        });
      }
    };

    return () => {
      fetchActiveTimeLog();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progressPercentage = calculateProgressPercentage();
  const circleColor = `rgba(0, 163, 224, ${1 - progressPercentage / 100})`;

  return (
    <div className="flex flex-col items-center bg-primarybg font-mainFont">
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center transition-opacity ${
            timer.workLocation === 'remote' ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() =>
            setTimer(() => ({
              ...timer,
              workLocation: 'remote',
            }))
          }
        >
          <PiHouseLineBold className="text-2xl cursor-pointer" />
        </div>
        <div
          className={`flex items-center transition-opacity ${
            timer.workLocation === 'office' ? 'opacity-100' : 'opacity-50'
          }`}
          onClick={() =>
            setTimer(() => ({
              ...timer,
              workLocation: 'office',
            }))
          }
        >
          <PiBuildingOfficeBold className="text-2xl cursor-pointer" />
        </div>
      </div>
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
                className={`text-primary border border-primary px-6 py-4 rounded ${pauseAction ? 'opacity-50' : 'hover:bg-hoverButton'}`}
                disabled={pauseAction}
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
              disabled={!timeLog}
              className={`text-primary border border-primary px-6 py-4 rounded ${!timeLog ? 'opacity-50' : 'hover:bg-hoverButton'}`}
            >
              <FaStop />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
