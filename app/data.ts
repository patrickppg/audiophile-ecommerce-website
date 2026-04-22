interface Image {
  mobile: string,
  tablet: string,
  desktop: string
}

interface Item {
  url: string,
  name: string,
  image: Image
}

export interface Product {
  id: number,
  slug: string,
  name: string,
  image: Image,
  category: "headphones" | "speakers" | "earphones",
  categoryImage: Image,
  new: boolean,
  price: number,
  description: string,
  features: string,
  includes: {
    quantity: number,
    item: string
  }[],
  gallery: {
    first: Image,
    second: Image,
    third: Image
  },
  others: [Item, Item, Item]
}

export async function getProducts(category: string): Promise<Product[]> {
  const res = await fetch("/data.json")
  const products = await res.json()

  return products
    .filter((product: Product) => product.category === category)
    .sort((a: Product, b: Product) => {
      if (a.new === b.new) return 0
      return a.new ? -1 : 1
    })
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch("/data.json")
  const products = await res.json()

  return products
    .find((product: Product) => product.id === Number(id))
}