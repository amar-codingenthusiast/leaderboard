import logo from "../Assets/logo.svg";
import styles from "../Styles/Header.module.css";

const Header = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p className={styles.first}>Gully's</p>
				<p className={styles.second}>Koramangala</p>
			</div>
			<img className={styles.logo} src={logo} alt="logo" />
		</div>
	);
};

export default Header;
