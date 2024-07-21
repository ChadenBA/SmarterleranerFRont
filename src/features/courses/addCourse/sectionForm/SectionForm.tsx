import { SectionFormProps } from './SectionForm.type';
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Stack,
  Grid,
  Box,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormProvider } from 'react-hook-form';
import useSectionForm from './useSectionForm';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useState } from 'react';
import SectionTabs from './sectionTabs/SectionTabs';
import CustomTextField from '@components/Inputs/customTextField/CustomTextField';
import UploadInput from '@components/Inputs/uploadInput/UploadInput';
import { CREATE_COURSE_FORM_CONFIG } from '../courseForm/CourseForm.constants';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { t } from 'i18next';
import CustomRadioButton from '@components/Inputs/customRadioButton/CustomRadioButton';
import useUploadFile from 'src/hooks/useUploadFile';
import { generatePictureSrc } from '@utils/helpers/string.helpers';

function EducationalUnit({
  files,
  educationalUnitFormMethod,
  isEditMode,
  isFetching,
  setFiles,
  handleAddSection,
}: SectionFormProps) {
  const {
    fields,
    handleAddAnswer,
    handleAddModule,
    handleAddQuestion,
    handleRemoveAnswer,
    handleRemoveModule,
    handleRemoveQuestion,
    handleAddExternalUrl,
    handleRemoveExternalUrl,
    handleRemoveQuiz,
    onDrop,
  } = useSectionForm({ educationalUnitFormMethod });

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const addNewSection = () => {
    setActiveTab(fields.length);
    handleAddModule();
  };

  const handleRemoveSection = (index: number) => {
    handleRemoveModule(index);
    setActiveTab(fields.length - 2);
  };

  const { preview, handleOnChange, handleResetPreview } = useUploadFile({
    educationalUnitFormMethod,
    fieldName: 'courseMedia',
    initPreview: generatePictureSrc(undefined) || null,
    index: 0,
    id: 0,
  });

  if (isFetching) {
    return <FallbackLoader />;
  }

  return (
    <FormProvider {...educationalUnitFormMethod}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={
            <Tooltip title={t('course.expand_more')}>
              <ExpandMoreIcon />
            </Tooltip>
          }
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Typography variant="h3">{t('course.basic_educational_unit')}:</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack pb={1} spacing={3}>
            <SectionTabs
              sections={fields}
              activeTab={activeTab}
              handleChange={handleChangeTab}
              onAddNewSection={addNewSection}
            />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Tooltip title={t('course.new_educational_unit')}>
                    <Button onClick={addNewSection} sx={{ padding: 0 }}>
                      <Typography variant="h3">{t('course.new_basic_educational_unit')}</Typography>
                      <AddCircleOutlineIcon />
                    </Button>
                  </Tooltip>
                </Box>
                <Box sx={{ border: '1px solid #000', borderRadius: 3 }} p={2}>
                  <Stack
                    mb={2}
                    direction="row"
                    width="100%"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <Stack direction="row" alignItems="center" spacing={2} width={'40%'}>
                      <Typography variant="h3" sx={{ pt: 1, width: '50%' }}>
                        {t('course.eu_title')}:
                      </Typography>

                      <CustomTextField config={CREATE_COURSE_FORM_CONFIG.euTitle} />
                    </Stack>
                  </Stack>
                  <Box mb={2}>
                    <Tooltip title={t('course.new_learning_object')}>
                      <Button onClick={addNewSection} sx={{ padding: 0 }}>
                        <Typography variant="h3">{t('course.new_learning_object')}</Typography>
                        <AddCircleOutlineIcon />
                      </Button>
                    </Tooltip>
                  </Box>
                  <Box>
                    <Stack
                      mb={2}
                      justifyContent="space-between"
                      alignItems="flex-start"
                      sx={{ border: '1px solid #e0e0e0', borderRadius: 3, padding: 2 }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <Typography variant="h3" sx={{ pt: 0.3 }}>
                          {t('course.lo_object_type')}:
                        </Typography>
                        <CustomRadioButton
                          config={{
                            ...CREATE_COURSE_FORM_CONFIG.loType,
                          }}
                        />
                      </Stack>
                      <Stack p={1} m={'0  auto'} width={'70%'}>
                        <UploadInput
                          onChange={handleOnChange}
                          onDelete={handleResetPreview}
                          preview={preview}
                          label={t('')}
                        />
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </FormProvider>
  );
}

export default EducationalUnit;
