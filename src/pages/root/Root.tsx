import { Outlet, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import Nav from '../../components/nav/Nav';
import styles from './Root.module.scss';

const Root = () => {
    const { smallHeader } = useContext(HeaderToggleContext);
    const HeadingStyles = smallHeader ? [styles.Heading, styles.SmallHeading] : [styles.Heading, styles.BigHeading];
    const YearStyles = smallHeader ? [styles.Year, styles.SmallYear] : [styles.Year]

    return (
        <>
            <header className={styles.Header}>
                <div>
                    <Link to="/" className={HeadingStyles.join(" ")}>For The Boys</Link>
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