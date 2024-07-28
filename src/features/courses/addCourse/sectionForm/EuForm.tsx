import { Stack } from '@mui/material';
import { FieldArrayWithId, FormProvider } from 'react-hook-form';
import FallbackLoader from '@components/fallback/FallbackLoader';
import { useState } from 'react';
import SectionTabs from './sectionTabs/SectionTabs';
import { t } from 'i18next';
import useEducationalUnitForm from './useEducationalUnitForm';
import { EUFormProps } from './EuForm.type';
import EUnit from './module/EUnit';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';
import MainTabs from './mainTabs/MainTabs';
import { FormValues } from './module/Eu.type';

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
  const [euList, setEuList] = useState<FieldArrayWithId<FormValues, 'eu', 'id'>[]>(
    fields.filter((field) => field.type.toLocaleUpperCase() === EducationalUnitEnum.BASIC),
  );
  const [oldValues, setOldValues] = useState(0);

  const handleIndexChange = (index: number): string => {
    switch (index) {
      case 0:
        return 'BASIC';
      case 1:
        return 'INTERMEDIATE';
      case 2:
        return 'ADVANCED';
      default:
        return 'BASIC';
    }
  };

  const [selectedEu, setSelectedEu] = useState(0);
  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);

    if (newValue !== oldValues) {
      setEuList([]);
      setOldValues(newValue);
    }

    fields.forEach((field) => {
      if (field.type.toUpperCase() === handleIndexChange(newValue)) {
        setEuList((prev) => [...prev, field]);
      }
    });
  };

  const currentId =
    fields.findIndex((field) => field.id === euList[0]?.id) === -1
      ? 0
      : fields.findIndex((field) => field.id === euList[0]?.id);

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

  const [activeEu, setActiveEu] = useState(0);

  const handleChangeSectionTabs = (_: React.SyntheticEvent, newValue: number) => {
    setActiveEu(newValue);
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
          <MainTabs activeTab={activeTab} handleChange={handleChangeTab} />

          <SectionTabs
            eu={euList}
            activeEu={activeEu}
            handleChange={handleChangeSectionTabs}
            onAddNewEu={handleAddLearningObject}
            setSelectedEu={setSelectedEu}
          />

          <EUnit
            key={fields[currentId].id}
            field={fields[currentId]}
            euFormMethods={euFormMethods}
            files={files}
            canDelete={canDeleteEu(fields[activeEu].type)}
            euIndex={currentId}
            loIndex={currentId}
            isEditMode={isEditMode}
            setFiles={setFiles}
            handleAddQuestion={handleAddQuestion}
            handleRemoveQuestion={handleRemoveQuestion}
            handleAddAnswer={handleAddAnswer}
            handleRemoveAnswer={handleRemoveAnswer}
            handleRemoveEu={() => handleRemoveEducationalUnit(activeEu)}
            handleAddEuApi={handleAddEU}
            handleAddLearningObject={() => handleAddLearningObject(activeEu)}
            type={handleEuType(fields[activeEu].type)}
            onAddEu={() => addNewEducationalUnit(fields[activeEu].type, activeEu)}
          />
        </Stack>
      )}
    </FormProvider>
  );
}

export default EducationalUnitForm;
