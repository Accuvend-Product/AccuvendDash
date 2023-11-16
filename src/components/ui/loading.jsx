const LoadingSpinner = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-primary"></div>
        </div>
    );
};

export default LoadingSpinner;
