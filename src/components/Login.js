import { Link } from "react-router-dom";
import React from "react";
import agent from "../agent";
import styles from "./Login.module.css";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from "../constants/actionTypes";
import eyeIconClosed from "../images/eyeIconClosed.svg";
import eyeIconOpened from "../images/eyeIconOpened.svg";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => this.props.onChangeEmail(ev.target.value);
    this.changePassword = (ev) => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => (ev) => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
    this.refError = React.createRef();
    this.refInputPassword = React.createRef();
    this.state = {
      isEyeOpened: false,
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  handleImgClick = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isEyeOpened: !prevState.isEyeOpened,
      };
    })
  };

  render() {
    const email = this.props.email;
    const password = this.props.password;
    console.log(this.props.errors);
    if (this.props.errors && this.props.errors.email) {
      this.refError.current.style = "display: block";
      this.refError.current.textContent = "Заполните пожалуйста email";
    } else if (this.props.errors && this.props.errors.password) {
      this.refError.current.style = "display: block";
      this.refError.current.textContent = "Заполните пожалуйста пароль";
    } else if (this.props.errors && this.props.errors["email or password"]) {
      this.refError.current.style = "display: block";
      this.refError.current.textContent = "Не верно указаны email или пароль";
    }
    return (
      <div className={`${styles.authPage} auth-page`}>
        <div className="page">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className={styles.title}>Войти</h1>
            <Link to="/register" className={styles.link}>
              Хотите создать аккаунт?
            </Link>

            <form
              noValidate
              onSubmit={this.submitForm(email, password)}
              className={styles.form}
            >
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <input
                required
                id="email"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={this.changeEmail}
                className={styles.input}
                autoComplete="email"
              />
              <label htmlFor="password" className={styles.label}>
                Пароль
              </label>
              <div className={styles.passwordContainer}>
                <img
                  className={styles.eye}
                  src={this.state.isEyeOpened ? eyeIconOpened : eyeIconClosed}
                  onClick={this.handleImgClick}
                />
                <input
                  ref={this.refInputPassword}
                  required
                  id="password"
                  type={`${this.state.isEyeOpened ? "text" : "password"}`}
                  placeholder="Пароль"
                  value={password}
                  onChange={this.changePassword}
                  className={`${styles.input} ${styles.inputPassword}`}
                  autoComplete="current-password"
                />
              </div>

              <div className={styles.buttonContainer}>
                <span ref={this.refError} className={styles.error}>
                  Error
                </span>
                <button className={styles.button} type="submit">
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
