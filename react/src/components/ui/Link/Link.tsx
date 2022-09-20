//import styles from "./Link.module.scss";

const Link = ({ url, label }: any) => {
  return (
    <a
      href={url}
      className={`
      text-general-link
      no-underline
      hover:underline
    `}
    >
      {label}
    </a>
  );
};

export default Link;
