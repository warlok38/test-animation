import { routes } from "@/pages/routes";
import { Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { Link } from "react-router";
import * as S from "./AppHeader.styled";

export const AppHeader = () => {
  const map = {
    main: "Главная",
    scene: "Сцена 1",
    scene2: "Сцена 2",
    fallGuysGame: "FALL GUYS",
  };

  const items: ItemType<MenuItemType>[] = routes
    .map(({ id, path }) => {
      if (!path || !id) {
        return {
          key: 0,
          label: <Link to="/">На главную</Link>,
        };
      }
      return {
        key: id,
        label: (
          <Link to={path}>
            {id && id !== "notFound"
              ? map[id as keyof typeof map] || "Без названия"
              : null}
          </Link>
        ),
      };
    })
    .filter((item) => item !== null);

  return (
    <S.Header>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ flex: 1, minWidth: 0 }}
      />
    </S.Header>
  );
};
