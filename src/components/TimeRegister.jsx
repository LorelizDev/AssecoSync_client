import { useTimeStore } from '../context/timeStore';
import { useEffect } from 'react';

export const TimeRegister = () => {
  const actions = useTimeStore((state) => state.actions);
  const journeyEndMessage = useTimeStore((state) => state.journeyEndMessage);
  const clearJourneyEndMessage = useTimeStore((state) => state.clearJourneyEndMessage);

  // Opcional: limpiar el mensaje después de unos segundos
  useEffect(() => {
    if (journeyEndMessage) {
      const timer = setTimeout(() => {
        clearJourneyEndMessage();
      }, 10000); // Desaparece después de 5 segundos

      return () => clearTimeout(timer);
    }
  }, [journeyEndMessage, clearJourneyEndMessage]);

  return (
    <div className="flex flex-col items-center bg-secondarybg p-4">
      <h3 className="text-xl font-bold mb-4">Registro de Tiempos</h3>
      
      {journeyEndMessage && (
        <div className="w-full bg-red-200 text-red-700 p-3 rounded mb-4 text-center">
          {journeyEndMessage}
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="px-4 py-2">Acción</th>
            <th className="px-4 py-2">Hora</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="px-4 py-2">{action.type}</td>
              <td className="px-4 py-2">{action.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};