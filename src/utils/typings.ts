import React from 'react';

export interface WithChildren {
  children: React.ReactNode;
}

export interface EntityMap<EntityType> {
  ids: string[];
  entities: Record<string, EntityType>;
}
