/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { API } from "../../Config/api";
import TableList from "../../Components/TableList";
import NavBar from "../../Components/NavBar";

//Image
import background from "../../Icon/background.png";

//css
import "./Transaction.css";

const TransactionPage = () => {
  const [transactions, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <div>
      <NavBar />
      <div className="transaction-body">
        <div
          className="container-fluid"
          style={{
            backgroundImage: `url(${background})`,
            borderColor: "#F3F3F3",
          }}
        >
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
    </div>
  );
};

export default TransactionPage;
