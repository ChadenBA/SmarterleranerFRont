import { AddNewSectionIcon, SectionTabsRoot } from './SectionTabs.style';
import { SectionTabsProps } from './SectionTabs.type';
import { Stack, Tab, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

function SectionTabs({ eu, activeEu, handleChange, onAddNewEu, setSelectedEu }: SectionTabsProps) {
  const { t } = useTranslation();
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <SectionTabsRoot
        value={activeEu}
        onChange={handleChange}
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ sx: { display: 'none' } }}
      >
        {eu.map((e) => (
          <Tab key={e.id} label={e.title} onClick={() => setSelectedEu(e.id)} />
        ))}
      </SectionTabsRoot>
      <Tooltip title={t('section.add_section')}>
        <AddNewSectionIcon onClick={() => onAddNewEu(eu[0]?.type, activeEu, true)} />
      </Tooltip>
    </Stack>
  );
}

export default SectionTabs;
