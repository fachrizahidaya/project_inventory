import Form from "../../../styles/form/Form";
import Input from "../../../styles/form/Input";

const Login = ({ email, password, handleLogin, handleShowPassword, handleMouseDownPassword, showPassword }) => {
  return (
    <Form title="Sign in" textButton="Sign in" onSubmit={handleLogin} forgotPassword={true}>
      <Input id="email" name="email" inputType="email" textLabel="Email" isRequired={true} reference={email} />
      <Input
        id="password"
        name="password"
        inputType="password"
        textLabel="Password"
        isRequired={true}
        reference={password}
        handleShowPassword={handleShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        showPassword={showPassword}
      />
    </Form>
  );
};

export default Login;
