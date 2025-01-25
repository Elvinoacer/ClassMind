import { SocketType } from ".";

interface SignupProps {
  user: { current: { id: string; name: string } | null };
  socket: SocketType;
  input: string;
  setInput(value: string): void;
  courseCode: string;
  institutionGroupId: string;
  yearGroup: string;
}

const SignUp = ({
  user,
  socket,
  input,
  setInput,
  institutionGroupId,
  courseCode,
  yearGroup,
}: SignupProps) => {
  const addUser = () => {
    user.current = { name: input, id: socket.id || "" };
    socket.emit("join-room", { user: input, room: institutionGroupId });
    setInput("");
  };

  return (
    <div className="h-full flex flex-col items-center justify-center screen-chat">
      <div className="text-center grid grid-rows-3 gap-2 gradient p-4 rounded-md">
        <h1 className="text-5xl font-bold text-white text-communicate">
          Communicate
        </h1>
        <h2 className="text-xl text-white">
          Join {courseCode?.toUpperCase()} {yearGroup} chat group as :
        </h2>

        <input
          type="text"
          className="text-xl w-full text-center rounded-md p-2 my-2 text-blue-400 placeholder-blue-300 focus:outline-none"
          placeholder="..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addUser()}
        />
        <button
          className={`text-xl w-full text-white font-bold py-2 px-3 rounded-md ${
            input ? "bg-sky-400" : "bg-slate-400"
          }`}
          disabled={!input}
          onClick={addUser}
        >
          Join Group
        </button>
      </div>
    </div>
  );
};

export default SignUp;
