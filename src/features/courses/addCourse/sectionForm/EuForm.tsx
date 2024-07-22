import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useState } from 'react';
import SectionTabs from './sectionTabs/SectionTabs';
import { Button } from '@mui/material';
import { t } from 'i18next';
import useEducationalUnitForm from './useEducationalUnitForm';
import { EUFormProps } from './EuForm.type';
import { Add } from '@mui/icons-material';
import EUnit from './module/EUnit';

function EducationalUnitForm({
  files,
  euFormMethods,
  isEditMode,
  isFetching,
  setFiles,
  handleAddEU,
}: EUFormProps) {
  const {
    fields,
    handleAddAnswer,
    handleAddEducationalUnit,
    handleAddQuestion,
    handleRemoveAnswer,
    handleRemoveEducationalUnit,
    handleRemoveQuestion,
    handleRemoveQuiz,
  } = useEducationalUnitForm({ euFormMethods });

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const addNewBasicEducationalUnit = () => {
    handleAddEducationalUnit('basic');
    setActiveTab(fields.length - 1);
  };
  const addNewIntermediateEducationalUnit = () => {
    handleAddEducationalUnit('intermediate');
    setActiveTab(fields.length - 1);
  };
  const addNewAdvancedEducationalUnit = () => {
    handleAddEducationalUnit('advanced');
    setActiveTab(fields.length - 1);
  };

  const handleRemoveSection = (index: number) => {
    handleRemoveEducationalUnit(index);
    setActiveTab(fields.length - 2);
  };

  if (isFetching) {
    return <FallbackLoader />;
  }

  return (
    // <FormProvider {...euFormMethods}>
    //   <Accordion defaultExpanded>
    //     <AccordionSummary
    //       expandIcon={
    //         <Tooltip title={t('course.expand_more')}>
    //           <ExpandMoreIcon />
    //         </Tooltip>
    //       }
    //       aria-controls="panel1-content"
    //       id="panel1-header"
    //     >
    //       <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
    //         <Typography variant="h3">{t('course.basic_educational_unit')}:</Typography>
    //       </Stack>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Stack pb={1} spacing={3}>
    //         <SectionTabs
    //           sections={fields}
    //           activeTab={activeTab}
    //           handleChange={handleChangeTab}
    //           onAddNewSection={addNewBasicEducationalUnit}
    //         />
    //         <Grid container spacing={3}>
    //           <Grid item xs={12}>
    //             <Box mb={2}>
    //               <Tooltip title={t('course.new_educational_unit')}>
    //                 <Button onClick={addNewBasicEducationalUnit} sx={{ padding: 0 }}>
    //                   <Typography variant="h3">{t('course.new_basic_educational_unit')}</Typography>
    //                   <AddCircleOutlineIcon />
    //                 </Button>
    //               </Tooltip>
    //             </Box>
    //             <Box sx={{ border: '1px solid #000', borderRadius: 3 }} p={2}>
    //               <Stack
    //                 mb={2}
    //                 direction="row"
    //                 width="100%"
    //                 alignItems="flex-start"
    //                 justifyContent="space-between"
    //               >
    //                 <Stack direction="row" alignItems="center" spacing={2} width={'40%'}>
    //                   <Typography variant="h3" sx={{ pt: 1, width: '50%' }}>
    //                     {t('course.eu_title')}:
    //                   </Typography>

    //                   <CustomTextField config={CREATE_COURSE_FORM_CONFIG.euTitle} />
    //                 </Stack>
    //               </Stack>
    //               <Box mb={2}>
    //                 <Tooltip title={t('course.new_learning_object')}>
    //                   <Button onClick={addNewBasicEducationalUnit} sx={{ padding: 0 }}>
    //                     <Typography variant="h3">{t('course.new_learning_object')}</Typography>
    //                     <AddCircleOutlineIcon />
    //                   </Button>
    //                 </Tooltip>
    //               </Box>
    //               <Box>
    //                 <Stack
    //                   mb={2}
    //                   justifyContent="space-between"
    //                   alignItems="flex-start"
    //                   sx={{ border: '1px solid #e0e0e0', borderRadius: 3, padding: 2 }}
    //                 >
    //                   <Stack
    //                     direction="row"
    //                     justifyContent="center"
    //                     alignItems="center"
    //                     spacing={2}
    //                   >
    //                     <Typography variant="h3" sx={{ pt: 0.3 }}>
    //                       {t('course.lo_object_type')}:
    //                     </Typography>
    //                     <CustomRadioButton
    //                       config={{
    //                         ...CREATE_COURSE_FORM_CONFIG.loType,
    //                       }}
    //                     />
    //                   </Stack>
    //                   <Stack p={1} m={'0  auto'} width={'70%'}>
    //                     {/* <UploadInput
    //                       onChange={handleOnChange}
    //                       onDelete={handleResetPreview}
    //                       preview={preview}
    //                       label={t('')}
    //                     /> */}
    //                   </Stack>
    //                 </Stack>
    //               </Box>
    //             </Box>
    //           </Grid>
    //         </Grid>
    //       </Stack>
    //     </AccordionDetails>
    //   </Accordion>
    // </FormProvider>
    <FormProvider {...euFormMethods}>
      {!isEditMode ? (
        // Basic Educational Unit
        <>
          <Stack p={2} spacing={3}>
            {fields.map((field, index) => (
              <EUnit
                field={field}
                euFormMethods={euFormMethods}
                files={files}
                canDelete={fields.length > 1}
                key={index}
                euIndex={index}
                loIndex={index}
                isEditMode={isEditMode}
                setFiles={setFiles}
                handleAddQuestion={handleAddQuestion}
                handleRemoveQuestion={handleRemoveQuestion}
                handleAddAnswer={handleAddAnswer}
                handleRemoveAnswer={handleRemoveAnswer}
                handleRemoveEu={handleRemoveSection}
                handleRemoveQuiz={handleRemoveQuiz}
                handleAddEuApi={handleAddEU}
              />
            ))}

            <Stack justifyContent={'center'} alignItems={'center'} mt={2}>
              <Button variant="contained" onClick={handleAddEU} startIcon={<Add />}>
                {t('section.add_section')}
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
        <Stack p={2} spacing={3}>
          <SectionTabs
            sections={fields}
            activeTab={activeTab}
            handleChange={handleChangeTab}
            onAddNewSection={addNewBasicEducationalUnit}
          />
          <EUnit
            field={fields[activeTab]}
            euFormMethods={euFormMethods}
            files={files}
            canDelete={fields.length > 1}
            key={fields[activeTab].id}
            euIndex={activeTab}
            loIndex={activeTab}
            isEditMode={isEditMode}
            setFiles={setFiles}
            handleAddQuestion={handleAddQuestion}
            handleRemoveQuestion={handleRemoveQuestion}
            handleAddAnswer={handleAddAnswer}
            handleRemoveAnswer={handleRemoveAnswer}
            handleRemoveEu={handleRemoveSection}
            handleRemoveQuiz={handleRemoveQuiz}
            handleAddEuApi={handleAddEU}
          />
        </Stack>
      )}
    </FormProvider>
  );
}

export default EducationalUnitForm;
