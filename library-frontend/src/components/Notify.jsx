import { useContext } from "react";
import { ErrorMessageContext } from "../../context/ErrorMessageContext";

const Notify = () => {
  const { errorMessage } = useContext(ErrorMessageContext);
  return (
    <>
      <p>{errorMessage}</p>
    </>
  );
};

export default Notify;
