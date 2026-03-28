import type { AuthClientSession } from "./auth-client";

const isAuthenticated = (session: AuthClientSession) => {
  return Boolean(session?.user);
};

export { isAuthenticated };
