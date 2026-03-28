import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { userAccountSchema } from "../../../schemas/user-account.schema";
import PasswordManagement from "./PasswordManagement/PasswordManagement";
import { IoCameraOutline } from "react-icons/io5";
import { toast } from "sonner";

// ─── Section wrapper ────────────────────────────────────────────────────────

const Section = ({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) => (
  <div className="pb-8 mb-8 border-b border-white/[0.06] last:border-0 last:pb-0 last:mb-0">
    <div className="mb-5">
      <h2 className="text-[15px] font-semibold text-[#E8E6F2]">{title}</h2>
      {description && <p className="text-[13px] text-[#635E7A] mt-0.5">{description}</p>}
    </div>
    {children}
  </div>
);

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[13px] font-medium text-[#9B98B0]">{label}</label>
    {children}
    {error && <p className="text-[12px] text-red-400">{error}</p>}
  </div>
);

// ─── Component ─────────────────────────────────────────────────────────────

const UserAccount = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: "James", lastName: "Henry", phone: "(030) 459-50300" as any },
    resolver: yupResolver(userAccountSchema),
  });

  const onSubmit = (values: any) => {
    console.log("user account", values);
    toast.success("Profile saved successfully");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) { toast.error("File must be under 15 MB"); return; }
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    toast.success("Photo updated — click Save to apply");
  };

  return (
    <div>
      {/* Profile photo */}
      <Section title="Profile photo" description="PNG or JPEG under 15 MB">
        <div className="flex items-center gap-5">
          <div
            className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer group flex-shrink-0"
            onClick={() => fileRef.current?.click()}
          >
            <img
              src={preview ?? "https://i.pravatar.cc/150?img=12"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <IoCameraOutline size={18} className="text-white" />
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="h-9 px-4 bg-white/[0.06] hover:bg-white/[0.10] text-[#E8E6F2] text-[13px] font-medium rounded-xl border border-white/[0.08] transition-all"
            >
              Upload new photo
            </Button>
            {preview && (
              <button
                type="button"
                onClick={() => { setPreview(null); toast("Photo removed"); }}
                className="text-[12px] text-red-400 hover:text-red-300 transition-colors text-left"
              >
                Remove photo
              </button>
            )}
            {!preview && <p className="text-[12px] text-[#635E7A]">Click the avatar or button to upload</p>}
          </div>
        </div>
      </Section>

      {/* Personal info */}
      <Section title="Personal information" description="Update your name and contact details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <Field label="First name" error={errors.firstName?.message}>
            <Input
              placeholder="First name"
              {...register("firstName")}
              className="h-10 bg-white/[0.04] border-white/[0.10] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
            />
          </Field>
          <Field label="Last name" error={errors.lastName?.message}>
            <Input
              placeholder="Last name"
              {...register("lastName")}
              className="h-10 bg-white/[0.04] border-white/[0.10] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
            />
          </Field>
          <Field label="Phone number">
            <Input
              placeholder="(000) 000-0000"
              {...register("phone")}
              className="h-10 bg-white/[0.04] border-white/[0.10] text-[#E8E6F2] placeholder:text-[#635E7A] rounded-xl focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
            />
          </Field>
          <Field label="Email address">
            <Input
              type="email"
              value="james@whisper.io"
              disabled
              className="h-10 bg-white/[0.02] border-white/[0.06] text-[#635E7A] rounded-xl cursor-not-allowed"
            />
          </Field>
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
            Save changes
          </Button>
        </div>
      </Section>

      {/* Password */}
      <PasswordManagement />
    </div>
  );
};

export default UserAccount;
