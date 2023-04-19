
function LandingHero({ handleOpenAuth }: { handleOpenAuth: () => void }) {

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl font-bold">Welcome to Everyday</h1>
        {/* COOL IDEA - have the words below transition beside the word EveryDay... like Everyday Todos, Everyday Notes, etc */}
        <h1 className="text-4xl font-bold">
          ToDos ✅ Notes 📝 Progress Tracking 📈
        </h1>
        <h1 className="text-2xl">Your accountability buddy</h1>
        <button
          onClick={handleOpenAuth}
          className=" shadow-lg bg-lightOrange hover:bg-orange text-black rounded-md p-2"
        >
          Try Everyday for free
        </button>
      </div>
    </div>
  );
}

export default LandingHero;
