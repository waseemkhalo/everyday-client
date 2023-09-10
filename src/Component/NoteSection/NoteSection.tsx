import { useEffect, useState } from 'react';
import { Day, Today } from "../../services/dayService";
import { updateNotes } from '../../services/userService';
import MarkdownPreview from '../MarkdownPreview/MarkdownPreview';

function NoteSection({ day }: { day: Day | Today | undefined }) {
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
  


  const handleSaveClick = () => {
    updateNotes(notes);
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
            <>
              <button className={`trigger-time bg-lightGrey rounded-xl px-6 py-1 font-normal ${!saveVisible ? 'hidden' : ''}`}
                onClick={handleSaveClick}
              >
                Save
              </button>
            </>
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
              <>
                <button className={`trigger-time bg-lightGrey rounded-xl px-6 py-1 font-normal ${!saveVisible ? '' : 'hidden'}`}
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <textarea
                  className="bg-transparent w-full h-96 resize-none lg:pt-4 outline-none text-ghostShade"
                  placeholder="Write something here..."
                  value={notes}
                  onChange={handleChange}
                />
              </>
            ) : (
              <MarkdownPreview content={day.notes} />
              // how to render the markdown preview component here without refreshing the page?
              // do i pass the onChange function to the markdown preview component?
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteSection;
