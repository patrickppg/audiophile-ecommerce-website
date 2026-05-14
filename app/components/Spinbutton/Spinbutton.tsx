import { useState } from "react"
import "./styles.css"

type Props = React.ComponentProps<"input"> & {
  onIncrement(): void,
  onDecrement(): void
}

export default function Spinbutton(props: Props) {
  const { className, onDecrement, onIncrement, ...rest } = props
  const isMinValue = props.value === props.min

  function handleDecrementClick() {
    if (isMinValue) return
    onDecrement()
  }
  
  return (
    <span className={className ? `${className} spinbutton` : "spinbutton"}>
      <button type="button" disabled={isMinValue} onClick={handleDecrementClick}>-</button>
      <input type="number" {...rest} />
      <button type="button" onClick={() => onIncrement()}>+</button>
    </span>
  )
}