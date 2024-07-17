import { SyntheticEvent, useState } from 'react'
import { Tab } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SectionTabsRoot } from '@features/courses/addCourse/sectionForm/sectionTabs/SectionTabs.style'
import { LearningPathTabsStep } from './LearningPathsTabs.constants'

function LearningPathTabs() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [value, setValue] = useState(0)

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <SectionTabsRoot
      TabIndicatorProps={{ sx: { display: 'none' } }}
      value={value}
      onChange={handleChange}>
      {LearningPathTabsStep.map((tab, index) => (
        <Tab
          value={tab.value}
          key={index}
          label={t(tab.label)}
          onClick={() => navigate(tab.path)}
        />
      ))}
    </SectionTabsRoot>
  )
}

export default LearningPathTabs
