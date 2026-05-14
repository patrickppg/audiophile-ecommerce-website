import { getProduct, type Product } from "~/data";
import type { Route } from "./+types/add";

export interface CartItem {
  id: string,
  name: string,
  quantity: number,
  price: number,
  image: string
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData()
  const product = await getProduct(formData.get("id") as string)
  const quantity = formData.get("quantity") as string
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")

  if (cart.find(item => item.id === String(product.id))) {
    updateCart(product, Number(quantity))
  }
  else {
    addToCart(product, Number(quantity))
  }
}

function addToCart(product: Product, quantity: number) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]")
  const item: CartItem = {
    id: String(product.id),
    name: product.name,
    quantity: Number(quantity),
    price: product.price,
    image: product.image.mobile
  }

  if (cart.length) {
    localStorage.setItem("cart", JSON.stringify([...cart, item]))
  } else {
    localStorage.setItem("cart", JSON.stringify([item]))
  }
}

function updateCart(product: Product, quantity: number) {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
  const item = cart.find(item => item.id === String(product.id))!

  item.quantity = quantity
  localStorage.setItem("cart", JSON.stringify(cart))
}