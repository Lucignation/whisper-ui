import { HiMiniMagnifyingGlass, HiOutlineVideoCamera } from "react-icons/hi2";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../../../../components/ui/alert-dialog";
import { IoCallOutline } from "react-icons/io5";

const PanelHeader = () => {
  return (
    <div className="flex items-center px-[18px] py-[5px] justify-between w-[100%] border-b border-[#00000010]">
      <div className="text-[30px] w-[40px] h-[40px] rounded-full overflow-hidden">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <img
              src="https://thumbs.dreamstime.com/b/portrait-small-business-owner-smiling-standing-behind-counter-inside-coffee-shop-holding-cup-successful-young-man-working-141630877.jpg"
              alt="staff"
              className="w-[70px] h-full rounded-full"
            />
          </AlertDialogTrigger>

          <AlertDialogContent>
            <img
              src="https://thumbs.dreamstime.com/b/portrait-small-business-owner-smiling-standing-behind-counter-inside-coffee-shop-holding-cup-successful-young-man-working-141630877.jpg"
              alt="staff"
              className=""
            />
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="leading-[.6]">
        <p className="text-[18px] font-medium">Gerald Olumide 🤗</p>
        <p className="text-[12px]">last seen 34 minutes ago </p>
      </div>
      <div className="flex items-center gap-[10px]">
        <HiMiniMagnifyingGlass size={20} color="#201E4380" className="" />
        <IoCallOutline size={20} color="#201E4380" />
        <HiOutlineVideoCamera size={20} color="#201E4380" />
      </div>
    </div>
  );
};

export default PanelHeader;
