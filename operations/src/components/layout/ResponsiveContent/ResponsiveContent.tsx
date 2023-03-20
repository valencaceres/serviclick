const Content = ({ children, align }: any) => {
  return (
    <div className={`flex flex-col items-center overflow-y-auto p-5`}>
      {children}
    </div>
  );
};

const ContentHalfRow = ({ children, align }: any) => {
  return (
    <div className="flex w-full flex-wrap justify-center gap-5">{children}</div>
  );
};

export { Content, ContentHalfRow };
