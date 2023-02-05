import styles from './FetchingDisplay.module.scss';

const FetchingDisplay = () => {
    return (
        <div className={styles.DisplayLoader}>
            <div className={styles.Spinner}>
                <p>Fetching...</p>
            </div>
        </div>
    )
}

export default FetchingDisplay