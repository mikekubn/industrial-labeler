import { authClient } from "@/lib/auth-client";

const fetchAllUsers = async () => {
  const { data: users, error: e } = await authClient.admin.listUsers({
    query: {
      limit: 50,
      offset: 0
    }
  });
  if (e) {
    return {
      users: [],
      error: e
    };
  }
  return {
    users: users.users,
    error: null
  };
};

export { fetchAllUsers };
