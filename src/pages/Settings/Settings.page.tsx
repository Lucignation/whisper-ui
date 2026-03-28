import ContentLayout from "../../DashboardLayout/DashboardLayout";
import { Tabs } from "radix-ui";
import { settingsTab } from "../../data/settingsTab";
import Workspace from "./Workspace/Workspace";
import UserAccount from "./UserAccount/UserAccount";
import UserManagement from "./UserManagement/UserManagement";

const Settings = () => {
  return (
    <ContentLayout>
      <div className="flex-1 overflow-y-auto bg-[#12111A]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-[24px] font-bold text-[#E8E6F2] tracking-tight">Settings</h1>
            <p className="text-[14px] text-[#635E7A] mt-1">
              Manage your account, workspace, and preferences.
            </p>
          </div>

          <Tabs.Root defaultValue="tab1" orientation="vertical" className="flex gap-3 min-h-[600px]">
            {/* Tab list */}
            <Tabs.List
              aria-label="Settings tabs"
              aria-orientation="vertical"
              className="flex flex-col gap-1 w-[220px] flex-shrink-0"
            >
              {settingsTab.map((s: any) => (
                <Tabs.Trigger
                  key={s.value}
                  value={s.value}
                  className="
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] text-left w-full transition-all duration-150
                    text-[#635E7A] hover:text-[#9B98B0] hover:bg-white/[0.04]
                    data-[state=active]:bg-[#2D2157] data-[state=active]:text-[#C084FC] data-[state=active]:font-medium
                    focus:outline-none
                  "
                >
                  <span className="text-[16px] flex-shrink-0">
                    <s.Icon />
                  </span>
                  {s.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* Tab content */}
            <div className="flex-1 min-w-0 bg-[#1C1E27] border border-white/[0.07] rounded-2xl p-6 overflow-y-auto">
              <Tabs.Content value={settingsTab[0].value}>
                <UserAccount />
              </Tabs.Content>
              <Tabs.Content value={settingsTab[1].value}>
                <Workspace />
              </Tabs.Content>
              <Tabs.Content value={settingsTab[2].value}>
                <SsoTab />
              </Tabs.Content>
              <Tabs.Content value={settingsTab[3].value} className="w-full">
                <UserManagement />
              </Tabs.Content>
              <Tabs.Content value={settingsTab[4].value}>
                <BillingTab />
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </ContentLayout>
  );
};

// ─── Placeholder tabs ──────────────────────────────────────────────────────────

const SsoTab = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
      <span className="text-2xl">🔐</span>
    </div>
    <h2 className="text-[18px] font-semibold text-[#E8E6F2] mb-2">Single Sign-On</h2>
    <p className="text-[14px] text-[#635E7A] max-w-sm leading-relaxed">
      SSO configuration is available on the Enterprise plan. Upgrade to enable
      SAML 2.0 and OIDC integrations.
    </p>
    <button className="mt-6 px-5 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[13px] transition-all duration-150 shadow-lg shadow-purple-900/30">
      Upgrade to Enterprise
    </button>
  </div>
);

const BillingTab = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-4">
      <span className="text-2xl">💳</span>
    </div>
    <h2 className="text-[18px] font-semibold text-[#E8E6F2] mb-2">Billing & Plans</h2>
    <p className="text-[14px] text-[#635E7A] max-w-sm leading-relaxed">
      You're currently on the <span className="text-[#A78BFA] font-medium">Free plan</span>.
      Upgrade to unlock unlimited history and advanced features.
    </p>
    <div className="mt-6 bg-gradient-to-br from-[#2D1F52] to-[#1C1040] border border-[#7C3AED]/20 rounded-2xl p-5 text-left w-full max-w-xs">
      <p className="text-[13px] text-[#A78BFA] font-semibold mb-1">Pro Plan</p>
      <p className="text-[24px] font-bold text-[#E8E6F2]">$7.25 <span className="text-[13px] text-[#635E7A] font-normal">/ person / month</span></p>
      <button className="mt-4 w-full py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold rounded-xl text-[13px] transition-all duration-150 shadow-lg shadow-purple-900/30">
        Upgrade now
      </button>
    </div>
  </div>
);

export default Settings;
