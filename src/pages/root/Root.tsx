import { Outlet, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import Nav from '../../components/nav/Nav';
import styles from './Root.module.scss';

const Root = () => {
    const { smallHeader } = useContext(HeaderToggleContext);
    const HeadingStyles = smallHeader ? styles.SmallHeading : styles.BigHeading;

    return (
        <>
            <header className={styles.Header}>
                <div>
                    <Link to="" className={HeadingStyles}>for the boys</Link>
                    <h2>est.1994</h2>
                </div>

                <Nav />
            </header>

            <Outlet />

            <footer className={styles.Footer}>
                <a href="https://pptn-web-dev.netlify.app/" target="_blank" rel="noopener noreferrer">&copy; 2023 Peter Nguyen</a>
            </footer>
        </>
    )
}

export default Root