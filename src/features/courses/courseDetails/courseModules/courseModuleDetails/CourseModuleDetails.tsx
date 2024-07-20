import  { useState, useEffect } from 'react'
import CustomMediaDialog from '@components/dialogs/customMediaDialog/CustomMediaDialog'
import { CourseMediaDetailsProps } from './CourseMediaDetails.type'
import { Stack, Typography } from '@mui/material'
import { GREY } from '@config/colors/colors'
import {
  renderMediaComponent,
  renderMediaThumbnail,
} from '@utils/helpers/media.helpers'

function CourseModuleDetails({
  open,
  scroll,
  section,
  isEnrolled,
  onClose,
  currentMediaIndex: initialMediaIndex,
}: CourseMediaDetailsProps & { currentMediaIndex: number }) {
  const [activeMediaIndex, setActiveMediaIndex] = useState(initialMediaIndex)

  useEffect(() => {
    setActiveMediaIndex(initialMediaIndex)
  }, [initialMediaIndex])

  const handleMediaClick = (index: number) => {
    setActiveMediaIndex(index)
  }

  return (
    <CustomMediaDialog
      title={section.title}
      open={open}
      onClose={onClose}
      scroll={scroll}>
      {section.media && renderMediaComponent(section.media[activeMediaIndex])}
      <Stack direction="column" spacing={4}>
        {section?.media?.map((mediaItem, index) => (
          <Stack
            key={mediaItem.id}
            p={2}
            onClick={() => handleMediaClick(index)}
            sx={{
              cursor: 'pointer',
              backgroundColor:
                index === activeMediaIndex ? GREY.light : 'transparent',
            }}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
              {isEnrolled && renderMediaThumbnail(mediaItem)}
              <Typography>{mediaItem.title || `Media ${index + 1}`}</Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </CustomMediaDialog>
  )
}

export default CourseModuleDetails
