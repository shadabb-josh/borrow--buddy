import { LogOut } from "lucide-react";

function MobileLogoutButton() {
  return (
    <div className="flex md:hidden justify-end mb-4">
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2">
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
}

export default MobileLogoutButton;
