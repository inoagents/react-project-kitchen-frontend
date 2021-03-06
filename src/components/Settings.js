import React from "react";
import agent from "../agent";
import styles from "./Settings.module.css";
import { connect } from "react-redux";
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT,
} from "../constants/actionTypes";
import eyeIconClosed from "../images/eyeIconClosed.svg";
import eyeIconOpened from "../images/eyeIconOpened.svg";
import { motion } from "framer-motion";
import { animationVariants} from "../animation";

class SettingsForm extends React.Component {
  constructor() {
    super();

    this.state = {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
      isEyeOpened: false,
    };

    this.updateState = (field) => (ev) => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();

      const user = Object.assign({}, this.state);
      if (!user.password) {
        delete user.password;
      }

      this.props.onSubmitForm(user);
    };

    this.inputUserRef = React.createRef();
    this.inputEmailRef = React.createRef();
  }

  componentWillMount() {
    if (this.props.currentUser) {
      Object.assign(this.state, {
        image: this.props.currentUser.image || "",
        username: this.props.currentUser.username,
        bio: this.props.currentUser.bio,
        email: this.props.currentUser.email,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser) {
      this.setState(
        Object.assign({}, this.state, {
          image: nextProps.currentUser.image || "",
          username: nextProps.currentUser.username,
          bio: nextProps.currentUser.bio,
          email: nextProps.currentUser.email,
        })
      );
    }
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
    const errors = this.props.errors;

    if (errors) {
      this.inputUserRef.current.classList.remove(styles.input_error);
      this.inputUserRef.current.nextElementSibling.style.display = "none";
      this.inputUserRef.current.nextElementSibling.textContent = "";
      this.inputEmailRef.current.classList.remove(styles.input_error);
      this.inputEmailRef.current.nextElementSibling.style.display = "none";
      this.inputEmailRef.current.nextElementSibling.textContent = "";
    }

    if (errors && errors.username === "is already taken.") {
      this.inputUserRef.current.classList.add(styles.input_error);
      this.inputUserRef.current.nextElementSibling.style.display = "block";
      this.inputUserRef.current.nextElementSibling.textContent =
        "???????????????????????? ?? ?????????? ???????????? ?????? ????????????????????, ?????????????? ???????????? ??????";
    } else if (errors && errors.username === "is invalid") {
      this.inputUserRef.current.classList.add(styles.input_error);
      this.inputUserRef.current.nextElementSibling.style.display = "block";
      this.inputUserRef.current.nextElementSibling.textContent =
        "?????????????? ?????????????? ??????";
    } else if (errors && errors.username === "can't be blank") {
      this.inputUserRef.current.classList.add(styles.input_error);
      this.inputUserRef.current.nextElementSibling.style.display = "block";
      this.inputUserRef.current.nextElementSibling.textContent =
        "?????????????????? ?????? ????????";
    }

    if (errors && errors.email === "is invalid") {
      this.inputEmailRef.current.classList.add(styles.input_error);
      this.inputEmailRef.current.nextElementSibling.style.display = "block";
      this.inputEmailRef.current.nextElementSibling.textContent =
        "?????????????? ???????????? email";
    } else if (errors && errors.email === "is already taken.") {
      this.inputEmailRef.current.classList.add(styles.input_error);
      this.inputEmailRef.current.nextElementSibling.style.display = "block";
      this.inputEmailRef.current.nextElementSibling.textContent =
        "???????????????????????? ?? ?????????? email ?????? ????????????????????, ?????????????? ???????????? email";
    } else if (errors && errors.email === "can't be blank") {
      this.inputEmailRef.current.classList.add(styles.input_error);
      this.inputEmailRef.current.nextElementSibling.style.display = "block";
      this.inputEmailRef.current.nextElementSibling.textContent =
        "?????????????????? ?????? ????????";
    }

    return (
      <form noValidate onSubmit={this.submitForm}>
        <label htmlFor="url" className={styles.label}>
          ?????????????????????? ??????????????
        </label>
        <input
          className={styles.input}
          type="text"
          placeholder="URL ?????????????????????? ??????????????"
          value={this.state.image}
          onChange={this.updateState("image")}
          id="url"
        />
        <label htmlFor="username" className={styles.label}>
          ?????? ????????????????????????
        </label>
        <input
          ref={this.inputUserRef}
          className={styles.input}
          type="text"
          placeholder="Username"
          value={this.state.username}
          onChange={this.updateState("username")}
          id="username"
        />
        <span className={styles.error}>Error</span>
        <label htmlFor="about" className={styles.label}>
          ???????????????????? ?? ??????
        </label>
        <textarea
          className={styles.textarea}
          placeholder="???????????????????? ?? ??????"
          value={this.state.bio}
          onChange={this.updateState("bio")}
          id="about"
        ></textarea>
        <label htmlFor="email" className={styles.label}>
          E-mail
        </label>
        <input
          ref={this.inputEmailRef}
          className={styles.input}
          type="email"
          placeholder="E-mail"
          value={this.state.email}
          onChange={this.updateState("email")}
          id="email"
        />
        <span className={styles.error}>Error</span>
        <label htmlFor="password" className={styles.label}>
          ????????????
        </label>
        <div className={styles.passwordContainer}>
          <img
            className={styles.eye}
            src={this.state.isEyeOpened ? eyeIconOpened : eyeIconClosed}
            onClick={this.handleImgClick}
          />
          <input
            className={styles.input}
            type={`${this.state.isEyeOpened ? "text" : "password"}`}
            placeholder="????????????"
            value={this.state.password}
            onChange={this.updateState("password")}
            id="password"
          />
        </div>
        <div className={styles.buttonsContainer}>
          <button
            type="button"
            className={styles.exit}
            onClick={this.props.onClickLogout}
          >
            <span className={styles.exit__text}>?????????? ???? ????????????????</span>
          </button>
          <button
            className={styles.buttonSubmit}
            type="submit"
            disabled={this.state.inProgress}
          >
            ??????????????????
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.settings,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogout: () => dispatch({ type: LOGOUT }),
  onSubmitForm: (user) =>
    dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
});

class Settings extends React.Component {
  render() {
    return (
      <motion.div
        className={`${styles.settingsPage} settings-page`}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={ animationVariants }
      >
        <h1 className={`${styles.title} text-xs-center`}>???????? ??????????????????</h1>

        <SettingsForm
          errors={this.props.errors}
          onClickLogout={this.props.onClickLogout}
          currentUser={this.props.currentUser}
          onSubmitForm={this.props.onSubmitForm}
        />
      </motion.div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
