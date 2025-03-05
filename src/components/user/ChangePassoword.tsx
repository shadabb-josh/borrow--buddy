import { CheckCircle, LockKeyhole } from "lucide-react"

function ChangePassoword() {
  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg md:text-xl text-black mb-4 flex items-center gap-2">
              <LockKeyhole size={22} /> Change Password
            </h3>
            <form className="space-y-4">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <LockKeyhole size={18} />
                </span>
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full pl-10 px-4 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <LockKeyhole size={18} />
                </span>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full pl-10 px-4 py-2 border rounded-lg text-sm"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500">
                  <LockKeyhole size={18} />
                </span>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full pl-10 px-4 py-2 border rounded-lg text-sm"
                />
              </div>
              <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm">
                <CheckCircle size={18} /> Update Password
              </button>
            </form>
          </div>
  )
}

export default ChangePassoword