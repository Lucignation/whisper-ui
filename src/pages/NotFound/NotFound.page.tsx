import { Link } from "react-router-dom";
import Notfound from "../../assets/404.gif";
import { Button } from "../../components/ui/button";

const NotFound = () => {
  return (
    <div className="relative h-[100%]">
      <div className="absolute bottom-[20px] flex w-full flex-col  justify-center items-center">
        <h1>Seems like you you're lost!</h1>
        <Link
          to="/"
          className="bg-[#201E43] hover:text-[#eee] text-center py-[5px] w-[200px] rounded-md text-[#eee]"
        >
          Back home
        </Link>
      </div>
      <img
        className="h-[100vh] w-full mt-0"
        src={Notfound}
        alt="Page not found"
      />
    </div>
  );
};

export default NotFound;
