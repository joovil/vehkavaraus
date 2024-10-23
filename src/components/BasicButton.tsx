export const BasicButton = ({ text }: { text: string }) => {
  return (
    <>
      <button className="py-5 px-10 bg-darkGreenV font-circularBold rounded-md text-3xl">
        {text}
      </button>
    </>
  );
};
