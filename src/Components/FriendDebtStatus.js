export function FriendDebtStatus({ friend }) {
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
    style = "";
  }

  return <p className={style}>{status}</p>;
}
