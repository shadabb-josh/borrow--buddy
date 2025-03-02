import {
  ArrowDown,
  ArrowDownRight,
  ArrowUp,
  ArrowUpRight,
  Download,
  Filter,
  History,
  Search,
} from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  date: string;
  type: "borrowed" | "lent" | "repaid" | "received";
  amount: number;
  counterparty: string;
  status: "completed" | "pending" | "failed";
}

const transactions: Transaction[] = [
  {
    id: "tx001",
    date: "2024-05-15",
    type: "borrowed",
    amount: 75000,
    counterparty: "Rajesh Mehta",
    status: "completed",
  },
  {
    id: "tx002",
    date: "2024-05-02",
    type: "borrowed",
    amount: 50000,
    counterparty: "Ankit Kumar",
    status: "completed",
  },
  {
    id: "tx003",
    date: "2024-04-20",
    type: "lent",
    amount: 40000,
    counterparty: "Priya Sharma",
    status: "completed",
  },
  {
    id: "tx004",
    date: "2024-04-10",
    type: "repaid",
    amount: 25000,
    counterparty: "Rajesh Mehta",
    status: "completed",
  },
  {
    id: "tx005",
    date: "2024-03-28",
    type: "lent",
    amount: 50000,
    counterparty: "Vikram Singh",
    status: "completed",
  },
  {
    id: "tx006",
    date: "2024-03-15",
    type: "received",
    amount: 15000,
    counterparty: "Priya Sharma",
    status: "completed",
  },
  {
    id: "tx007",
    date: "2024-05-18",
    type: "repaid",
    amount: 15000,
    counterparty: "Ankit Kumar",
    status: "pending",
  },
  {
    id: "tx008",
    date: "2024-05-10",
    type: "received",
    amount: 10000,
    counterparty: "Vikram Singh",
    status: "pending",
  },
];

function Transactions() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<string>("date");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "borrowed":
        return <ArrowDownRight className="text-blue-600" size={18} />;
      case "lent":
        return <ArrowUpRight className="text-purple-600" size={18} />;
      case "repaid":
        return <ArrowUpRight className="text-red-600" size={18} />;
      case "received":
        return <ArrowDownRight className="text-green-600" size={18} />;
      default:
        return <History size={18} />;
    }
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTransactions = transactions
    .filter((tx) => {
      if (filterType !== "all" && tx.type !== filterType) return false;

      const searchLower = searchQuery.toLowerCase();
      return (
        tx.id.toLowerCase().includes(searchLower) ||
        tx.counterparty.toLowerCase().includes(searchLower) ||
        tx.amount.toString().includes(searchLower) ||
        tx.status.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortField === "amount") {
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (sortField === "counterparty") {
        return sortDirection === "asc"
          ? a.counterparty.localeCompare(b.counterparty)
          : b.counterparty.localeCompare(a.counterparty);
      }
      return 0;
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl text-black flex items-center gap-2">
          <History size={22} /> Transaction History
        </h3>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4 mb-4 md:mb-6">
        <div className="relative flex-grow">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 px-4 py-2 border rounded-lg text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="relative sm:w-1/3 md:w-1/4">
          <span className="absolute left-3 top-2.5 text-gray-500">
            <Filter size={16} />
          </span>
          <select
            className="w-full pl-10 px-4 py-2 border rounded-lg appearance-none bg-white pr-8 text-sm"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="borrowed">Borrowed</option>
            <option value="lent">Lent</option>
            <option value="repaid">Repaid</option>
            <option value="received">Received</option>
          </select>
        </div>
      </div>

      {/* Transactions Table - Responsive approach */}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="min-w-full px-4 md:px-0">
          {/* Desktop View */}
          <table className="min-w-full border-collapse hidden sm:table">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 md:px-4 py-2 text-left text-gray-600 text-sm">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("date")}
                  >
                    Date
                    {sortField === "date" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="px-3 md:px-4 py-2 text-left text-gray-600 text-sm">
                  Type
                </th>
                <th className="px-3 md:px-4 py-2 text-left text-gray-600 text-sm">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("amount")}
                  >
                    Amount
                    {sortField === "amount" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="px-3 md:px-4 py-2 text-left text-gray-600 text-sm">
                  <button
                    className="flex items-center gap-1"
                    onClick={() => handleSort("counterparty")}
                  >
                    Counterparty
                    {sortField === "counterparty" &&
                      (sortDirection === "asc" ? (
                        <ArrowUp size={14} />
                      ) : (
                        <ArrowDown size={14} />
                      ))}
                  </button>
                </th>
                <th className="px-3 md:px-4 py-2 text-left text-gray-600 text-sm">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 md:px-4 py-2 md:py-3 text-gray-800 text-sm">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 text-sm">
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(tx.type)}
                      <span className="capitalize">{tx.type}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 font-medium text-sm">
                    ₹{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3 text-gray-800 text-sm">
                    {tx.counterparty}
                  </td>
                  <td className="px-3 md:px-4 py-2 md:py-3">
                    <span
                      className={`text-xs px-2 py-0.5 md:py-1 rounded-full ${getTransactionStatusColor(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile View - Cards */}
          <div className="sm:hidden space-y-3">
            {filteredTransactions.map((tx) => (
              <div
                key={tx.id}
                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500">
                    {formatDate(tx.date)}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getTransactionStatusColor(
                      tx.status
                    )}`}
                  >
                    {tx.status}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1 text-sm">
                    {getTransactionIcon(tx.type)}
                    <span className="capitalize">{tx.type}</span>
                  </div>
                  <span className="font-medium text-sm">
                    ₹{tx.amount.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  {tx.type === "lent" ? "To: " : "From: "}
                  {tx.counterparty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-6 md:py-8 text-gray-500">
          No transactions match your search criteria
        </div>
      )}

      <div className="mt-4 text-xs md:text-sm text-gray-500 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div>
          Showing {filteredTransactions.length} of {transactions.length}{" "}
          transactions
        </div>
        <div className="flex space-x-2">
          <button className="px-2 md:px-3 py-1 border rounded hover:bg-gray-100 transition text-sm">
            Previous
          </button>
          <button className="px-2 md:px-3 py-1 border rounded bg-black text-white hover:bg-gray-800 transition text-sm">
            1
          </button>
          <button className="px-2 md:px-3 py-1 border rounded hover:bg-gray-100 transition text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
