import { useRef, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { toast } from "sonner";
import {
  IoBusinessOutline,
  IoCameraOutline,
  IoGlobeOutline,
  IoLockClosedOutline,
  IoTrashOutline,
} from "react-icons/io5";

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

// ─── Toggle row ─────────────────────────────────────────────────────────────

const ToggleRow = ({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <div className="flex items-start justify-between gap-4 py-3.5 border-b border-white/[0.04] last:border-0">
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={15} className="text-[#9B98B0]" />
      </div>
      <div>
        <p className="text-[13px] font-medium text-[#E8E6F2]">{label}</p>
        <p className="text-[12px] text-[#635E7A] mt-0.5">{description}</p>
      </div>
    </div>
    {/* Custom toggle */}
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative flex-shrink-0 mt-0.5 transition-colors duration-200 rounded-full ${checked ? "bg-[#7C3AED]" : "bg-white/[0.10]"}`}
      style={{ width: 40, height: 22 }}
    >
      <span
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-[19px]" : "translate-x-[3px]"}`}
      />
    </button>
  </div>
);

// ─── Delete confirmation modal ─────────────────────────────────────────────

const DeleteConfirmModal = ({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) => {
  const [confirmText, setConfirmText] = useState("");
  const CONFIRM_PHRASE = "delete workspace";
  const canConfirm = confirmText.trim().toLowerCase() === CONFIRM_PHRASE;

  return (
    <div className="px-5 pb-5 pt-4 flex flex-col gap-4">
      <div className="flex items-start gap-3 p-4 bg-red-500/[0.08] border border-red-500/20 rounded-xl">
        <IoTrashOutline size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#9B98B0] leading-relaxed">
          This will <span className="text-red-400 font-semibold">permanently delete</span> all channels, messages, and files. This action cannot be undone.
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] text-[#9B98B0]">
          Type <span className="text-[#E8E6F2] font-medium">"{CONFIRM_PHRASE}"</span> to confirm
        </label>
        <input
          autoFocus
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={CONFIRM_PHRASE}
          className="w-full h-10 px-3 bg-white/[0.04] border border-white/[0.10] rounded-xl text-[13px] text-[#E8E6F2] placeholder:text-[#635E7A] outline-none focus:border-red-500/50"
        />
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 h-10 rounded-xl border border-white/[0.10] text-[#9B98B0] text-[13px] hover:bg-white/[0.05] transition-all">Cancel</button>
        <button
          onClick={onConfirm}
          disabled={!canConfirm}
          className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold transition-all disabled:opacity-30"
        >
          Delete workspace
        </button>
      </div>
    </div>
  );
};

// ─── Component ─────────────────────────────────────────────────────────────

const Workspace = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [name, setName] = useState("Whisper HQ");
  const [slug, setSlug] = useState("whisper-hq");
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [toggles, setToggles] = useState({
    discovery: false,
    memberInvites: true,
    twoFactor: false,
  });

  const toggle = (key: keyof typeof toggles) => {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      toast(next[key] ? `${key} enabled` : `${key} disabled`);
      return next;
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
    toast.success("Logo updated — click Save to apply");
  };

  const handleSave = () => {
    if (!name.trim()) { toast.error("Workspace name is required"); return; }
    toast.success("Workspace settings saved");
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    toast.success("Workspace deletion scheduled");
  };

  return (
    <div>
      {/* Workspace identity */}
      <Section title="Workspace identity" description="Only workspace owners and admins can edit these settings.">
        <div className="flex items-center gap-5 mb-6">
          <div
            className="relative w-16 h-16 rounded-2xl overflow-hidden cursor-pointer group flex-shrink-0"
            onClick={() => fileRef.current?.click()}
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#9333EA] to-[#6D28D9] flex items-center justify-center">
                <span className="text-white font-bold text-[24px]">W</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <IoCameraOutline size={18} className="text-white" />
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
          <div>
            <Button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="h-9 px-4 bg-white/[0.06] hover:bg-white/[0.10] text-[#E8E6F2] text-[13px] font-medium rounded-xl border border-white/[0.08] transition-all"
            >
              Change logo
            </Button>
            <p className="text-[12px] text-[#635E7A] mt-1.5">Square image · PNG or SVG</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 max-w-md">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#9B98B0]">Workspace name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 bg-white/[0.04] border-white/[0.10] text-[#E8E6F2] rounded-xl focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-[#9B98B0]">Workspace URL</label>
            <div className="flex items-center">
              <span className="h-10 px-3 bg-white/[0.02] border border-r-0 border-white/[0.08] rounded-l-xl text-[13px] text-[#635E7A] flex items-center">
                whisper.io/
              </span>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                className="h-10 rounded-l-none bg-white/[0.04] border-white/[0.10] text-[#E8E6F2] rounded-r-xl focus-visible:ring-1 focus-visible:ring-[#7C3AED]/60"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <Button
            type="button"
            onClick={() => { setName("Whisper HQ"); setSlug("whisper-hq"); toast("Changes discarded"); }}
            className="h-9 px-5 bg-transparent border border-white/[0.10] text-[#9B98B0] hover:bg-white/[0.05] rounded-xl text-[13px] transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="h-9 px-5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[13px] transition-all shadow-lg shadow-purple-900/20"
          >
            Save changes
          </Button>
        </div>
      </Section>

      {/* Permissions */}
      <Section title="Permissions" description="Control who can do what in this workspace.">
        <div className="max-w-md">
          <ToggleRow icon={IoGlobeOutline} label="Public workspace discovery" description="Allow people to find and join this workspace from the directory." checked={toggles.discovery} onChange={() => toggle("discovery")} />
          <ToggleRow icon={IoBusinessOutline} label="Allow member invites" description="Let members invite new people without admin approval." checked={toggles.memberInvites} onChange={() => toggle("memberInvites")} />
          <ToggleRow icon={IoLockClosedOutline} label="Require 2FA for all members" description="Enforce two-factor authentication for everyone." checked={toggles.twoFactor} onChange={() => toggle("twoFactor")} />
        </div>
      </Section>

      {/* Danger zone */}
      <Section title="Danger zone">
        <div className="bg-red-500/[0.05] border border-red-500/20 rounded-xl p-5 max-w-md">
          <p className="text-[13px] font-semibold text-red-400 mb-1">Delete this workspace</p>
          <p className="text-[12px] text-[#635E7A] mb-4 leading-relaxed">
            Permanently delete the workspace and all its data. This action cannot be undone.
          </p>
          <Button
            onClick={() => setDeleteOpen(true)}
            className="h-9 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-[13px] font-medium transition-all flex items-center gap-2"
          >
            <IoTrashOutline size={14} />
            Delete workspace
          </Button>
        </div>
      </Section>

      {/* Delete confirmation modal */}
      <Modal isOpen={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete workspace" size="sm">
        <DeleteConfirmModal onClose={() => setDeleteOpen(false)} onConfirm={handleDelete} />
      </Modal>
    </div>
  );
};

export default Workspace;
