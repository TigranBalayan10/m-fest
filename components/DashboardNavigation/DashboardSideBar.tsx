import Link from "next/link";
import { FaBoxArchive, FaInbox, FaUsers } from "react-icons/fa6";

const DashboardSideBar = () => {
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            href="/dashboard/inbox"
          >
            <FaInbox />
            Inbox
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            href="/dashboard/archive"
          >
            <FaBoxArchive />
            Archive
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-200"
            href="/dashboard/customers"
          >
            <FaUsers />
            Customers
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashboardSideBar;
