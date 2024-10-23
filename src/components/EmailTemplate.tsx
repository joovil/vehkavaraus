import { VehkaHorizontal } from "./VehkaHorizontal";
import { BasicButton } from "./BasicButton";

interface EmailTemplateProps {
  username: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,
}) => (
  <div className="w-fit flex flex-col items-center justify-center bg-lightGreenV pt-8 px-12 space-y-6">
    <div>
      <VehkaHorizontal className="fill-pink h-full w-full object-scale-down pb-2" />
    </div>
    <h1 className="font-circularBold text-5xl text-bodyText">
      Welcome {username}!
    </h1>
    <BasicButton text="Verify your email" />
    <footer className="pb-4 text-center">
      <a
        href="https://www.vehkavaraus.fi/"
        className="font-circularMedium text-bodyText text-2xl"
      >
        Vehkavaraus.fi
      </a>
      <p className="font-circularBook text-lightGrayV">
        Vehkavaraus is not associated with HOAS
      </p>
    </footer>
  </div>
);
