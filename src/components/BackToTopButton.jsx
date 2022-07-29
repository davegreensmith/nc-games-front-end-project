import styles from '../styling/BackToTopButton.module.css';
import logo from '../images/logodesign-1a.png';

export default function BackToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.section}>
      <img src={logo} alt="logo" />
      <button onClick={scrollToTop} className={styles.button}>
        Back to top ☝️
      </button>
      <img src={logo} alt="logo" />
    </section>
  );
}
