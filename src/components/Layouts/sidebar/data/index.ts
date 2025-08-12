import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        items: [
          {
            title: "Home",
            url: "/",
          },
        ],
      },
     
      {
        title: "Productos",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Categorias",
            url: "/dashboard/category",
          },
          {
            title: "Productos",
            url: "/dashboard/productos",
          },
              {
            title: "Proveedores",
            url: "/dashboard/proveedores",
          },
        ],
      },
      {
        title: "Compras",
        url: "/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Compras",
            url: "/dashboard/compras",
          }, {
            title: "Ventas",
            url: "/dashboard/ventas",
          },
        ],
      },
      {
        title: "Paginas",
        icon: Icons.Alphabet,
        items: [
          {
            title: "User",
            url: "/dashboard/user",
          },
             {
            title: "Reportes",
            url: "/dashboard/reportes",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
