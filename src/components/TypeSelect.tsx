import React from 'react';
import './TypeSelect.css';

interface Type {
  name: string;
  time: number;
}

interface TypeSelectProps {
  types: Type[];
  changeType: (type: Type) => void;
  selected: Type;
}

const TypeSelect: React.FC<TypeSelectProps> = ({ types, changeType, selected }) => (
  <div className="TypeSelect">
    {types.map((type) => (
      <button
        key={type.name}
        onClick={() => changeType(type)}
        className={type.name === selected.name ? 'active' : ''}
      >
        {type.name}
      </button>
    ))}
  </div>
);

export default React.memo(TypeSelect);
