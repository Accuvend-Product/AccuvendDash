/* eslint-disable react/prop-types */

const Container = ({ className, children }) => {
    return (
        <div className={`mx-auto px-8 sm:px-10 md:px-12 ${className}`}>
            {children}
        </div>
    )
}

export default Container