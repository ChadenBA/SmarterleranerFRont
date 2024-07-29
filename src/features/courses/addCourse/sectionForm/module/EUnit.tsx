import { Divider } from '@mui/material';
import { useState } from 'react';
import EuHead from './EuHead/EuHead';
import { ModuleRoot } from './Eu.style';
import EuBody from './moduleBody/EuBody';
import { EuProps } from './Eu.type';
import { Quiz } from 'types/models/Quiz';

function EUnit({
  field,
  files,
  euIndex,
  canDelete,
  euFormMethods,
  isEditMode,
  type,
  loIndex,
  onAddEu,
  setFiles,
  handleAddAnswer,
  handleAddQuestion,
  handleRemoveAnswer,
  handleRemoveQuestion,
  handleRemoveEu,
  handleAddEuApi,
  handleAddLearningObject,
}: EuProps) {
  // Destructing the questions from the form methods

  const learningObjects = field?.learningObjects ?? [];

  const quiz = learningObjects[0]?.quiz as Quiz | undefined;

  const questions = quiz?.questions ?? [];

  const [open, setOpen] = useState(false);
  // State Declaration
  const [expanded, setExpanded] = useState(isEditMode ? true : false);

  const [deletedMedia, setDeletedMedia] = useState<string[]>([]);

  const isNewSection = !field?.id || !field?.title || !field?.learningObjects[0]?.title;
  const handleChangeExpand = () => setExpanded((prev) => !prev);

  const handleDeleteOrRemoveSection = () => {
    isEditMode && !isNewSection ? setOpen(true) : handleRemoveEu(euIndex);
  };

  //watch the field title
  const title = euFormMethods.watch(`eu.${euIndex}.title`);

  const handleUpdateEuApi = euFormMethods.handleSubmit(async (values) => {
    // const sectionId = values.sections[index].databaseId
    // const sectionData = values.sections[index]
    // try {
    //   // Update Section api call
    //   await updateSection({
    //     sectionId,
    //     data: sectionData,
    //     files: files[index],
    //     deletedMedia,
    //   }).unwrap()
    //   // Dispatch success Snackbar
    //   dispatch(showSuccess(t('section.update_success')))
    //   setDeletedMedia([])
    //   dispatch(
    //     courseApi.util.invalidateTags(['Courses', 'CoursesForDesigner']),
    //   )
    // } catch (error) {
    //   // Dispatch error Snackbar
    //   dispatch(showError(t('errors.general_error')))
    // }
  });

  return (
    <>
      <ModuleRoot spacing={2} mb={1} mt={1}>
        <EuHead
          canDelete={canDelete}
          expanded={expanded}
          index={euIndex}
          isNewEu={isNewSection}
          title={title}
          onCreateEu={handleAddEuApi}
          onChangeExpanded={handleChangeExpand}
          onDeleteEu={handleDeleteOrRemoveSection}
          onUpdateEu={handleUpdateEuApi}
          type={type}
          onAddEu={onAddEu}
        />
        <Divider />
        <EuBody
          euIndex={euIndex}
          expanded={expanded}
          field={field}
          files={files}
          setFiles={setFiles}
          handleAddAnswer={handleAddAnswer}
          handleAddQuestion={handleAddQuestion}
          handleRemoveAnswer={handleRemoveAnswer}
          handleRemoveEu={handleRemoveEu}
          handleRemoveQuestion={handleRemoveQuestion}
          handleAddLearningObject={handleAddLearningObject}
          loIndex={loIndex}
          questions={questions}
          sectionFormMethods={euFormMethods}
          setDeletedMedia={setDeletedMedia}
          isEditMode={isEditMode}
        />
      </ModuleRoot>
    </>
  );
}

export default EUnit;
