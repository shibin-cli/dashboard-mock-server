import Mock from "mockjs";
import type { MockItem } from "../types";
import { sign } from "jsonwebtoken";
import { publicKey } from "../config";

const Random = Mock.Random;
const userMock: MockItem[] = [
  {
    url: "/profile",
    method: "get",
    response(ctx) {
      const { user } = ctx.state;
      return {
        errno: 0,
        data: {
          username: user.username,
          id: user.id,
          nickname: Random.cname(),
          avatar:
            "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80",
        },
      };
    },
  },
  {
    url: "/login",
    method: "post",
    response(ctx) {
      const { username } = ctx.request.body;
      return {
        errno: 0,
        data: {
          token: sign(
            {
              username,
              id: Random.id(),
            },
            publicKey,
            { expiresIn: "7d" }
          ),
        },
      };
    },
  },
  {
    url: "/register",
    method: "post",
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
  {
    url: "/menu",
    method: "get",
    response() {
      return {
        errno: 0,
        data: [
          {
            path: "/",
            name: "dashboard",
            icon: "dashboard",
            isSvg: true,
          },
          {
            path: "/guide",
            name: "guide",
            icon: "guide",
            isSvg: true,
          },

          {
            path: "/table",
            name: "table",
            icon: "table",
            isSvg: true,
            children: [
              {
                path: "/table/dynamic-table",
                name: "dynamicTable",
              },
              {
                path: "/table/drag-table",
                name: "dragTable",
              },
            ],
          },
          {
            path: "/charts",
            name: "charts",
            icon: "chart",
            isSvg: true,
            children: [
              {
                path: "/charts/keyboard",
                name: "keyboardChart",
              },
              {
                path: "/charts/line",
                name: "lineChart",
              },
            ],
          },
          {
            path: "/excel",
            name: "excel",
            icon: "excel",
            isSvg: true,
            children: [
              {
                path: "/excel/export-excel",
                name: "exportExcel",
              },
            ],
          },
        ],
      };
    },
  },
];
export default userMock;
