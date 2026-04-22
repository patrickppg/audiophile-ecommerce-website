import type { Route } from "./+types/update";
import type { CartItem } from "./add";

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()

  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") as string)
  const item = cart.find(item => item.id === formData.get("id"))

  if (!item) return

  item.quantity = Number(formData.get("quantity"))
  localStorage.setItem("cart", JSON.stringify(cart))
}