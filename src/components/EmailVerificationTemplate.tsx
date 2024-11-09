import { NEXT_PUBLIC_API_URL } from "@/lib/utils/envVariables";
import { User } from "@/types/user";
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
import { randomUUID } from "crypto";

const EmailVerificationTemplate = ({ user }: { user: User }) => {
  const id = randomUUID();
  const emailLink = `${NEXT_PUBLIC_API_URL}/api/auth/verification/${id}`;

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
        <Body className="bg-lightGreenV w-full h-full">
          <Section className="px-12 py-20 w-full">
            <Img
              src="https://www.vehkavaraus.fi/_next/image?url=%2Fvehka-pink.png&w=384&q=75"
              alt="Vehka logo"
              className="mx-auto"
            />
            <Heading
              as="h1"
              className="font-verdana text-5xl text-bodyText text-center"
            >
              Welcome {user.username}
            </Heading>
            <div className="text-center">
              <Button
                className="py-6 px-12 mb-6 bg-darkGreenV font-verdana font-semibold rounded-md text-3xl text-white"
                href={emailLink}
              >
                Verify your email
              </Button>
            </div>
            <Text className="m-0 font-verdana font-semibold text-xl text-bodyText text-center">
              Vehkavaraus.fi
            </Text>
            <Text className="m-0 font-verdana font-medium text-lg text-lightGrayV text-center">
              Vehkavaraus is not associated with HOAS
            </Text>
          </Section>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default EmailVerificationTemplate;
