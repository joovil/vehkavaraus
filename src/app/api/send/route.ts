import { Resend } from "resend";
import { RESEND_API_KEY } from "../../../lib/utils/envVariables";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(RESEND_API_KEY);

export const POST = async () => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Vehkavaraus <noreply@vehkavaraus.fi>",
      to: ["joonasmatiasviljanen@gmail.com"],
      subject: "Verify your email",
      react: EmailTemplate({ username: "Joonas" }),
    });

    console.log(data);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ message: "email sent" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
};
