export interface EuHeadProps {
  expanded: boolean;
  index: number;
  title: string;
  canDelete: boolean;
  isNewEu: boolean;
  onChangeExpanded: () => void;
  onCreateEu?: () => void;
  onDeleteEu?: () => void;
  onUpdateEu?: () => void;
}
