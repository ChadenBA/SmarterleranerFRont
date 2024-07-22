import { Stack } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useState } from 'react';
// import SectionTabs from './sectionTabs/SectionTabs';
// import { Button } from '@mui/material';
import { t } from 'i18next';
import useEducationalUnitForm from './useEducationalUnitForm';
import { EUFormProps } from './EuForm.type';
// import { Add } from '@mui/icons-material';
import EUnit from './module/EUnit';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';

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
    handleAddLearningObject,
  } = useEducationalUnitForm({ euFormMethods });

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const addNewEducationalUnit = (type: EducationalUnitEnum, index: number) => {
    handleAddEducationalUnit(type, index);
    setActiveTab(fields.length - 1);
  };

  const handleRemoveSection = (index: number) => {
    handleRemoveEducationalUnit(index);
    setActiveTab(fields.length - 2);
  };

  if (isFetching) {
    return <FallbackLoader />;
  }

  const handleEuType = (type: string) => {
    switch (type) {
      case EducationalUnitEnum.BASIC:
        return t('eu.basic_eu');
      case EducationalUnitEnum.INTERMEDIATE:
        return t('eu.intermediate_eu');
      case EducationalUnitEnum.ADVANCED:
        return t('eu.advanced_eu');
      default:
        return t('eu.basic_eu');
    }
  };

  const canDeleteEu = (type: string) => {
    let count = 0;
    fields.forEach((field) => {
      if (field.type === type) {
        count++;
      }
    });
    return count > 1;
  };

  return (
    <FormProvider {...euFormMethods}>
      {!isEditMode ? (
        <>
          <Stack p={2} spacing={3}>
            {fields.map((field, index) => (
              <EUnit
                field={field}
                euFormMethods={euFormMethods}
                files={files}
                canDelete={canDeleteEu(field.type)}
                key={index}
                euIndex={index}
                loIndex={index}
                isEditMode={isEditMode}
                setFiles={setFiles}
                handleAddQuestion={handleAddQuestion}
                handleRemoveQuestion={handleRemoveQuestion}
                handleAddAnswer={handleAddAnswer}
                handleRemoveAnswer={handleRemoveAnswer}
                handleRemoveEu={() => handleRemoveSection(index)}
                handleAddEuApi={handleAddEU}
                handleAddLearningObject={() => handleAddLearningObject(index)}
                type={handleEuType(field.type)}
                onAddEu={() => addNewEducationalUnit(field.type as any, index)}
              />
            ))}
          </Stack>
        </>
      ) : (
        <Stack p={2} spacing={3}>
          {/* <SectionTabs
            sections={fields}
            activeTab={activeTab}
            handleChange={handleChangeTab}
            onAddNewSection={handleAddLearningObject}
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
          /> */}
        </Stack>
      )}
    </FormProvider>
  );
}

export default EducationalUnitForm;
