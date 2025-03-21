
interface MaxWidthProp {
    children: React.ReactNode;
}

const MaxWidth = ({ children }: MaxWidthProp) => {
    return <div className="px-8 w-full lg:max-w-[85vw] mx-auto">{children}</div>;
};

export default MaxWidth;
