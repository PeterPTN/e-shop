import { Link, useRouteError } from 'react-router-dom';
import { useTypeSafeRouteError } from '../../hooks/useTypeSafeRouteError';
import styles from './Error.module.scss';

interface ErrorTypes {
    data: string,
    error: {
        message: string
    }
}

const ErrorPage = () => {
    const errorObject: ErrorTypes = useTypeSafeRouteError(useRouteError);
    const errorMessage = errorObject.error.message || errorObject.data;

    return (
        <div className={styles.Error}>
            <h1>Oops!</h1>
            <p>An unexpected error has occured:</p>
            <p>{errorMessage}</p>
            <h2>¯\_(ツ)_/¯</h2>
            <Link className={styles.Button} to="/">Back to homepage</Link>
        </div>
    )
}

export default ErrorPage