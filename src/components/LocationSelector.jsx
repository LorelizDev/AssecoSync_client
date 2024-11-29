import { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { PiHouseLineBold } from "react-icons/pi";
import { PiBuildingOfficeBold } from "react-icons/pi";


export const LocationSelector = () => {
    const [isRemote, setIsRemote] = useState(false);
  
    return (
      <div className="flex items-center gap-4">
        {/* Ícono de Casa */}
        <div
          className={`flex items-center transition-opacity ${
            isRemote ? 'opacity-50' : 'opacity-100'
          }`}
        >
        <label className="m-0"/>
          <PiHouseLineBold className="text-2xl" />
          
        </div>
  
        {/* Switch */}
        <FormControlLabel
          control={
            <Switch
              checked={isRemote}
              onChange={() => setIsRemote(!isRemote)}
              color="primary"
            />
          }
        />
  
        {/* Ícono de Oficina */}
        <div
          className={`flex transition-opacity ${
            isRemote ? 'opacity-100' : 'opacity-50'
          }`}
        >
          <PiBuildingOfficeBold className="text-2xl" />
          
        </div>
      </div>
    );
  };