import type { Route } from "./+types/clear";

export function clientAction({ request }: Route.ClientActionArgs) {
  const method = request.method
  
  if (method === "DELETE") localStorage.removeItem("cart")
}