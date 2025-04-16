import React from "react";

interface LinkSuaveProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const LinkSuave: React.FC<LinkSuaveProps> = ({
  href,
  children,
  className,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    if (onClick) onClick();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default LinkSuave;
