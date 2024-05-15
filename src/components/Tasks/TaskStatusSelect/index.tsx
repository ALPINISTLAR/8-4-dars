import React, { memo } from 'react';
import './styles.css';

interface Type {
  name: string;
}

interface TypeSelectProps {
  types: Type[];
  changeType: (type: Type) => void;
  selected: Type;
}

const TypeSelect: React.FC<TypeSelectProps> = ({ types, changeType, selected }) => (
  <div className="TypeSelect">
    {types.map((type, index) => (
      <button
        key={type.name}
        onClick={() => changeType(type)}
        className={type === selected ? 'active' : ''}
      >
        {type.name}
      </button>
    ))}
  </div>
);

export default memo(TypeSelect);
