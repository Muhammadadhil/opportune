import React, { useState } from "react";

interface Position {
    x: number;
    y: number;
}

interface MouseTrackerProps {
    render?: (position: Position) => React.ReactNode;
    cursorElement?: React.ReactNode;
    children: JSX.Element;
}

export default function MouseTracker({ children, cursorElement }: MouseTrackerProps) {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent) => {
        setPosition({
            x: event.clientX,
            y: event.clientY,
        });
    };

    return (
        <div style={{ height: "100vh", position: "relative" }} onMouseMove={handleMouseMove}>
            {/* {render(position)} */}
            {cursorElement && (
                <div
                    className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {cursorElement}
                </div>
            )}
            {children}
        </div>
    );
}
