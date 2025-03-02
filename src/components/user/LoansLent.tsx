import { ArrowDownRight, ArrowUpRight, DollarSign, Wallet } from "lucide-react"


interface LoanStatistics {
    borrowed: number;
    borrowedTotal: number;
    borrowedGrowth: number;
    lent: number;
    lentTotal: number;
    lentGrowth: number;
  }
  
  interface Transaction {
    id: string;
    date: string;
    type: "borrowed" | "lent" | "repaid" | "received";
    amount: number;
    counterparty: string;
    status: "completed" | "pending" | "failed";
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

function LoansLent() {
    const loanStats: LoanStatistics = {
        borrowed: 2,
        borrowedTotal: 125000,
        borrowedGrowth: 8, // 8% increase
        lent: 2,
        lentTotal: 90000,
        lentGrowth: 12, // 12% increase
      };
    
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
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
    <h3 className="text-lg md:text-xl text-black mb-3 md:mb-4 flex items-center gap-2">
      <Wallet size={22} /> Loans Lent
    </h3>
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 md:mb-6">
      <div>
        <p className="text-base md:text-lg text-gray-700 flex items-center gap-2">
          <DollarSign size={18} /> Total Lent: ₹
          {loanStats.lentTotal.toLocaleString()}
        </p>
        <p
          className={`text-xs md:text-sm mt-1 flex items-center gap-1 ${
            loanStats.lentGrowth >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {loanStats.lentGrowth >= 0 ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {loanStats.lentGrowth >= 0
            ? `+${loanStats.lentGrowth}% Growth`
            : `${loanStats.lentGrowth}% Decline`}
        </p>
      </div>
      <div className="bg-black text-white px-3 md:px-4 py-1 md:py-2 rounded-lg text-sm">
        Active Loans: {loanStats.lent}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      {transactions
        .filter((tx) => tx.type === "lent")
        .map((tx) => (
          <div
            key={tx.id}
            className="border p-3 md:p-4 rounded-lg hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs md:text-sm text-gray-500">
                {formatDate(tx.date)}
              </span>
              <span
                className={`text-xs px-2 py-0.5 md:py-1 rounded-full ${getTransactionStatusColor(
                  tx.status
                )}`}
              >
                {tx.status}
              </span>
            </div>
            <p className="text-base md:text-lg font-medium">
              ₹{tx.amount.toLocaleString()}
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              To: {tx.counterparty}
            </p>
          </div>
        ))}
    </div>
  </div>
  )
}

export default LoansLent