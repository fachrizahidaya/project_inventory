import Form from "../../../styles/form/Form";
import Input from "../../../styles/form/Input";

const Login = () => {
  return (
    <Form title="Sign in" textButton="Sign in">
      <Input id="email" name="email" inputType="email" textLabel="Email" isRequired={true} />
      <Input id="password" name="password" inputType="password" textLabel="Password" isRequired={true} />
    </Form>
  );
};

export default Login;
