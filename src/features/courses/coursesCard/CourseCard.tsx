import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Divider, Stack, Tooltip, Typography } from '@mui/material';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

import { CourseCardProps } from './courseCard.type';
import {
  BuyButton,
  CourseCardContainer,
  CourseContent,
  CourseImage,
  CourseImageContainer,
  CourseTitle,
} from './courseCard.style';
import { PATHS } from '@config/constants/paths';
import LabelWithIcon from '@components/labelWithIcon/LabelWithIcon';
import { GLOBAL_VARIABLES } from '@config/constants/globalVariables';
import { DateRange, ToggleOnOutlined } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import { useState } from 'react';
import CustomDialogActions from '@components/dialogs/customDialogActions/CustomDialogActions';
import { GREY } from '@config/colors/colors';
import { useAppDispatch } from '@redux/hooks';
import { showError, showSuccess } from '@redux/slices/snackbarSlice';
import {
  useDeleteCourseMutation,
  usePutCourseActiveMutation,
  useSetCourseOfflineMutation,
  useSetCourseOnlineMutation,
} from '@redux/apis/courses/coursesApi';
import trash from '@assets/logo/icon-trash.svg';
import { getUserFromLocalStorage } from '@utils/localStorage/storage';
// import { IError } from 'types/interfaces/Error';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import avert from '@assets/images/avert.png';
const CourseCard = ({
  id,
  image,
  courseTitle,
  isActive,
  isOffline,
  learningObjectsCount,
  educationaUnitsCount,
  createdAt,
  isAdmin,
  isEnrolled,
  width,
  navigateToEditCoursePage,
}: CourseCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const [openAvert, setOpenAvert] = useState(false);

  const [deleteCourse] = useDeleteCourseMutation();
  const [putCourseActive] = usePutCourseActiveMutation();
  const [setCourseOffline] = useSetCourseOfflineMutation();
  const [setCourseOnline] = useSetCourseOnlineMutation();
  // const [enrollCourse] = useEnrollCourseMutation();

  const handleDeleteCourse = async (id: number) => {
    try {
      deleteCourse(id).unwrap();
      dispatch(showSuccess(t('course.delete_course_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    } finally {
      setOpen(false);
    }
  };

  const handlePutCourseActive = async (id: number) => {
    try {
      await putCourseActive(id).unwrap();
      dispatch(showSuccess(t('course.active_course_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    } finally {
      setOpenAvert(false);
    }
  };

  const navigateToCourseDetailPage = (id: number) => {
    return navigate(`${PATHS.COURSES.ROOT}/${id}`);
  };

  // const handleEnroll = async (id: number) => {
  //   try {
  //     await enrollCourse(id).unwrap();
  //     dispatch(showSuccess(t('course.enroll_course_success')));
  //   } catch (error) {
  //     if ((error as IError).status === 403) {
  //       dispatch(showError(t('errors.forbidden_error')));
  //     } else {
  //       dispatch(showError(t('errors.general_error')));
  //     }
  //   }
  // };

  const handleButtonClick = () => {
    if (!user) {
      navigate(`/${PATHS.AUTH.ROOT}/${PATHS.AUTH.LOGIN}`);
      return;
    }
    if (!isEnrolled) {
      //  handleEnroll(id);
    }
  };

  const handleSetCourseOffline = async (id: number) => {
    try {
      await setCourseOffline(id).unwrap();
      dispatch(showSuccess(t('course.offline_course_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    }
  };
  const handleSetCourseOnline = async (id: number) => {
    try {
      await setCourseOnline(id).unwrap();
      dispatch(showSuccess(t('course.online_course_success')));
    } catch (error) {
      dispatch(showError(t('errors.general_error')));
    }
  };

  const user = !!getUserFromLocalStorage();

  return (
    <CourseCardContainer width={width || '55vh'}>
      <CourseImageContainer onClick={() => !isAdmin && navigateToCourseDetailPage(id)}>
        <CourseImage src={image} alt={courseTitle} />
      </CourseImageContainer>

      <CourseContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mr={3}>
          <LabelWithIcon label={createdAt} icon={<DateRange />} />
        </Stack>
        <Tooltip title={courseTitle} placement="top">
          <CourseTitle variant="h3">{courseTitle}</CourseTitle>
        </Tooltip>

        <LabelWithIcon
          label={t('course.number_of_eu', { count: educationaUnitsCount })}
          icon={<MenuBookOutlinedIcon />}
        />

        <LabelWithIcon
          label={t('course.number_of_lo', { count: learningObjectsCount })}
          icon={<MenuBookOutlinedIcon />}
        />
        <Divider />

        {!isAdmin && !(Number(isEnrolled) === 1) ? (
          <Stack alignItems="flex-end" sx={{ zIndex: 999 }}>
            <BuyButton onClick={handleButtonClick} variant="outlined" color="primary">
              {!isEnrolled ? t('home.enroll_button') : GLOBAL_VARIABLES.EMPTY_STRING}
            </BuyButton>
          </Stack>
        ) : (
          <Stack
            justifyContent={'space-between'}
            direction={'row'}
            p={1}
            sx={{ cursor: 'pointer' }}
          >
            {isAdmin && (
              <>
                {Number(isActive) === 0 && (
                  <>
                    <LabelWithIcon
                      onClick={() => navigateToEditCoursePage && navigateToEditCoursePage(id)}
                      label={t('common.edit')}
                      icon={<EditNoteOutlinedIcon />}
                    />
                    <LabelWithIcon
                      onClick={() => setOpen(true)}
                      label={t('common.delete')}
                      icon={<DeleteOutlineOutlinedIcon />}
                    />
                    <LabelWithIcon
                      onClick={() => setOpenAvert(true)}
                      label={t('common.active')}
                      icon={<ToggleOnOutlined />}
                    />
                  </>
                )}

                {Number(isActive) === 1 && Number(isOffline) === 0 && (
                  <LabelWithIcon
                    onClick={() => handleSetCourseOffline(id)}
                    label={t('common.offline')}
                    icon={<VisibilityOffOutlinedIcon />}
                  />
                )}

                {Number(isActive) === 1 && Number(isOffline) === 1 && (
                  <LabelWithIcon
                    onClick={() => handleSetCourseOnline(id)}
                    label={t('common.online')}
                    icon={<VisibilityOutlinedIcon />}
                  />
                )}
              </>
            )}
          </Stack>
        )}
        <CustomDialogActions
          open={open}
          onAccept={() => handleDeleteCourse(id)}
          onClose={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        >
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={trash} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('course.delete_course')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('course.delete_course_confirm')}
            </Typography>
          </Stack>
        </CustomDialogActions>
        <CustomDialogActions
          open={openAvert}
          onAccept={() => handlePutCourseActive(id)}
          onClose={() => setOpenAvert(false)}
          onCancel={() => setOpenAvert(false)}
        >
          <Stack direction={'column'} spacing={1} alignItems={'center'}>
            <img src={avert} width={100} />
            <Typography color={GREY.main} variant="h1" fontWeight={'medium'}>
              {t('course.avert')}
            </Typography>
            <Typography variant="h6" color={GREY.main}>
              {t('course.avert_confirm')}
            </Typography>
          </Stack>
        </CustomDialogActions>
      </CourseContent>
    </CourseCardContainer>
  );
};

export default CourseCard;
