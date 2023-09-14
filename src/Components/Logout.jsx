import { toast } from "react-hot-toast";
import { useUser } from "../context/Usercontext";
import Button from "./Button";
export default function Logout() {
  const { logout } = useUser();
  function handleClick(){
    logout()
    toast.success('Logged out')
  }
  return (
    <div className="space-x-5 flex justify-end p-7">
      <Button onClick={handleClick} type='primary'>Logout</Button>
    </div>
  );
}
