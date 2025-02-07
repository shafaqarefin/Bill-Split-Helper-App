import { useState } from "react";
import { FormSplitBill } from "./FormSplitBill";
import { FormAddFriend } from "./FormAddFriend";
import { FriendList } from "./FriendList";

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

  function updateBalance(id, myDue) {
    const updatedList = list.map((curr) =>
      curr.id === id ? { ...curr, balance: myDue } : curr
    );
    updateList(updatedList);
    setSelect(null);
  }

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
      {select?.id != null ? (
        <FormSplitBill curr={select} updateBalance={updateBalance} />
      ) : (
        ""
      )}
    </div>
  );
}
