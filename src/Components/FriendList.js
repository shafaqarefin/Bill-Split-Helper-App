import { Friend } from "./Friend";

export function FriendList({ select, handleSelect, list }) {
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
