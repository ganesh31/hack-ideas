import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../../api/user/user";
import Overlay from "../../components/overlay/Overlay";
import Textfield from "../../components/textfield/Textfield";
import { User } from "../../types/user";
interface Props {
  onUser: (user: User) => void;
}

export default function Register(props: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");

  const [id, setId] = useState<number | null>(null);

  const onSubmit = async () => {
    const user = await addNewUser(name);
    if (user === null) {
      throw new Error("Something went wrong");
    }
    props.onUser(user);

    setId(user.id);
  };

  const onClose = () => {
    setOpen(false);
    setName("");
    navigate("/");
  };

  return (
    <Overlay open={open} onClose={onClose} closeOnEscape closeOnOutsideClick>
      <div className="w-full space-y-3">
        {id === null ? (
          <>
            <Textfield
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
            />
            <button
              id="register"
              className="shadow-slate-400 text-slate-50 active:bg-slate-800 hover:bg-slate-600 bg-slate-800 px-4 py-2 border rounded shadow-sm"
              onClick={onSubmit}
            >
              Submit
            </button>
          </>
        ) : (
          <div role={"alert"} className="flex flex-col items-center">
            <p>
              Employee ID generated successfully, <b>{id}</b>
            </p>
            <p>Please use the Employee Id for future logins</p>
            <Link
              id="ok"
              to={"/"}
              className="shadow-slate-400 text-slate-50 active:bg-slate-800 hover:bg-slate-600 bg-slate-800 w-6/12 px-4 py-2 mt-3 border rounded shadow-sm text-center"
            >
              Ok
            </Link>
          </div>
        )}
      </div>
    </Overlay>
  );
}
