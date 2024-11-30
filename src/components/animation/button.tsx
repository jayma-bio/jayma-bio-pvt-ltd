import Link from "next/link";
import "./button.css";

interface AnimatedButtonProps {
  buttonText: string;
  link?: string;
}

const AnimatedButton = ({ buttonText, link }: AnimatedButtonProps) => {
  return (
    <>
      {link ? (
        <>
          <Link href={link}>
            <button className="learn-more">
              <span className="circle" aria-hidden="true">
                <span className="icon arrow"></span>
              </span>
              <span className="button-text">{buttonText}</span>
            </button>
          </Link>
        </>
      ) : (
        <>
          <button className="learn-more" type="submit">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">{buttonText}</span>
          </button>
        </>
      )}
    </>
  );
};

export default AnimatedButton;
