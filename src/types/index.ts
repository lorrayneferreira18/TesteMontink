// src/types/index.ts
export interface NavItemDropdown {
  href: string;
  text: string;
}

export interface NavItem {
  id: number;
  title: string;
  href: string;
  type: string;
  dropdownItems: {
    href: string;
    text: string;
  }[];
}

export interface NavbarProps {
  navItems: NavItem[];
  onOrderChange: (newOrder: NavItem[]) => void;
}

export interface ComponentItem {
  id: number;
  name: string;
  component: React.ReactNode;
}
