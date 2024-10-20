const routes = {
  user: {
    HOME: "/",
    SERVICES: "/services",
    ORDERS: "/orders",
    SETTINGS: "/settings",
    BASKET: "/basket",
  },
  repairman: {
    HOME: "/repairman/dashboard",
    ORDERS: "/repairman/orders",
    SETTINGS: "/repairman/settings",
  },
  admin: {
    HOME: "/admin/dashboard",
    ORDERS: "/admin/orders",
    SERVICES: "/admin/services",
    REPAIRMAN: "/admin/repairman",
  },
};

const protectedRoutes = {
  user: {
    ORDERS: routes.user.ORDERS,
    SETTINGS: routes.user.SETTINGS,
    BASKET: routes.user.BASKET,
  },
  repairman: routes.repairman,
  admin: routes.admin,
};

export const config = {
  API_URL: "http://localhost:4674",
  routes,
  protectedRoutes,
};
