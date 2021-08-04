import React from 'react';
import Banner from './Home/Banner';
import { connect } from 'react-redux';
import styles from './About.module.css';
import reactLogo from '../images/react-ascii.png';

const mapStateToProps = state => ({
  appName: state.common.appName,
  appTagline: state.common.appTagline
});

class About extends React.Component {
  constructor() {
    super();

    this.state = {
      isError: false
    };
  }

  setError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isError: true,
      };
    });
  };

  resetError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isError: false,
      };
    });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <Banner appName={this.props.appName} appTagline={this.props.appTagline} />
        <h2>
          О нашем проекте
        </h2>
        <img
          src={reactLogo}
          className={styles.image}
          alt="React logo"
          width="300"
          height="277"
        />
        <section className={styles.content}>
          <p>
            Несколько лет назад космические разведчики обнаружили останки
            загадочной цивилизации неподалёку от далёкой и забытой всеми звезды.
          </p>
          <p>
            Судя по всему, это были представители гуманоидной расы, и они смогли
            овладеть опасными технологиями, которые не смогли удержать под своим контролем.
          </p>
          <p>
            Так закончилась их история. Но разработанные ими технологии остались жить.
          </p>
          <p>
            Среди руин, оставшихся от их зданий, наши исследователи обнаружили вычислительные
            устройства с программными кодами, скрывающими в себе невероятную мощь.
          </p>
          <p>
            Учёные расшифровали их, однако правительство Межгалактической Империи немедленно
            засекретило их, чтобы использовать в своих целях.
          </p>
          <p>
            Мы — небольшая группа независимых журналистов, которые посвятили жизнь борьбе с
            межпланетной диктатурой. В наши руки попала одна из этих таинственных технологий
            под названием React.
          </p>
          <p>
            С её помощью был разработан этот небольшой веб-сайт, который мы будем
            использовать для распространения независимых новостей и расследований.
          </p>
          <p>
            <b>Вселенная будет свободной!</b>
          </p>
        </section>
        <div className={styles.donateWrapper}>
          <h3>
            Поддержать проект
          </h3>
          <button
            className="button"
            onClick={this.setError}
          >
            Отправить перевод
          </button>
          {
          this.state.isError &&
            <p
              className={styles.error}
              onClick={this.resetError}
              >
              К сожалению, мы не можем принимать переводы из Солнечной системы
            </p>
          }
        <p>
          Оплата производится онлайн через Межпланетный Кредитный Банк
        </p>
        <p>
          Рекомендуемая сумма — 10 галактических долларов
        </p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(About);
