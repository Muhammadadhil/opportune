import React from "react";
import FallbackUI from "./FallbackUi";

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <FallbackUI />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
