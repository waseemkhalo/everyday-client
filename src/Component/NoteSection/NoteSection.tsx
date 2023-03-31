import React from "react";

function NoteSection() {
  return (
    <div className="bg-smoke pb-10" >
      <div className="p-4">
        <h1 className="pb-4">Note</h1>
        <textarea className="bg-transparent w-full h-96 resize-none" placeholder="Write something here..." />
      </div>
    </div>
  );
}

export default NoteSection;
