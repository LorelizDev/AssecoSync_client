import { useTimeStore } from '../context/timeStore';

export const TimeRegister = () => {
  const actions = useTimeStore((state) => state.actions);

  return (
    <div className="flex flex-col items-center bg-secondarybg p-4">
      <h3 className="text-xl font-bold mb-4">Registro de Tiempos</h3>
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
