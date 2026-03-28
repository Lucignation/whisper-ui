import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { userAccountPasswordSchema } from "../../../../schemas/user-account.schema";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "sonner";

const PasswordField = ({
  label,
  placeholder,
  registration,
  error,
}: {
  label: string;
  placeholder: string;
  registration: any;
  error?: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#9B98B0]">{label}</label>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          {...registration}
          className="h-10 pr-10 bg-white/[0.04] border-white/[0.10] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#635E7A] hover:text-[#9B98B0] transition-colors"
        >
          {show ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
        </button>
      </div>
      {error && <p className="text-[12px] text-red-400">{error}</p>}
    </div>
  );
};

const PasswordManagement = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    resolver: yupResolver(userAccountPasswordSchema),
  });

  const onSubmit = (_values: any) => {
    toast.success("Password updated successfully");
    reset();
  };

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-[15px] font-semibold text-[#E8E6F2]">Password & security</h2>
        <p className="text-[13px] text-[#635E7A] mt-0.5">Enter your current password to set a new one.</p>
      </div>

      <div className="flex flex-col gap-4 max-w-sm">
        <PasswordField label="Current password" placeholder="Current password" registration={register("currentPassword")} error={errors.currentPassword?.message} />
        <PasswordField label="New password" placeholder="New password" registration={register("newPassword")} error={errors.newPassword?.message} />
        <PasswordField label="Confirm new password" placeholder="Retype new password" registration={register("confirmPassword")} error={errors.confirmPassword?.message} />
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button
          type="button"
          onClick={() => { reset(); toast("Changes discarded"); }}
          className="h-9 px-5 bg-transparent border border-white/[0.10] text-[#9B98B0] hover:bg-white/[0.05] rounded-xl text-[13px] transition-all"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          className="h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[13px] transition-all shadow-lg shadow-purple-900/20"
        >
          Update password
        </Button>
      </div>
    </div>
  );
};

export default PasswordManagement;
