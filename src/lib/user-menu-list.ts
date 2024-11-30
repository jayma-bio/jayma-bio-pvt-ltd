
import { Settings, LucideIcon, User, ShoppingBag, Tag } from "lucide-react";


type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getUserMenuList(pathname: string): Group[] {
  const menuList: Group[] = [
    {
      groupLabel: "Contributions",
      menus: [
        {
          href: "/profile/blogs",
          label: "Blogs",
          active: pathname.includes("/blogs"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/profile",
          label: "Profile",
          active: pathname.includes("/profile"),
          icon: User,
          submenus: [],
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Orders",
      menus: [
        {
          href: "/orders",
          label: "Orders",
          active: pathname.includes("/orders"),
          icon: ShoppingBag,
          submenus: [],
        },
      ],
    },
  ];

  return menuList;
}
