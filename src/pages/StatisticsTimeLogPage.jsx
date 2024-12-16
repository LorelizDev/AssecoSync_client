import React, { useState, useEffect } from 'react';
import { fetchTimeLogStatistics } from '../services/statisticsService';
import TimeLogIntervalFilter from '../components/TimeLogIntervalFilter';
import BarChart from '../components/BarChart';
import Sidebar from '../components/Sidebar';

const StatisticsPage = () => {
  const [data, setData] = useState([]);
  const [interval, setInterval] = useState(15);
  const [field, setField] = useState('startTime');

  const fetchData = async () => {
    const result = await fetchTimeLogStatistics(field, interval);
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, [interval, field]);

  return (
    <div
      className="flex flex-col md:flex-row
    h-screen"
    >
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
        <div className="w-full px-10">
          <div className="mb-5 mr-5">
            <TimeLogIntervalFilter
              interval={interval}
              setInterval={setInterval}
              field={field}
              setField={setField}
            />
          </div>
          <BarChart data={data} />
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
