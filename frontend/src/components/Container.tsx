import React, { FC, ReactNode } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ className, children, ...props }) => {
  return (
    <section
      {...props}
      className={"max-w-6xl md:px-8 !mx-auto !px-4" + (className ? " " + className : "")}
    >
      {children}
    </section>
  );
};

export default Container;
