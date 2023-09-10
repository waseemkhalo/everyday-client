import { useEffect, useState } from 'react';
import { Day, Today, getToday } from "../../services/dayService";
import { updateNotes } from '../../services/userService';
// import MarkdownPreview from '../MarkdownPreview/MarkdownPreview';
import ReactMarkdown from 'react-markdown';
import './NoteSection.css';


function NoteSection({ day, setToday }: { day: Day | Today | undefined, setToday: React.Dispatch<React.SetStateAction<Today | undefined>> }) {
  const [notes, setNotes] = useState<Day['notes'] | Today['notes']>();
  const [isEditing, setIsEditing] = useState(false);
  const [saveVisible, setSaveVisible] = useState(false);

  useEffect(() => {
    if (day) setNotes(day.notes);
  }, [day]);

  // on notes change, display save button
  // how do get this to update the frontend without a refresh?
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.currentTarget.value);
    setSaveVisible(true);
  }

  const handleSaveClick = async () => {
    await updateNotes(notes);

    const today = await getToday()
    setToday(today)
    setSaveVisible(false);
    setIsEditing(false); // Exit edit mode after saving

  }

  const handleEditClick = () => {
    setIsEditing(true);
  }

  const handleCancelClick = () => {
    setNotes(day?.notes);
    setIsEditing(false);
  }


  // wait for notes before rendering
  if (!day) return <></>;

  return (
    <div className="bg-smoke pb-10">
      <div className="sm:p-4 md:px-16 md:py-8 lg:px-32 lg:py-10">
        <h1 className="pb-4 flex justify-between gap-6 items-center md:font-bold">
          Notes
          {isEditing ? (
            <div className='flex gap-2'>
              <button className={`trigger-time bg-lightGrey rounded-xl px-6 py-1 font-normal ${!saveVisible ? '' : ''}`}
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button className={`trigger-time bg-lightGrey rounded-xl px-6 py-1 font-normal ${!saveVisible ? 'hidden' : ''}`}
                onClick={handleSaveClick}
              >
                Save
              </button>

            </div>
          ) : (
            <button
              className="trigger-time bg-lightGrey rounded-xl px-6 py-1 font-normal"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
        </h1>
        {/* if the day object has a 'lists' property, (i.e., is a previous day and not today) render notes as an uneditable paragraph */}
        {Object.hasOwn(day, 'lists') ? (
          <p>
            {day.notes}
          </p>
        ) : (
          <div>
            {isEditing ? (

              <textarea
                className="bg-transparent w-full h-96 resize-none lg:pt-4 outline-none text-ghostShade"
                placeholder="Write something here..."
                value={notes}
                onChange={handleChange}
              />
            ) : (
              <div className='markdown-preview'>
                <ReactMarkdown>{day.notes}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>
    </div >
  );
}

export default NoteSection;
