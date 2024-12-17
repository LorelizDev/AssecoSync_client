import React, { useState, useEffect } from 'react';
import { fetchTimeLogStatistics } from '../services/statisticsService';
import TimeLogIntervalFilter from '../components/TimeLogIntervalFilter';
import BarChart from '../components/BarChart';
import Sidebar from '../components/Sidebar';
import Swal from 'sweetalert2';

const StatisticsPage = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(15);
  const [field, setField] = useState('startTime');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para obtener los datos de estadísticas
  const fetchData = async () => {
    setIsLoading(true); // Activamos el estado de carga
    setError(null); // Limpiamos errores previos

    try {
      // Llamada a la API para obtener las estadísticas
      const result = await fetchTimeLogStatistics(field, interval);

      // Validamos que los datos recibidos sean correctos
      if (Array.isArray(result) && result.length > 0) {
        setData(result);
      } else {
        setError('No se encontraron datos para mostrar');
      }
    } catch (err) {
      console.error('Error al obtener las estadísticas:', err);
      setError('Ocurrió un error al obtener los datos');
    } finally {
      setIsLoading(false); // Desactivamos el estado de carga
    }
  };

  useEffect(() => {
    fetchData();
  }, [interval, field]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="z-10 hidden md:block md:relative md:w-20 bg-primarybg">
        <Sidebar />
      </div>

      <div className="relative flex-grow md:w-4/5 bg-primarybg">
        <div className="container px-6 py-6">
          <h1 className="text-2xl text-primary font-bold my-5">
            Estadísticas de Horarios
          </h1>
        </div>

        {/* Filtro de intervalo */}
        <div className="w-full px-10">
          <div className="mb-5 mr-5">
            <TimeLogIntervalFilter
              interval={interval}
              setInterval={setInterval}
              field={field}
              setField={setField}
            />
          </div>

          {/* Si hay error, mostrar mensaje */}
          {error && <div className="text-red-500 mb-5">{error}</div>}

          {/* Mostrar el gráfico solo si los datos están disponibles */}
          {isLoading ? (
            <div className="flex justify-center items-center mt-10">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Cargando...</span>
              </div>
            </div>
          ) : (
            <BarChart data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
