import React from 'react';
import { BiFilterAlt } from 'react-icons/bi';

const TimeLogIntervalFilter = ({ interval, setInterval, field, setField }) => {
  const handleIntervalChange = (e) => {
    setInterval(Number(e.target.value));
  };

  const handleFieldChange = (e) => {
    setField(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center bg-white border rounded-lg w-full px-3 justify-between">
      <div className="flex items-center w-full md:w-auto p-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-full mr-2">
          <BiFilterAlt />
        </div>
        <label htmlFor="field" className="text-sm font-medium text-[#1D1D1D] mr-2">Filtrar por: </label>
        <select id="field" value={field} onChange={handleFieldChange} className="border rounded p-1 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
          <option value="startTime">Inicio de jornada</option>
          <option value="endTime">Fin de jornada</option>
          <option value="startPause">Inicio de pausa</option>
          <option value="endPause">Fin de pausa</option>
        </select>
      </div>
      <div className="flex items-center w-full md:w-auto p-2">
        <label htmlFor="interval" className="text-sm font-medium text-[#1D1D1D] mr-2">Intervalo de tiempo: </label>
        <select id="interval" value={interval} onChange={handleIntervalChange} className="border rounded p-1 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
          <option value={5}>5 minutos</option>
          <option value={10}>10 minutos</option>
          <option value={15}>15 minutos</option>
          <option value={30}>30 minutos</option>
          <option value={60}>1 hora</option>
        </select>
      </div>
    </div>
  );
};

export default TimeLogIntervalFilter;
