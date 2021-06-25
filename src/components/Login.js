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

function handleInputValidity(input) {
  if (!input.checkValidity()) {
    input.classList.add(styles.input_error);
    input.parentElement.nextElementSibling.style.display = "block";
    input.parentElement.nextElementSibling.textContent =
      input.validationMessage;
  } else {
    input.classList.remove(styles.input_error);
    input.parentElement.nextElementSibling.style.display = "none";
    input.parentElement.nextElementSibling.textContent = "";
  }
}

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = (ev) => {
      const email = ev.target;
      handleInputValidity(email);
      this.props.onChangeEmail(ev.target.value);
    };
    this.changePassword = (ev) => {
      const password = ev.target;
      handleInputValidity(password);
      this.props.onChangePassword(ev.target.value);
    };
    this.submitForm = (email, password) => (ev) => {
      ev.preventDefault();
      const form = ev.target;
      if (!form.checkValidity()) {
        [...form.elements].forEach((item) => {
          if (item.tagName === "INPUT") {
            if (!item.checkValidity()) {
              item.classList.add(styles.input_error);
              item.parentElement.nextElementSibling.style.display = "block";
              item.parentElement.nextElementSibling.textContent =
                item.validationMessage;
            }
          }
        });
      } else {
        this.props.onSubmit(email, password);
      }
    };
    this.inputEmailRef = React.createRef();
    this.inputPasswordRef = React.createRef();
    this.formRef = React.createRef();
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
    });
  };

  render() {
    const email = this.props.email;
    const password = this.props.password;

    const errors = this.props.errors;

    if (errors && errors["email or password"] === "is invalid") {
      this.inputEmailRef.current.classList.add(styles.input_error);
      this.inputEmailRef.current.parentElement.nextElementSibling.style.display =
        "block";
      this.inputEmailRef.current.parentElement.nextElementSibling.textContent =
        "Возможно неверно указан email";
      this.inputPasswordRef.current.classList.add(styles.input_error);
      this.inputPasswordRef.current.parentElement.nextElementSibling.style.display =
        "block";
      this.inputPasswordRef.current.parentElement.nextElementSibling.textContent =
        "Возможно неверно указан пароль";
    }

    return (
      <div className={`${styles.authPage} auth-page`}>
        <div className="page">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className={styles.title}>Войти</h1>
            <Link
              to="/register"
              className={styles.link}
              onClick={() => this.formRef.reset()}
            >
              Хотите создать аккаунт?
            </Link>

            <form
              ref={this.formRef}
              noValidate
              onSubmit={this.submitForm(email, password)}
              className={styles.form}
            >
              <label htmlFor="email" className={styles.label}>
                E-mail
              </label>
              <div className={styles.passwordContainer}>
                <input
                  ref={this.inputEmailRef}
                  required
                  id="email"
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={this.changeEmail}
                  className={styles.input}
                  autoComplete="email"
                />
              </div>
              <span className={styles.error}>Error</span>
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
                  ref={this.inputPasswordRef}
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
              <span className={styles.error}>Error</span>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.button}
                  type="submit"
                  disabled={this.props.inProgress}
                >
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
