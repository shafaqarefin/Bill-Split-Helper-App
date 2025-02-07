import { useState } from "react";

export function FormSplitBill({ curr, updateBalance }) {
  const [bill, setBill] = useState("");
  const [myBill, setMyBill] = useState(0);
  const [otherBill, setOtherBill] = useState(0);
  const [whoPaid, setWhoPaid] = useState("You");

  function handleBilSubmit(e) {
    e.preventDefault();
    if (whoPaid === "You") {
      const newBalance = curr.balance + otherBill;
      updateBalance(curr.id, newBalance);
    } else {
      const newBalance = curr.balance - myBill;
      updateBalance(curr.id, newBalance);
    }
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
      <select
        value={whoPaid}
        onChange={(e) => {
          setWhoPaid(e.target.value);
        }}
      >
        <option value="You">You</option>
        <option value={curr.name}>{curr.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}
