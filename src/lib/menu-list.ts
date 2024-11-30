import {
  Tag,
  Settings,
  Bookmark,
  LayoutGrid,
  LucideIcon,
  User,
  User2,
  Cog,
  TagsIcon,
  Workflow,
  Files,
  HeartHandshake,
} from "lucide-react";

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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Store Management",
      menus: [
        {
          href: "/admin/endpoint",
          label: "Store",
          active: false,
          icon: Cog,
          submenus: [
            {
              href: "/admin/endpoint",
              label: "Store Endpoint",
              active: pathname.includes("/admin/endpoint"),
            },
            {
              href: "/admin/payment-management",
              label: "Order Charges",
              active: pathname.includes("/admin/payment-management"),
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Site Management",
      menus: [
        {
          href: "/admin/events",
          label: "Events",
          active: pathname.includes("/admin/events"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/admin/blogs",
          label: "Blogs",
          active: pathname.includes("/admin/blogs"),
          icon: Tag,
          submenus: [],
        },
        {
          href: "/admin/user-blogs",
          label: "User Blogs",
          active: pathname.includes("/admin/user-blogs"),
          icon: TagsIcon,
          submenus: [],
        },
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: User2,
          submenus: [],
        },
        {
          href: "/admin/careers",
          label: "Careers",
          active: pathname.includes("/admin/careers"),
          icon: Workflow,
          submenus: [],
        },
        {
          href: "/admin/policy",
          label: "Return Policy",
          active: pathname.includes("/admin/policy"),
          icon: Files,
          submenus: [],
        },
        {
          href: "/admin/supporter",
          label: "Supported By",
          active: pathname.includes("/admin/supporter"),
          icon: HeartHandshake,
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
  ];
}
