export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  })
}

export function getValidationMessage(control: any): string {
  if (control.validity.valueMissing) {
    return "This field is required"
  } else if (control.validity.typeMismatch || control.validity.patternMismatch) {
    return "Wrong format"
  }

  return ""
}