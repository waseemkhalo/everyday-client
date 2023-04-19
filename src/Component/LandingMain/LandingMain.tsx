import screenshot from "../../assets/icons/screencapture-localhost-3000-home-2023-04-19-08_27_37.png";


function LandingMain() {
  return (
    <section>
      <div className="flex justify-center items-center mt-6">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl font-bold">How it works</h1>
          <div className="p-16">
            <span className="text-center">
              Hold yourself accountable for what you said you'd complete today.
              Each day is given an entry, and you have 24 hours to complete your
              todo list ⏰. When you miss a day, you'll skip an entry, which
              means you'll have one less opportunity to complete your tasks.
              This feature encourages you to stay on track and not let your
              daily tasks fall behind.
            </span>
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
