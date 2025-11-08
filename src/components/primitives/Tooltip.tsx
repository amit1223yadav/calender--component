import React from 'react';

interface Props {
  children: React.ReactNode;
  label: string;
}

export const Tooltip: React.FC<Props> = ({children, label}) => {
  return (
    <span className="relative inline-block">
      {children}
      <span role="tooltip" className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white text-xs px-2 py-1 rounded">
        {label}
      </span>
    </span>
  );
};
