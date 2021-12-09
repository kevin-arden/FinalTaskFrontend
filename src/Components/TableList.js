import React from "react";
import { Image } from "cloudinary-react";

const TableList = ({ transaction, index, approved, cancelled }) => {
  return (
    <tr>
      <td>{transaction.id}</td>
      <td>{transaction.user.fullName}</td>
      <td>
        {transaction.attachment ? (
          <a href={transaction.attachment} target="_blank">
            <Image
              style={{ height: 150, width: 200 }}
              cloudName="kev-cloud"
              publicId={transaction.attachment}
            />
          </a>
        ) : (
          <img
            src={`https://piotrkowalski.pw/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png`}
            alt={transaction.attachment}
            style={{ width: "100px", height: "200px" }}
          />
        )}
      </td>
      <td>{transaction.bookCart}</td>
      <td>{transaction.totalPayment}</td>
      <td
        style={{
          color:
            transaction.status === "Approved"
              ? "green"
              : transaction.status === "Pending"
              ? "orange"
              : "red",
        }}
      >
        {transaction.status}
      </td>
      <td>
        {transaction.status === "Pending" ? (
          <div class="dropdown">
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 15L0.339746 -1.63133e-06L17.6603 -1.17124e-07L9 15Z"
                fill="#1C9CD2"
              />
            </svg>
            <div class="dropdown-content">
              <button
                class="dropdown-item"
                onClick={() => approved(transaction.id)}
                style={{ color: "green" }}
              >
                Approved
              </button>
              <button
                class="dropdown-item"
                onClick={() => cancelled(transaction.id)}
                style={{ color: "red" }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 15L0.339746 -1.63133e-06L17.6603 -1.17124e-07L9 15Z"
              fill="#1C9CD2"
            />
          </svg>
        )}
      </td>
    </tr>
  );
};

export default TableList;
