import { ChangeEvent } from "react";

interface Props {
  placeholder?: string;
  name: string;
  value: string;
  autoFocus?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  noLabel?: boolean;
}

const Textfield = (props: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event);
  };

  return (
    <div className="flex flex-col items-start justify-center w-full">
      {!props.noLabel && (
        <label
          className={`text-sm md:text-lg font-semibold`}
          htmlFor={props.name}
        >
          {props.placeholder}
        </label>
      )}
      <input
        autoFocus={props.autoFocus}
        type="text"
        className={`pl-2 w-full h-10 rounded border border-slate-300 focus:outline-slate-500 focus:ring-slate-500`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={handleChange}
        name={props.name}
        id={props.name}
      />
    </div>
  );
};

export default Textfield;
