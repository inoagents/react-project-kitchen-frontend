import { Link } from "react-router-dom";
import React from "react";
import agent from "../agent";
import styles from "./Register.module.css";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from "../constants/actionTypes";

const mapStateToProps = (state) => ({ ...state.auth });

const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload });
  },
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});

function handleInputValidity(input) {
  if (!input.checkValidity()) {
    input.classList.add(styles.input_error);
    input.previousElementSibling.classList.add(styles.attention_active);
    input.parentElement.nextElementSibling.style.display = "block";
    input.parentElement.nextElementSibling.textContent =
      input.validationMessage;
  } else {
    input.classList.remove(styles.input_error);
    input.previousElementSibling.classList.remove(styles.attention_active);
    input.parentElement.nextElementSibling.style.display = "none";
    input.parentElement.nextElementSibling.textContent = "";
  }
}

class Register extends React.Component {
  constructor() {
    super();
    this.changeUsername = (ev) => {
      const username = ev.target;
      handleInputValidity(username);
      this.props.onChangeUsername(ev.target.value);
    };
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
    this.submitForm = (username, email, password) => (ev) => {
      ev.preventDefault();
      const form = ev.target;
      if (!form.checkValidity()) {
        [...form.elements].forEach((item) => {
          if (item.tagName === "INPUT") {
            if (!item.checkValidity()) {
              item.classList.add(styles.input_error);
              item.previousElementSibling.classList.add(
                styles.attention_active
              );
              item.parentElement.nextElementSibling.style.display = "block";
              item.parentElement.nextElementSibling.textContent =
                item.validationMessage;
            }
          }
        });
      } else {
        this.props.onSubmit(username, email, password);
      }
    };
    this.inputTextRef = React.createRef();
    this.inputEmailRef = React.createRef();
    this.formRef = React.createRef();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
    const errors = this.props.errors;

    if (errors && errors.username === "is already taken.") {
      this.inputTextRef.current.classList.add(styles.input_error);
      this.inputTextRef.current.parentElement.nextElementSibling.style.display =
        "block";
      this.inputTextRef.current.parentElement.nextElementSibling.textContent =
        "Пользователь с таким именем уже существует, укажите другое имя";
    }
    if (errors && errors.email === "is invalid") {
      this.inputEmailRef.current.classList.add(styles.input_error);
      this.inputEmailRef.current.parentElement.nextElementSibling.style.display =
        "block";
      this.inputEmailRef.current.parentElement.nextElementSibling.textContent =
        "Неверно указан email";
    } else if (errors && errors.email === "is already taken.") {
      this.inputEmailRef.current.classList.add(styles.input_error);
      this.inputEmailRef.current.parentElement.nextElementSibling.style.display =
        "block";
      this.inputEmailRef.current.parentElement.nextElementSibling.textContent =
        "Пользователь с таким email уже существует, укажите другой email";
    }

    return (
      <div className={`${styles.authPage} auth-page`}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className={styles.title}>Зарегистрироваться</h1>
              <Link
                to="/login"
                className={styles.link}
                onClick={() => this.formRef.reset()}
              >
                Уже есть аккаунт?
              </Link>

              <form
                noValidate
                onSubmit={this.submitForm(username, email, password)}
                className={styles.form}
                ref={this.formRef}
              >
                <label htmlFor="username" className={styles.label}>
                  Имя пользователя
                </label>
                <div className={styles.inputContainer}>
                  <div className={styles.attention} />
                  <input
                    ref={this.inputTextRef}
                    required
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={this.props.username}
                    onChange={this.changeUsername}
                    className={styles.input}
                    minLength="1"
                    id="username"
                  />
                </div>
                <span className={styles.error}>Error</span>
                <label htmlFor="email" className={styles.label}>
                  E-mail
                </label>
                <div className={styles.inputContainer}>
                  <div className={styles.attention} />
                  <input
                    ref={this.inputEmailRef}
                    required
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={this.props.email}
                    onChange={this.changeEmail}
                    className={styles.input}
                    autoComplete="email"
                    id="email"
                  />
                </div>
                <span className={styles.error}>Error</span>
                <label htmlFor="password" className={styles.label}>
                  Пароль
                </label>
                <div className={styles.inputContainer}>
                  <div className={styles.attention} />
                  <input
                    required
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={this.props.password}
                    onChange={this.changePassword}
                    className={styles.input}
                    autoComplete="current-password"
                    minLength="1"
                    id="password"
                  />
                </div>
                <span className={styles.error}>Error</span>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.button}
                    type="submit"
                    disabled={this.props.inProgress}
                  >
                    Зарегистрироваться
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
