import ApartmentForm from "./ApartmentForm";
import PasswordForm from "./PasswordForm";

interface FormElements extends HTMLFormControlsCollection {
  val1: HTMLInputElement;
  val2: HTMLInputElement;
}

export interface SettingsFormElements extends HTMLFormElement {
  readonly elements: FormElements;
}

export const validValues = (val1: string, val2: string): boolean => {
  return !!val1 && !!val2 && val1 === val2;
};

const SettingsForms = () => {
  return (
    <div className="flex justify-evenly">
      <PasswordForm />
      <ApartmentForm />
    </div>
  );
};

export default SettingsForms;
