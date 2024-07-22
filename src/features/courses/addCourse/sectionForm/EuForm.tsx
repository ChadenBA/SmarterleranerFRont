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
    handleAddLearningObject,
  } = useEducationalUnitForm({ euFormMethods });

  console.log('fields', fields);

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const addNewBasicEducationalUnit = () => {
    handleAddEducationalUnit('basic');
    setActiveTab(fields.length - 1);
  };

  const addNewEducationalUnit = (type: 'basic' | 'intermediate' | 'advanced', index: number) => {
    console.log('type', type, 'index', index);
    handleAddEducationalUnit(type, index);
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

  const handleEuType = (type: string) => {
    switch (type) {
      case 'BASIC':
        return t('eu.basic_eu');
      case 'INTERMEDIATE':
        return t('eu.intermediate_eu');
      case 'ADVANCED':
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
        // Basic Educational Unit
        <>
          <Stack p={2} spacing={3}>
            {fields.map(
              (field, index) => (
                console.log('fiedddld', field),
                (
                  <EUnit
                    field={field}
                    euFormMethods={euFormMethods}
                    files={files}
                    canDelete={canDeleteEu(field.type)}
                    key={field.id}
                    euIndex={index}
                    loIndex={index}
                    isEditMode={isEditMode}
                    setFiles={setFiles}
                    handleAddQuestion={handleAddQuestion}
                    handleRemoveQuestion={handleRemoveQuestion}
                    handleAddAnswer={handleAddAnswer}
                    handleRemoveAnswer={handleRemoveAnswer}
                    handleRemoveEu={() => handleRemoveSection(index)}
                    handleRemoveQuiz={handleRemoveQuiz}
                    handleAddEuApi={handleAddEU}
                    handleAddLearningObject={() => handleAddLearningObject(index)}
                    type={handleEuType(field.type)}
                    onAddEu={() => addNewEducationalUnit(field.type, index)}
                  />
                )
              ),
            )}
          </Stack>
          {/* <Stack p={2} spacing={3}>
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
                type={t('eu.intermediate_eu')}
                onAddEu={addNewIntermediateEducationalUnit}
              />
            ))}
          </Stack>
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
                type={t('eu.advanced_eu')}
                onAddEu={addNewAdvancedEducationalUnit}
              />
            ))}
          </Stack> */}
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
