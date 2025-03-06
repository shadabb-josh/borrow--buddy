const tableHeadings = {
  Users: ["ID", "Name", "Email", "PAN", "Aadhaar", "Status"],
  Loans: [
    "ID",
    "Borrower ID",
    "Lender ID",
    "Purpose",
    "Interest",
    "Amount",
    "Status",
    "Total Return",
    "Expected Return",
    "Repayment Till",
  ],
  Repayments: ["ID", "Loan ID", "Amount Paid", "Payment Date"],
  Transactions: [
    "ID",
    "User ID",
    "Loan ID",
    "Amount",
    "Transaction Type",
    "Transaction Date",
  ],
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });
}



function TableComponent({ data, type }) {  

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[1000px] w-full divide-y-1 divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              {tableHeadings[type]?.map((heading, index) => (
                <th
                  key={index}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {type === "Users" &&
              data.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">{`${record.first_name} ${record.last_name}`}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.pan_number}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.adhaar_number}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.status}
                  </td>
                </tr>
              ))}

            {type === "Loans" &&
              data.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {record.borrower_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.lender_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.purpose}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.interest}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.amount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.status}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.total_return}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.expected_return}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.repayment_till}
                  </td>
                </tr>
              ))}

            {type === "Repayments" &&
              data.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {record.loan_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.amount_paid}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {formatDate(record.created_at)}
                  </td>
                </tr>
              ))}

            {type === "Transactions" &&
              data.map((record, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">
                    {record.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                    {record.user_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.loan_id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.amount}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {record.transaction_type}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600 font-medium">
                    {formatDate(formatDate(record.created_at))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableComponent;
