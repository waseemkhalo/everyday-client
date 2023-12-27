
function LandingHero({ handleOpenAuth }: { handleOpenAuth: () => void }) {

  return (
    <div className="flex justify-center items-center mt-6">
      <div className="flex flex-col items-center gap-6">
        <h1 className="sm:text-5xl md:text-6xl font-bold text-center text-white">Welcome to Everyday</h1>
        {/* COOL IDEA - have the words below transition beside the word EveryDay... like Everyday Todos, Everyday Notes, etc */}
        <h1 className="sm:text-3xl md:text-4xl font-bold text-center flex flex-wrap justify-center text-white">
          <span>ToDos ✅</span> <span>Notes 📝</span> <span>Progress Tracking 📈</span>
        </h1>
        <h1 className="text-2xl text-white">Your accountability buddy</h1>
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
