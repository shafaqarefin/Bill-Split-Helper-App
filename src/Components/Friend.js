import { FriendDebtStatus } from "./FriendDebtStatus";

export function Friend({ friend, select, handleSelect }) {
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
