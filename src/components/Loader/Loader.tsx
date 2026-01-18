import css from "./Loader.module.css"

interface LoaderProps{
    text?: string;
}

export default function Loader({ text = "Loading..." }: LoaderProps) {
  return <p className={css.text}>{text}</p>;     
}
