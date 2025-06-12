import { Suspense, lazy } from "react";
import { Navigate, Outlet } from "react-router";

import { SvgIcon } from "@/components/icon";
import { CircleLoading } from "@/components/loading";

import type { AppRouteObject } from "#/router";

// Pages importées
const ProfilePage = lazy(() => import("@/pages/management/user/profile"));
const AccountPage = lazy(() => import("@/pages/management/user/account"));

const Blog = lazy(() => import("@/pages/management/blog"));
const OrganizationPage = lazy(() => import("@/pages/management/system/organization"));
const PermissionPage = lazy(() => import("@/pages/management/system/permission"));
const RolePage = lazy(() => import("@/pages/management/system/role"));
const UserPage = lazy(() => import("@/pages/management/system/user"));
const UserDetailPage = lazy(() => import("@/pages/management/system/user/detail"));

// ✅ Section principale "Management" sans "Stock"
const management: AppRouteObject = {
	order: 2,
	path: "management",
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: "Gestion",
		icon: <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />,
		key: "/management",
	},
	children: [
		{
			index: true,
			element: <Navigate to="user" replace />,
		},
		{
			path: "user",
			meta: { label: "Utilisateur", key: "/management/user" },
			children: [
				{
					index: true,
					element: <Navigate to="profile" replace />,
				},
				{
					path: "profile",
					element: <ProfilePage />,
					meta: {
						label: "Profil",
						key: "/management/user/profile",
					},
				},
				{
					path: "account",
					element: <AccountPage />,
					meta: {
						label: "Compte",
						key: "/management/user/account",
					},
				},
			],
		},
               {
                       path: "system",
                       meta: { label: "Système", key: "/management/system" },
                       children: [
                               {
                                       path: "organization",
                                       element: <OrganizationPage />,
                                       meta: {
                                               label: "Organization",
                                               key: "/management/system/organization",
                                       },
                               },
                               {
                                       path: "permission",
                                       element: <PermissionPage />,
                                       meta: {
                                               label: "Permission",
                                               key: "/management/system/permission",
                                       },
                               },
                               {
                                       path: "role",
                                       element: <RolePage />,
                                       meta: {
                                               label: "Role",
                                               key: "/management/system/role",
                                       },
                               },
                               {
                                       path: "user",
                                       element: <UserPage />,
                                       meta: {
                                               label: "User",
                                               key: "/management/system/user",
                                       },
                               },
                               {
                                       path: "user/:id",
                                       element: <UserDetailPage />,
                                       meta: {
                                               label: "User Detail",
                                               key: "/management/system/user_detail",
                                       },
                               },
                       ],
               },
		{
			path: "blog",
			element: <Blog />,
			meta: { label: "Blog", key: "/management/blog" },
		},
	],
};

export default management;
