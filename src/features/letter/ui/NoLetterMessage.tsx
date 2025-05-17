import mailbox from "@/assets/images/mailbox.svg";

export const NoLetterMessage = () => {
  return (
    <div className="flex h-full min-h-[calc(100vh-400px)] flex-col items-center justify-center">
      <img src={mailbox} alt="편지 없음" />
      <h3 className="mt-4 text-2xl font-semibold text-gray-800">아직 편지가 없네요!</h3>
      <p className="text-md mt-2 text-center font-medium text-gray-400">
        기다리는 연인을 위해
        <br />
        편지를 작성해보는 건 어떨까요?
      </p>
    </div>
  );
};
