import { Menu, type MenuProps } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router";

import { useFlattenedRoutes, usePathname } from "@/router/hooks";
import { BarChartOutlined, DashboardOutlined, UserOutlined } from "@ant-design/icons";

import { themeVars } from "@/theme/theme.css";
import { NAV_HORIZONTAL_HEIGHT } from "../config";

export default function NavHorizontal() {
	const navigate = useNavigate();
	const pathname = usePathname();

        const flattenedRoutes = useFlattenedRoutes();
        const menuList = useMemo(
                () => [
                        {
                                key: "/dashboard/analysis",
                                label: "Dashboard",
                                icon: <DashboardOutlined />,
                        },
                        {
                                key: "/management/system/organization",
                                label: "Ventes",
                                icon: <UserOutlined />,
                        },
                        {
                                key: "/management/system/permission",
                                label: "Stock",
                                icon: <BarChartOutlined />,
                        },
                        {
                                key: "/components/chart",
                                label: "Statistiques",
                                icon: <BarChartOutlined />,
                        },
                ],
                [],
        );

	const selectedKeys = useMemo(() => [pathname], [pathname]);

	const onClick: MenuProps["onClick"] = ({ key }) => {
		const nextLink = flattenedRoutes?.find((el) => el.key === key);
		// Handle special case for external links in menu items
		// For external links: skip internal routing, avoid adding new tab in current project,
		// prevent selecting current route, and open link in new browser tab
		if (nextLink?.hideTab && nextLink?.frameSrc) {
			window.open(nextLink?.frameSrc, "_blank");
			return;
		}
		navigate(key);
	};

	return (
		<div className="w-screen" style={{ height: NAV_HORIZONTAL_HEIGHT }}>
			<Menu
				mode="horizontal"
				items={menuList}
				defaultOpenKeys={[]}
				selectedKeys={selectedKeys}
				onClick={onClick}
				className="!border-none"
				style={{ background: themeVars.colors.background.default }}
			/>
		</div>
	);
}
