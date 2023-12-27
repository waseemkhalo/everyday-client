import screenshot from "../../assets/background/screencapture-everyday-dec27-425pm.png";


function LandingMain() {
  return (
    <section>
      <div className="flex justify-center items-center mt-6">
        <div className="flex flex-col items-center">
          <h1 className="sm:text-5xl md:text-6xl font-bold text-white">How it works</h1>
          <div className="sm:p-6 md:p-16">
            <p className="text-center max-w-4xl m-auto md:text-lg sm:text-base text-white">
              Hold yourself accountable for what you said you'd complete today.
              Each day is given an entry, and you have 24 hours to complete your
              todo list ⏰. When you miss a day, you'll skip an entry, which
              means you'll have one less opportunity to complete your tasks.
              This feature encourages you to stay on track and not let your
              daily tasks fall behind.
            </p>
          </div>
          <img
            className="w-8/12 rounded-lg shadow-xl"
            src={screenshot}
            alt="screenshot of product"
          />
        </div>
      </div>
    </section>
  );
}

export default LandingMain;
