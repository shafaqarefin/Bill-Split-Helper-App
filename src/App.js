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
  return (
    <div className="app">
      <Sidebar />
      {/* <BillSplit />
      <AddFriend /> */}
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        {initialFriends.map((item) => (
          <li>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>You owe him/her this</p>
            <button className="button">Select</button>
          </li>
        ))}
      </ul>
      <button className="button">Add Friend</button>
    </div>
  );
}

function AddFriend({ itemObj }) {
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

function BillSplit({ itemObj }) {
  return (
    <form className="form-split-bill ">
      <label>💰 Bill value</label>
      <input type="text" />
      <label>🧍‍♀️ Your expense</label>
      <input type="text" />
      <label>👫 Clark's expense</label>
      <input type="text" value={34} />
      <label>🤑 Who is paying the bill</label>
      <select>
        <option>You</option>
        <option>Clark</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}

// function FormComponent({ children }) {
//   return <form>{children}</form>;
// }
