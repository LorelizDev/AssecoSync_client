import React from 'react';
import Input from './Input';
import Button from './Button';

const ModalForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  formData,
  handleInputChange,
  leaveRequestTypes,
  excludeVacation = false, // Excluir vacaciones si es necesario
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={onSubmit}>
          <Input
            label="Fecha de inicio"
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Fecha de fin"
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            required
          />

          {/* Mostrar el selector de tipo de ausencia solo si no es una solicitud de vacaciones */}
          {!excludeVacation && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de ausencia
              </label>
              <select
                name="type_id"
                value={formData.type_id}
                onChange={handleInputChange}
                className="mt-1 block w-full h-[45px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-400 focus:border-blue-400 transition"
                required
              >
                <option value="">Seleccione un tipo</option>
                {leaveRequestTypes
                  .filter((type) => type.type !== 'Vacaciones') // Excluir "Vacaciones" si es una solicitud de ausencia
                  .map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.type}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            placeholder="Detalles de la ausencia"
            className="mt-2 w-full px-3 py-2 border rounded-md"
          />
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={onClose}
            >
              Cancelar
            </button>
            <Button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
