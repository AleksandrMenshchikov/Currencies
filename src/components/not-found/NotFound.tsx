import { useHistory } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  const history = useHistory();

  function handleButtonClick() {
    history.push('/');
  }

  return (
    <div className={styles.notFoundPage}>
      <div className={styles.notFoundPage__container}>
        <h2 className={styles.notFoundPage__title}>Ошибка 404</h2>
        <p className={styles.notFoundPage__subtitle}>Страница не найдена</p>
        <p className={styles.notFoundPage__text}>
          Неправильно набран адрес или такой страницы не существует
        </p>
        <button
          className={styles.notFoundPage__button}
          onClick={handleButtonClick}
        >
          Перейти на главную страницу
        </button>
      </div>
    </div>
  );
}
