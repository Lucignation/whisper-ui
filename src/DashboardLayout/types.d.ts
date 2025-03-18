export type ContentProps = {
  children?: ReactNode;
  headerChildren?: ReactNode;
};

export type DashboardNavLinkInformationType = {
  key: string;
  icon: ReactNode;
  label: string | ReactNode;
  permissions?: string[];
};

export type DashboardHeaderProps = {
  children?: ReactNode;
  headerChildren?: ReactNode;
  toggleSider: () => void;
};
