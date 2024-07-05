import Form from "../../../styles/form/Form";
import Input from "../../../styles/form/Input";

const EmailInput = ({ email, handleSendEmail, isLoading }) => {
  return (
    <Form title="Forgot Password" textButton="Submit" onSubmit={handleSendEmail} isLoading={isLoading}>
      <Input id="email" name="email" inputType="email" textLabel="Email" isRequired={true} reference={email} />
    </Form>
  );
};

export default EmailInput;
