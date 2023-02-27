import { Outlet, Link } from 'react-router-dom';
import { useContext } from 'react';
import { HeaderToggleContext } from '../../context/HeaderToggleProvider';
import Nav from '../../components/nav/Nav';
import styles from './Root.module.scss';

const Root = () => {
    const { smallHeader } = useContext(HeaderToggleContext);
    const HeadingStyles = smallHeader ? [styles.Heading, styles.SmallHeading] : [styles.Heading, styles.BigHeading];
    const HeaderStyles = smallHeader ? [styles.Header, styles.SmallHeader] : [styles.Header];

    return (
        <>
            <header className={HeaderStyles.join(" ")}>
                <div>
                    <Link to="/" className={HeadingStyles.join(" ")}>For The Boys</Link>
                </div>

                <Nav />
            </header>

            <Outlet />

            <footer className={styles.Footer}>
                <span>&copy; 2023 <a href="https://pptn-portfolio.netlify.app" target="_blank" rel="noopener noreferrer">Peter Nguyen</a></span>
            </footer>
        </>
    )
}

export default Root