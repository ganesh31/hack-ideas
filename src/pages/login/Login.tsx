import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isUserExists } from "../../api/user/user";
import Overlay from "../../components/overlay/Overlay";
import Textfield from "../../components/textfield/Textfield";
import { User } from "../../types/user";

interface Props {
  onUser: (user: User) => void;
}

interface LocationState {
  redirectTo?: string;
}

export default function Login(props: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [empId, setEmpId] = useState("");
  const [userError, setUserError] = useState(false);
  const errorHandler = useErrorHandler();

  const onSubmit = async () => {
    try {
      const user = await isUserExists(empId);

      if (user) {
        setOpen(false);
        setUserError(false);
        props.onUser(user);
        const state = location.state as LocationState;
        const redirectTo = state?.redirectTo || "/hacks";

        navigate(redirectTo);
      } else {
        setUserError(true);
      }
    } catch (error) /* istanbul ignore next */ {
      errorHandler(error);
    }
  };

  const onClose = () => {
    setOpen(false);
    setEmpId("");
    setUserError(false);
    navigate("/hacks");
  };

  return (
    <Overlay open={open} onClose={onClose} closeOnEscape closeOnOutsideClick>
      <div data-testid="loginOverlay" className="w-full space-y-3">
        <Textfield
          name="employeeId"
          onChange={(e) => setEmpId(e.target.value)}
          value={empId}
          placeholder="Employee Id"
        />
        {userError && (
          <h1 role={"alert"} className="text-xs text-red-500">
            Employee does not exists
          </h1>
        )}
        <Link
          id="register"
          className="text-sky-700 block underline w-fit"
          to={"/register"}
          state={location.state}
        >
          Register
        </Link>
        <button
          id="login-submit"
          className="shadow-slate-400 text-slate-50 active:bg-slate-800 hover:bg-slate-600 bg-slate-800 px-4 py-2 border rounded shadow-sm"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </Overlay>
  );
}
