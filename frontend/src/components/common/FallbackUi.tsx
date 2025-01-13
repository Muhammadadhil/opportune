
const FallbackUI = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg w-full text-center">
                <div className="mb-6">
                    <svg className="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M4.93 4.93l1.414 1.414M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-2">Something Went Wrong</h2>
                <p className="text-lg text-gray-600 mb-6">We're sorry, but something went wrong. Please try again later or contact support.</p>
                <button
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
                    onClick={() => window.location.reload()}
                >
                    Refresh Page
                </button>
            </div>
        </div>
    );
};

export default FallbackUI;
