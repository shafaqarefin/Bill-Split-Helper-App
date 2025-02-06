import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// function Button({ children, onClick }) {
//   return (
//     <button onClick={onClick} className="button">
//       {children}
//     </button>
//   );
// }

export default function App() {
  const [select, setSelect] = useState(null);
  const [addfriend, setAddFriend] = useState(false);
  function handleSelect(friend) {
    setSelect((cur) => (cur?.id === friend?.id ? null : friend));
    setAddFriend(false);
  }
  function handleAdd() {
    if (addfriend) {
      setAddFriend(false);
    } else {
      setAddFriend(true);
    }
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList select={select} handleSelect={handleSelect} />
        {addfriend ? <FormAddFriend curr={select} /> : ""}
        <button className="button" onClick={handleAdd}>
          {addfriend ? "Close" : "Add Friend"}
        </button>
      </div>
      {select?.id != null ? <FormSplitBill curr={select} /> : ""}
    </div>
  );
}

function FriendList({ select, handleSelect }) {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          select={select}
          handleSelect={handleSelect}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, select, handleSelect }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p>You owe him/her this</p>
      <button
        className="button"
        onClick={() => {
          handleSelect(friend);
        }}
      >
        {select?.id === friend.id ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>👫 Friend name</label>
      <input type="text" />
      <label>🌄 Image URL</label>
      <input type="url" value="https://i.pravatar.cc/48?u=499476" />
      <button className="button">Add</button>
    </form>
  );
}

function FormSplitBill({ curr }) {
  return (
    <form className="form-split-bill ">
      <label>💰 Bill value</label>
      <input type="text" />
      <label>🧍‍♀️ Your expense</label>
      <input type="text" />
      <label>👫 {curr.name}'s expense</label>
      <input type="text" value={34} />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>{curr.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
