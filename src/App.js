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

export default function App() {
  const [select, setSelect] = useState(null);
  const [addfriend, setAddFriend] = useState(false);
  const [list, updateList] = useState(initialFriends);
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
  console.log(list);

  // function updateBalance(id,new){
  //   list.map((curr)=>curr.id===id?{})
  // }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList select={select} handleSelect={handleSelect} list={list} />
        {addfriend ? (
          <FormAddFriend
            list={list}
            updateList={updateList}
            setAddFriend={setAddFriend}
          />
        ) : (
          ""
        )}
        <button className="button" onClick={handleAdd}>
          {addfriend ? "Close" : "Add Friend"}
        </button>
      </div>
      {select?.id != null ? <FormSplitBill curr={select} /> : ""}
    </div>
  );
}

function FriendList({ select, handleSelect, list }) {
  return (
    <ul>
      {list.map((friend) => (
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
      <FriendDebtStatus friend={friend} />
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

function FriendDebtStatus({ friend }) {
  let status = "";
  let style = "";

  if (friend.balance < 0) {
    status = `You owe ${friend.name} ${Math.abs(friend.balance)}€`;
    style = "red";
  } else if (friend.balance > 0) {
    status = `${friend.name} owes you ${Math.abs(friend.balance)}€`;
    style = "green";
  } else {
    status = `You and ${friend.name} are even`;
    style = ""; // No style needed for even balance
  }

  return <p className={style}>{status}</p>;
}

function FormAddFriend({ updateList, list, setAddFriend }) {
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

function FormSplitBill({ curr }) {
  const [bill, setBill] = useState("");
  const [myBill, setMyBill] = useState(0);
  const [otherBill, setOtherBill] = useState(0);

  function handleBilSubmit(e) {
    e.preventDefault();
  }
  function handleBillSplit(total) {
    setBill(total);
    setOtherBill(total);
  }

  function handleMyShare(share) {
    if (share <= bill) {
      setMyBill(share);
      setOtherBill(bill - share);
    } else {
      return;
    }
  }
  return (
    <form className="form-split-bill " onSubmit={(e) => handleBilSubmit(e)}>
      <label>💰 Bill value</label>
      <input
        value={bill}
        type="text"
        onChange={(e) => handleBillSplit(Number(e.target.value))}
      />
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={myBill}
        onChange={(e) => handleMyShare(Number(e.target.value))}
      />
      <label>👫 {curr.name}'s expense</label>
      <input type="text" value={otherBill} disabled />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="You">You</option>
        <option value={curr.name}>{curr.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
