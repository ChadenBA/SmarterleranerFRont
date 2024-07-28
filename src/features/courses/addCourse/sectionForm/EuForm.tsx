import { t } from 'i18next';
import { DevTool } from '@hookform/devtools';

import { FieldArrayWithId, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import MainTabs from './mainTabs/MainTabs';
import FallbackLoader from '@components/fallback/FallbackLoader';
import SectionTabs from './sectionTabs/SectionTabs';
import useEducationalUnitForm from './useEducationalUnitForm';

import EUnit from './module/EUnit';
import { EUFormProps } from './EuForm.type';
import { EducationalUnitEnum } from '@config/enums/educationalUnit.enum';
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

  const [activeEu, setActiveEu] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [oldValues, setOldValues] = useState(-1);
  const [currentId, setCurrentId] = useState(0);
  const [selectedEu, setSelectedEu] = useState(0);
  const [deletedEu, setDeletedEu] = useState(false);
  const [newEuAdded, setNewEuAdded] = useState(false);
  const [lastDeletedAddedEuType, setLastDeletedAddedEuType] = useState('');

  const [euList, setEuList] = useState<FieldArrayWithId<FormValues, 'eu', 'id'>[]>(
    fields.filter((field) => field.type.toLocaleUpperCase() === EducationalUnitEnum.BASIC),
  );

  //______________________ Component SideEffect ______________________
  //-- Set the current index of the educational unit
  useEffect(() => {
    if (isEditMode) {
      const index = fields.findIndex((field) => field.id === euList[0]?.id);
      setCurrentId(index === -1 ? 0 : index);
    }
  }, [euList, fields, isEditMode]);

  //-- Set the current index of the educational unit
  useEffect(() => {
    if (isEditMode) {
      const index = fields.findIndex((field) => field.id === selectedEu);
      setCurrentId(index === -1 ? 0 : index);
    }
  }, [fields, isEditMode, selectedEu]);

  //-- Reset the activeEu to 0 when the activeTab changes
  useEffect(() => {
    if (isEditMode) {
      setActiveEu(0);
    }
  }, [activeTab]);
  //-- Set the current index of the educational unit
  useEffect(() => {
    if (newEuAdded || deletedEu) {
      if (newEuAdded) {
        handleChangeTab(null, handleTypeByIndex(fields[fields.length - 1].type));
        setSelectedEu(getLastIdByType(lastDeletedAddedEuType));
        setActiveEu(getCountByType(lastDeletedAddedEuType) - 1);
      } else {
        handleChangeTab(null, handleTypeByIndex(lastDeletedAddedEuType));
        setActiveEu(getCountByType(lastDeletedAddedEuType) - 1);
      }

      setNewEuAdded(false);
      setDeletedEu(false);
    }
  }, [newEuAdded, deletedEu]);

  //______________________ Event Handlers ______________________
  //-- Handle index changes
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

  //-- Handle type by index
  const handleTypeByIndex = (type: string): number => {
    switch (type.toUpperCase()) {
      case 'BASIC':
        return 0;
      case 'INTERMEDIATE':
        return 1;
      case 'ADVANCED':
        return 2;
      default:
        return 0;
    }
  };

  //-- Get the last id of the educational unit based on the type
  const getLastIdByType = (type: string) => {
    const filtered = fields.filter((field) => field.type.toUpperCase() === type.toUpperCase());
    return filtered[filtered.length - 1]?.id;
  };

  //-- Handle tab changes
  const handleChangeTab = (_: React.SyntheticEvent<Element, Event> | null, newValue: number) => {
    if (newEuAdded || deletedEu) {
      setEuList([]);
    } else {
      setActiveTab(newValue);
    }

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

  //-- Add a new educational unit
  const addNewEducationalUnit = (type: EducationalUnitEnum, index: number, isEditMode = false) => {
    if (!isEditMode) {
      handleAddEducationalUnit(type, index, isEditMode);
      setActiveTab(fields.length - 1);
    } else {
      handleAddEducationalUnit(type, index, isEditMode, t('eu.new_eu'));
      setNewEuAdded(true);
      setLastDeletedAddedEuType(type);
    }
  };

  //-- Remove an educational unit
  const handleRemoveSection = (index: number, type?: string) => {
    handleRemoveEducationalUnit(index);

    if (!isEditMode) {
      setActiveTab(fields.length - 2);
    } else {
      setDeletedEu(true);
      setLastDeletedAddedEuType(type || '');
    }
  };

  //-- Handle changes in the section tabs
  const handleChangeSectionTabs = (_: React.SyntheticEvent, newValue: number) => {
    setActiveEu(newValue);
  };

  //-- Get index by id
  const getIndexById = (id: string) => {
    return fields.findIndex((field) => field.id === id);
  };

  //-- Get the count of the educational unit by type
  const getCountByType = (type: string) => {
    let count = 0;

    fields.forEach((field) => {
      if (field.type.toUpperCase() === type.toUpperCase()) {
        count++;
      }
    });

    return count;
  };
  //-- Handle changes in the section tabs
  const handleChangeEuType = (type: string) => {
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

  //-- Check if the educational unit can be deleted
  const canDeleteEu = (type: string) => {
    let count = 0;

    fields.forEach((field) => {
      if (field.type.toUpperCase() === type.toUpperCase()) {
        count++;
      }
    });

    return count > 1;
  };

  //______________________ If fetching Render loader ______________________
  if (isFetching) {
    return <FallbackLoader />;
  }

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
                type={handleChangeEuType(field.type)}
                onAddEu={() => addNewEducationalUnit(field.type, index)}
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
            onAddNewEu={addNewEducationalUnit}
            setSelectedEu={setSelectedEu}
          />

          {fields[currentId] && euList.length > 0 && (
            <EUnit
              key={fields[currentId].id}
              field={fields[currentId]}
              euFormMethods={euFormMethods}
              files={files}
              canDelete={canDeleteEu(fields[currentId].type)}
              euIndex={currentId}
              loIndex={currentId}
              isEditMode={isEditMode}
              setFiles={setFiles}
              handleAddQuestion={handleAddQuestion}
              handleRemoveQuestion={handleRemoveQuestion}
              handleAddAnswer={handleAddAnswer}
              handleRemoveAnswer={handleRemoveAnswer}
              handleRemoveEu={() =>
                handleRemoveSection(getIndexById(fields[currentId].id), fields[currentId].type)
              }
              handleAddEuApi={handleAddEU}
              handleAddLearningObject={() => handleAddLearningObject(activeEu)}
              type={handleChangeEuType(fields[activeEu].type)}
              onAddEu={() => addNewEducationalUnit(fields[activeEu].type, activeEu, true)}
            />
          )}
        </Stack>
      )}
      <DevTool control={euFormMethods.control} />
    </FormProvider>
  );
}

export default EducationalUnitForm;
