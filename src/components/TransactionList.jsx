import React, { useState, useEffect, useRef } from "react";

import TransactionListRow from "./TransactionListRow";
import Heading from "../components/common/heading";
import PaginationPanel from "./common/pagination";
import { searchTransactions } from "../services/bankTransactionsService";

const TransactionList = ({ searchData, onTransactionUpdated }) => {
  const [editInProgress, setEditInProgress] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(100);
  const [itemCount, setItemCount] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    console.info("useEffect...");
    loadTable(currentPage);
  }, [searchData]);

  const loadTable = async (page) => {
    console.info("object...", page, pageSize, searchData);
    const searchResult = await searchTransactions(
      page,
      pageSize,
      searchData,
      false
    );
    console.info("count..", searchResult.totalCount);
    setTransactions(searchResult.transactions);
    setItemCount(searchResult.totalCount);
    ref.current.scrollIntoView();
  };

  const handleDoneCategoryEdit = (updated) => {
    setEditInProgress(false);
    onTransactionUpdated(updated);
  };

  const handleFirst = async () => {
    if (currentPage > 0) {
      setCurrentPage(1);
      await loadTable(1);
    }
  };

  const handlePrevious = async () => {
    if (currentPage > 0) {
      const page = currentPage - 1;
      setCurrentPage(page);
      await loadTable(page);
    }
  };

  const handleNext = async () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      const page = currentPage + 1;
      console.log("Next: ", currentPage, page);
      setCurrentPage(page);
      await loadTable(page);
    }
  };

  const handleLast = async () => {
    const totalPages = getTotalPages();
    setCurrentPage(totalPages);
    await loadTable(totalPages);
  };

  const getTotalPages = () => {
    const pages = Math.ceil(itemCount / pageSize);
    return pages;
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <div ref={ref}>
        <Heading title="Transactions" />
      </div>
      <table className="mymoney-table trans-list-table">
        <thead>
          <tr>
            <th colSpan="8">
              <PaginationPanel
                onFirst={handleFirst}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onLast={handleLast}
                currentPage={currentPage}
                totalPages={getTotalPages()}
                itemCount={itemCount}
              />
            </th>
          </tr>
          <tr>
            <th></th>
            <th>Date</th>
            <th>Narrative</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Category</th>
            <th>Trans Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, i) => (
            <TransactionListRow
              key={i}
              item={item}
              index={i + 1}
              editInProgress={editInProgress}
              onAdd={() => setEditInProgress(true)}
              onUpdate={handleDoneCategoryEdit}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8">
              <PaginationPanel
                onFirst={handleFirst}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onLast={handleLast}
                currentPage={currentPage}
                totalPages={getTotalPages()}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default TransactionList;
