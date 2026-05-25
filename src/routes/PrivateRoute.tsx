import { Navigate } from "react-router-dom";
import { session } from "../services/api";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  if (!session.isLogado()) {
    return <Navigate to="/" />;
  }

  return children;
}
