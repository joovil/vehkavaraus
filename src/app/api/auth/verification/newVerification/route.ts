export const POST = async (req: Request) => {
  // TODO: Fix
  try {
    const data = req.json();
    console.log(data);
    // const user = data.

    // await deleteVerificationByUserId(user.id);
    // await newUserVerification(user);

    return Response.json({ message: "New verification email sent" });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error }, { status: 400 });
    }
  }
};
