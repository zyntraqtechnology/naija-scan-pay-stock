export default function AdminsPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Users</h1>
        <p className="text-gray-600 mt-1">Manage admin user accounts and permissions</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-purple-900">Total Admins</h3>
            <p className="text-2xl font-bold text-purple-600">45</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-900">Active Today</h3>
            <p className="text-2xl font-bold text-green-600">32</p>
          </div>
        </div>

        <div className="border rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">John Doe</td>
                <td className="px-4 py-3 text-sm text-gray-600">john@oranjpay.com</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Admin</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">2 hours ago</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm text-gray-900">Sarah Wilson</td>
                <td className="px-4 py-3 text-sm text-gray-600">sarah@oranjpay.com</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Admin</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
