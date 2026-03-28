import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "bg-[#1C1E27] border border-white/[0.10] text-[#E8E6F2] shadow-2xl rounded-xl",
        description: "text-[#9B98B0]",
        actionButton: "bg-[#7C3AED] text-white",
        cancelButton: "bg-white/[0.06] text-[#9B98B0]",
        success: "border-green-500/20",
        error: "border-red-500/20",
      },
    }}
    {...props}
  />
);

export { Toaster };
