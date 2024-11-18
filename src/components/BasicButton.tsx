export const BasicButton = ({ text }: { text: string }) => {
  return (
    <>
      <button
        className="bg-darkGreenV font-black text-offWhiteV rounded py-2 px-5 w-fit"
        type="submit"
      >
        {text}
      </button>
    </>
  );
};
