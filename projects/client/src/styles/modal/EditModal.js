import ModalView from "../container/ModalView";
import Form from "../form/Form";

const EditModal = ({ isOpen, toggle, children, isLoading, onSubmit, textButton }) => {
  return (
    <ModalView isOpen={isOpen} toggle={toggle}>
      <Form textButton={textButton} isLoading={isLoading} onSubmit={onSubmit}>
        {children}
      </Form>
    </ModalView>
  );
};

export default EditModal;
