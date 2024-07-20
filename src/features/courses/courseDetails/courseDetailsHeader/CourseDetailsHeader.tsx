import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { CourseHeaderProps } from './courseDetails.type'
import { useTranslation } from 'react-i18next'
import {
  HeaderBackgroundImage,
  HeaderDetail,
  HeaderOverlay,
} from './courseDetails.style'
import {
  InstructorAvatar,
  InstructorInfo,
  InstructorJob,
  InstructorTitle,
} from '@features/home/homeCourses/coursesCard/courseCard.style'
import languageIcon from '@assets/logo/languages/language.png'
import peopleIcon from '@assets/logo/people.svg'
import courseIcon from '@assets/logo/icon-01.svg'
import timerIcon from '@assets/logo/timer-icon.svg'
import calendar from '@assets/logo/calendar.png'
import arrow from '@assets/logo/Arrow_east.svg'
import { transformDateTimeFormat } from '@utils/helpers/date.helpers'

const CourseHeader = ({
  title,
  instructorName,
  instructorImage,
  background,
  lessonsCount,
  duration,
  enrolledCount,
  language,
  category,
  startTime,
  endTime,
  teachingType,
}: CourseHeaderProps) => {
  const { t } = useTranslation()

  return (
    <Box position="relative">
      <HeaderBackgroundImage background={background} />

      <HeaderOverlay>
        <InstructorInfo>
          <InstructorAvatar
            src={instructorImage}
            alt={instructorName}
            sx={{ width: 60, height: 60 }}
          />
          <Stack>
            <InstructorTitle sx={{ color: 'white', fontSize: '20px' }}>
              {instructorName}
            </InstructorTitle>
            <InstructorJob sx={{ fontSize: 12, color: 'white' }}>
              {t('course.instructor')}
            </InstructorJob>
          </Stack>
        </InstructorInfo>

        <Typography
          variant="h1"
          sx={{ m: 2, fontSize: '40px', lineHeight: 1.2 }}>
          {title}
        </Typography>

        <HeaderDetail>
          <Stack direction={'row'} spacing={1}>
            <img src={timerIcon} />
            <Typography>{t('course.duration', { duration })}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <img src={peopleIcon} />
            <Typography>
              {t('course.enrolled_students', { count: enrolledCount })}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <img src={courseIcon} />
            <Typography>
              {t('course.number_of_lessons', { count: lessonsCount })}
            </Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <img src={languageIcon} width={25} height={25} />
            <Typography>{t(language)}</Typography>
          </Stack>
          <Stack direction={'row'} spacing={1}>
            <Chip
              label={t(category)}
              variant="filled"
              color="primary"
              size="medium"
            />
          </Stack>
          {teachingType && (
            <Stack direction={'column'} gap={2}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <img src={calendar} width={25} />
                <Typography>
                  {transformDateTimeFormat(Number(startTime))}
                </Typography>
                <img src={arrow} width={50} />
                <img src={calendar} width={25} />
                <Typography>
                  {transformDateTimeFormat(Number(endTime))}
                </Typography>
              </Stack>
              <Button variant="contained" sx={{ width: '150px' }}>
                {teachingType && <Typography>{t(teachingType)}</Typography>}
              </Button>
            </Stack>
          )}
        </HeaderDetail>
      </HeaderOverlay>
    </Box>
  )
}

export default CourseHeader
