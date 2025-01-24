import {
  Body,
  Button,
  Heading,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { User } from "next-auth";

const EmailVerificationTemplate = ({
  user,
  verificationKey,
}: {
  user: User;
  verificationKey: string;
}) => {
  const emailLink = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verification/${verificationKey}`;
  console.log("Email");
  console.log("VerificationKey: ", verificationKey);

  return (
    <Tailwind
      config={{
        theme: {
          fontFamily: {
            verdana: ["Verdana", "sans-serif"],
          },
          extend: {
            colors: {
              pink: "#E83C6A",
              lightGreenV: "#E6F5F0",
              darkGreenV: "#078571",
              offWhiteV: "#FBFBFB",
              bodyText: "#222222",
              lightGrayV: "#535353",
            },
          },
        },
      }}
    >
      <Html lang="en" dir="ltr">
        <Body className="h-full w-full bg-lightGreenV">
          <Section className="w-full px-12 py-20">
            <Img
              src="https://www.vehkavaraus.fi/_next/image?url=%2Fvehka-pink.png&w=384&q=75"
              alt="Vehka logo"
              className="mx-auto"
            />
            <Heading
              as="h1"
              className="font-verdana text-center text-5xl text-bodyText"
            >
              Welcome {user.username}
            </Heading>
            <div className="text-center">
              <Button
                className="font-verdana mb-6 rounded-md bg-darkGreenV px-12 py-6 text-3xl font-semibold text-white"
                href={emailLink}
              >
                Verify your email
              </Button>
            </div>
            <Text className="font-verdana m-0 text-center text-xl font-semibold text-bodyText">
              Vehkavaraus.fi
            </Text>
            <Text className="font-verdana m-0 text-center text-lg font-medium text-lightGrayV">
              Vehkavaraus is not associated with HOAS
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default EmailVerificationTemplate;
