export default function PendingOrdersPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Pending Orders</h1>
        <p className="text-gray-600 mt-1">Orders awaiting processing or fulfillment</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-900">Pending Orders</h3>
            <p className="text-2xl font-bold text-yellow-600">127</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-900">Overdue</h3>
            <p className="text-2xl font-bold text-red-600">8</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900">Processing</h3>
            <p className="text-2xl font-bold text-blue-600">34</p>
          </div>
        </div>

        <div className="border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">#ORD-2024-001</td>
                <td className="px-4 py-3 text-sm text-gray-900">Alice Johnson</td>
                <td className="px-4 py-3 text-sm text-gray-900">₦45,000</td>
                <td className="px-4 py-3">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Jan 15, 2024</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">#ORD-2024-002</td>
                <td className="px-4 py-3 text-sm text-gray-900">Michael Brown</td>
                <td className="px-4 py-3 text-sm text-gray-900">₦78,500</td>
                <td className="px-4 py-3">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Overdue</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">Jan 12, 2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
