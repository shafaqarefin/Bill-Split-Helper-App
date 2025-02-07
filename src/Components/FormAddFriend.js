import { useState } from "react";

export function FormAddFriend({ updateList, list, setAddFriend }) {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const newId = crypto.randomUUID();
  function onAddFriend() {
    const newEntry = {
      id: newId,
      name: name,
      image: `https://i.pravatar.cc/48?u=${newId}`,
      balance: 0,
    };
    const newList = [...list, newEntry];
    updateList(newList);
    setAddFriend(false);
  }
  return (
    <form className="form-add-friend" onSubmit={onAddFriend}>
      <label>👫 Friend name</label>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
      />
      <label>🌄 Image URL</label>
      <input
        type="url"
        value="https://i.pravatar.cc/48"
        onChange={(e) => {
          setImg(e.target.value);
        }}
      />
      <button className="button">Add</button>
    </form>
  );
}
