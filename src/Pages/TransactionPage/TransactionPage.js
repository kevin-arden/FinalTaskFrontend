/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../../Config/api";
import TableList from "../../Components/TableList";
import { Modal } from "react-bootstrap";

//Image
import logoPic from "../../Icon/Icon.png";
import profilePic from "../../Icon/ProfilePic.png";
import background from "../../Icon/background.png";
import addBook from "../../Icon/addBook.svg";
import logout from "../../Icon/logout.svg";

//css
import "./Transaction.css";

//context
import { AppContext } from "../../Context/globalContext";

const TransactionPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  const goAddBook = () => {
    history.push(`/addbook`);
  };

  const getTransaction = async () => {
    try {
      setLoading(true);

      const allTransaction = await API.get("/transactions");

      setLoading(false);

      setTransaction(allTransaction.data.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransaction();
  }, []);

  const approved = async (id) => {
    try {
      const approveData = JSON.stringify({
        status: "Approved",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const approved = await API.patch(
        `transaction/${id}`,
        approveData,
        config
      );
      setLoading(false);

      

      getTransaction();
      console.log(approved);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelled = async (id) => {
    try {
      const cancelData = JSON.stringify({
        status: "Cancelled",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setLoading(true);
      const cancelled = await API.patch(
        `transaction/${id}`,
        cancelData,
        config
      );
      setLoading(false);
      getTransaction();

      console.log(cancelled);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="transaction-body">
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${background})`,
          borderColor: "#F3F3F3",
        }}
      >
        <div className="row">
          <div>
            <img className="logos" src={logoPic} alt="" />
          </div>
          <div className="col-md-10"></div>
          <div>
            <div class="dropdown">
              <img className="foto" src={profilePic} alt="" />
              <div class="dropdown-content">
                <a onClick={goAddBook}>
                  <img src={addBook} alt="" /> Add Book
                </a>
                <a onClick={() => dispatch({ type: "LOGOUT" })}>
                  <img src={logout} alt="" /> Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row transaction-content">
          <div className="col-md">
            <p className="transaction-header">Incoming Transaction</p>
          </div>
        </div>
        <div className="row transaction-content">
          <div className="col-md-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Transfer Proof</th>
                  <th>Product Purchased</th>
                  <th>Total payment</th>
                  <th>Status Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <TableList
                    key={transaction.id}
                    transaction={transaction}
                    index={index}
                    approved={approved}
                    cancelled={cancelled}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
