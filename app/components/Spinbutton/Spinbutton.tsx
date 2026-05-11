import "./styles.css"

type Props = React.ComponentProps<"input">

export default function Spinbutton(props: Props) {
  const { className, ...rest } = props
  
  return (
    <span className={className ? `${className} spinbutton` : "spinbutton"}>
      <button>-</button>
      <input type="number" {...rest} />
      <button>+</button>
    </span>
  )
}