import { Navigate } from "react-router-dom";
import useOrder from "../globalState/useOrder";

export default function RequireOrder({ children }: any) {
  const { orderList } = useOrder();
  if (orderList.length > 0) {
    return children;
  } else {
    return <Navigate to={"/cashier"} />;
  }
}
