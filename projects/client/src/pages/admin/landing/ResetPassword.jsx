import { useRef } from "react";
import PasswordInput from "../../../components/admin/landing/PasswordInput";

const ResetPassword = () => {
  const password = useRef();

  return <PasswordInput password={password} />;
};

export default ResetPassword;
