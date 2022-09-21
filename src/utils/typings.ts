import React from 'react';

export interface WithChildren {
  children: React.ReactNode;
}

export type ReactSetState<Type> = React.Dispatch<React.SetStateAction<Type>>;
