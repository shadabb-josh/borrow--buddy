import {
  Filter,
  History,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllTransactionQuery } from "../../features/user/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../../features/user/userSlice";
import { RootState } from "../../app/store";

interface Transaction {
  id: number;
  user_id: number;
  amount: number;
  transaction_type: "credit" | "debit";
  created_at: string;
}

const Transactions = () => {
  const [filterType, setFilterType] = useState<
    "all" | Transaction["transaction_type"]
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 7;

  const dispatch = useDispatch();
  const transactions = useSelector(
    (state: RootState) => state.user.transactions
  ) as Transaction[] | undefined;

  const userId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("token") || "";
  const { data, isLoading, error } = useGetAllTransactionQuery({
    id: userId,
    token,
  });

  useEffect(() => {
    if (data) {
      dispatch(setTransactions(data));
    }
  }, [data, dispatch]);

  const filteredTransactions = (transactions ?? []).filter((tx) => {
    const matchesType =
      filterType !== "all" ? tx.transaction_type === filterType : true;
    const matchesSearch = searchQuery
      ? tx.id.toString().includes(searchQuery) ||
        tx.amount.toString().includes(searchQuery)
      : true;
    const txDate = new Date(tx.created_at);
    const matchesDateRange =
      dateRange.start && dateRange.end
        ? txDate >= new Date(dateRange.start) &&
          txDate <= new Date(dateRange.end)
        : true;

    return matchesType && matchesSearch && matchesDateRange;
  });

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery, dateRange]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTransactionStyles = (type: Transaction["transaction_type"]) => {
    return type === "credit"
      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
      : "bg-rose-100 text-rose-700 border border-rose-200";
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <History size={24} className="text-blue-600" />
            <span>Transaction History</span>
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Type filter */}
          <div className="relative w-full md:w-1/3 lg:w-1/4">
            <Filter className="absolute left-3 top-3 text-gray-500" size={18} />
            <select
              className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              value={filterType}
              onChange={(e) =>
                setFilterType(
                  e.target.value as "all" | Transaction["transaction_type"]
                )
              }
            >
              <option value="all">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search transactions"
              className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Date Range */}
          <div className="flex w-full md:w-1/3 gap-2">
            <div className="relative w-1/2">
              <Calendar
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                type="date"
                className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, start: e.target.value }))
                }
              />
            </div>
            <div className="relative w-1/2">
              <Calendar
                className="absolute left-3 top-3 text-gray-500"
                size={18}
              />
              <input
                type="date"
                className="w-full pl-10 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({ ...prev, end: e.target.value }))
                }
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-lg text-center">
            Failed to load transactions. Please try again later.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((tx) => (
                      <tr
                        key={tx.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 py-3 text-sm text-gray-500">
                          #{tx.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-800">
                          {formatDate(tx.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getTransactionStyles(
                              tx.transaction_type
                            )}`}
                          >
                            {tx.transaction_type}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-sm">
                          ₹{tx.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center py-10 text-gray-500"
                      >
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
