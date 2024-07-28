import { FieldArrayWithId } from 'react-hook-form';
import { FormValues } from '../module/Eu.type';
import { SyntheticEvent } from 'react';

export interface SectionTabsProps {
  activeEu: number;
  eu: FieldArrayWithId<FormValues, 'eu', 'id'>[];
  handleChange: (_: SyntheticEvent, newValue: number) => void;
  onAddNewEu: (index: number) => void;
  setActiveEu?: (_: number) => void;
  setSelectedEu: (id: number) => void;
}
