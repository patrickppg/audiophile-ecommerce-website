import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  layout("layouts/MainLayout.tsx", [
    index("routes/Home.tsx"),
    route("products/:category", "routes/Products.tsx"),
    route("products/:category/:id/:slug", "routes/Product.tsx"),
    route("checkout", "routes/Checkout.tsx"),
    ...prefix("cart", [
      route("add", "routes/cart/add.tsx"),
      route("update", "routes/cart/update.tsx"),
      route("clear", "routes/cart/clear.tsx")
  ])
  ]),
] satisfies RouteConfig;
