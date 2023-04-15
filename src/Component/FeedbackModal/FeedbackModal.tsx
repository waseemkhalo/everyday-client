import { useState } from "react";
import { addFeedback } from "../../services/feedbackService"

function FeedbackModal() {

  const [isOpen, setIsOpen] = useState(false);

  const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.currentTarget.survey.value);
    // console.log(e.currentTarget.feedback.value);

    await addFeedback({
      survey: e.currentTarget.survey.value,
      feedback: e.currentTarget.feedback.value,
    });

    console.log('feedback submitted')

  }

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button onClick={toggleModal}>Feedback</button>

      <div
        className={`fixed z-10 inset-0 overflow-y-auto flex items-center justify-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="bg-white w-6/12 h-fit rounded-md shadow-lg p-6">
          <button onClick={toggleModal}>
            <h1 className="text-3xl">x</h1>
          </button>

          <form className="flex-col" onSubmit={handleSubmit}>
            <h1 className="mb-6 text-2xl">Feedback</h1>
            <label htmlFor="survey">Are you enjoying your experiance?</label>
            <div className="flex items-center space-x-2">
              <input type="radio" name="survey" id="yes" value="yes" />
              <label htmlFor="yes">Yes</label>
              <input type="radio" name="survey" id="no" value="no" />
              <label htmlFor="no">No</label>
            </div>

            <label htmlFor="feedback"></label>
            <textarea
              className="resize-none w-full h-fit mt-6"
              placeholder="Tell us about your experiance"
              name="feedback"
              id="feedback"
            />
            <button className="mt-6" type="submit"> Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FeedbackModal;
