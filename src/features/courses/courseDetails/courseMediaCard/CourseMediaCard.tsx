import { Stack, Typography } from '@mui/material'
import { CourseCardMediaProps } from './courseMediaCard.type'
import { StyledCardMedia, StyledDiscountedPrice } from './courseCardMedia.style'
import { CardRoot } from '@pages/courses/courses.style'
import { useTranslation } from 'react-i18next'
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables'
import {
  BuyButton,
  CourseImageContainer,
  DiscountLabel,
  PriceLabel,
} from '@features/home/homeCourses/coursesCard/courseCard.style'
import { getUserFromLocalStorage } from '@utils/localStorage/storage'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@config/constants/paths'

const CourseMediaCard = ({
  image,
  coursePrice,
  discount,
  isPaid,
  isEnrolled,
  isCompleted,
  handleEnroll,
  handleCompleteCourse,
  handleBuyCourse,
}: CourseCardMediaProps) => {
  const user = !!getUserFromLocalStorage()
  const navigate = useNavigate()
  const { t } = useTranslation()
  return (
    <CardRoot>
      <CourseImageContainer>
        <StyledCardMedia src={image} alt="Course image" />
        {discount &&
        discount !== GLOBAL_VARIABLES.FREE_CURRENCY &&
        coursePrice !== discount ? (
          <DiscountLabel>
            <Typography fontSize="20px" fontWeight="bold">
              {coursePrice}
            </Typography>
            <StyledDiscountedPrice>{discount}</StyledDiscountedPrice>
          </DiscountLabel>
        ) : (
          <PriceLabel>
            <Typography variant="body2" fontWeight="bold">
              {!isPaid ? t('home.free') : coursePrice}
            </Typography>{' '}
          </PriceLabel>
        )}
      </CourseImageContainer>
      <Stack p={2} sx={{ zIndex: 999 }}>
        {!isEnrolled ? (
          <BuyButton
            onClick={
              user
                ? !isPaid
                  ? handleEnroll
                  : handleBuyCourse
                : () => navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`)
            }
            variant="outlined"
            color="primary">
            {!isPaid ? t('home.enroll_button') : t('home.buy_button')}
          </BuyButton>
        ) : (
          !isCompleted && (
            <BuyButton
              onClick={
                user
                  ? handleCompleteCourse
                  : () => navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`)
              }
              variant="outlined"
              color="primary">
              {t('course.complete_course')}
            </BuyButton>
          )
        )}
      </Stack>
    </CardRoot>
  )
}
export default CourseMediaCard
