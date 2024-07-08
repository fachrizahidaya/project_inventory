import Form from "../../../styles/form/Form";
import Input from "../../../styles/form/Input";

const PasswordInput = ({
  password,
  confirmPassword,
  handleShowPassword,
  handleMouseDownPassword,
  showPassword,
  handleShowConfirmPassword,
  handleMouseDownConfirmPassword,
  showConfirmPassword,
  handleSubmit,
  isLoading,
}) => {
  return (
    <Form title="Reset Password" textButton="Submit" onSubmit={handleSubmit} isLoading={isLoading}>
      <Input
        id="password"
        name="password"
        inputType="password"
        textLabel="New Password"
        isRequired={true}
        reference={password}
        handleShowPassword={handleShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        showPassword={showPassword}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        inputType="password"
        textLabel="Confirm New Password"
        isRequired={true}
        reference={confirmPassword}
        handleShowPassword={handleShowConfirmPassword}
        handleMouseDownPassword={handleMouseDownConfirmPassword}
        showPassword={showConfirmPassword}
      />
    </Form>
  );
};

export default PasswordInput;
