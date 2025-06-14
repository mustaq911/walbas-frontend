import { getUsers } from '@/lib/api';
import UsersTable from '../UsersTable';

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add User
        </button>
      </div>
      
      <UsersTable users={users} />
    </div>
  );
}