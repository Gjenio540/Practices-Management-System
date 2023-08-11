type errorProps = {
    message: string
}

const Error = (props: errorProps) => {
    return(
        <div className="container">
            <div className="error">
                <h1>{props.message}</h1>
            </div>
        </div>
    );
}

export default Error
