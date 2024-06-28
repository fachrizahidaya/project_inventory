import ModalView from "../container/ModalView";
import Form from "../form/Form";

const AddModal = ({ isOpen, toggle, children, isLoading, onSubmit, textButton, disabled }) => {
  return (
    <ModalView isOpen={isOpen} toggle={toggle}>
      <Form textButton={textButton} isLoading={isLoading} onSubmit={onSubmit} disabled={disabled}>
        {children}
      </Form>
    </ModalView>
  );
};

export default AddModal;
