import ListErrors from "./ListErrors";
import React from "react";
import agent from "../agent";
import styles from "./Editor.module.css";
import paperClipIcon from "../images/paperClip.svg";
import { connect } from "react-redux";
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED,
  UPDATE_FIELD_EDITOR,
} from "../constants/actionTypes";
import { motion } from "framer-motion";
import { animationVariants} from "../animation";

const mapStateToProps = (state) => ({
  ...state.editor,
});

const mapDispatchToProps = (dispatch) => ({
  onAddTag: () => dispatch({ type: ADD_TAG }),
  onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
  onSubmit: (payload) => dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: (payload) => dispatch({ type: EDITOR_PAGE_UNLOADED }),
  onUpdateField: (key, value) =>
    dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
});

class Editor extends React.Component {
  constructor() {
    super();

    const isLoaded = false;

    const updateFieldEvent = (key) => (ev) => {
      this.props.onUpdateField(
        key,
        ev.target.type === "file" ? ev.target.files[0].name : ev.target.value
      );
    };
    this.changeTitle = updateFieldEvent("title");
    this.changeDescription = updateFieldEvent("description");
    this.changeImage = updateFieldEvent("image");
    this.changeBody = updateFieldEvent("body");
    this.changeTagInput = updateFieldEvent("tagInput");

    this.watchForEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        this.props.onAddTag();
      }
    };

    this.removeTagHandler = (tag) => () => {
      this.props.onRemoveTag(tag);
    };

    this.submitForm = (ev) => {
      ev.preventDefault();
      // const article = {
      //   title: this.props.title,
      //   description: this.props.description,
      //   image: this.props.image,
      //   body: this.props.body,
      //   tagList: this.props.tagList,
      // };

      // const slug = { slug: this.props.articleSlug };
      // const promise = this.props.articleSlug
      //   ? agent.Articles.update(Object.assign(article, slug))
      //   : agent.Articles.create(article);

      // this.props.onSubmit(promise);

      agent.createArticleImageSrcString(this.formRef.current).then((res) => {
        if (res) {
          const article = {
            title: this.props.title,
            description: this.props.description,
            image: res,
            body: this.props.body,
            tagList: this.props.tagList,
          };
          const slug = { slug: this.props.articleSlug };
          const promise = this.props.articleSlug
            ? agent.Articles.update(Object.assign(article, slug))
            : agent.Articles.create(article);

          this.props.onSubmit(promise);
        } else {
          const article = {
            title: this.props.title,
            description: this.props.description,
            body: this.props.body,
            tagList: this.props.tagList,
          };
          const slug = { slug: this.props.articleSlug };
          const promise = this.props.articleSlug
            ? agent.Articles.update(Object.assign(article, slug))
            : agent.Articles.create(article);

          this.props.onSubmit(promise);
        }
      });
    };

    this.formRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        return this.props.onLoad(
          agent.Articles.get(this.props.match.params.slug)
        );
      }
      this.props.onLoad(null);
    }
    this.isLoaded = true;
  }

  componentWillMount() {
    if (this.props.match.params.slug) {
      return this.props.onLoad(
        agent.Articles.get(this.props.match.params.slug)
      );
    }
    this.props.onLoad(null);
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <motion.div
        className="editor-page"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={ animationVariants }
      >
        <div className="container page">
          <div className="row">
            {this.isLoaded && (
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h2 className={styles.editorHeading}>
                  {this.props.articleSlug
                    ? "Редактирование записи"
                    : "Новая запись"}
                </h2>

                <ListErrors errors={this.props.errors}></ListErrors>

                <form className={styles.editorForm} ref={this.formRef}>
                  <fieldset className={styles.editorMainFormGroup}>
                    <fieldset className={styles.editorFormGroup}>
                      <label
                        className={styles.editorFormLabel}
                        htmlFor="article-title"
                      >
                        Заголовок
                      </label>
                      <input
                        id="article-title"
                        name="title"
                        className={styles.editorFormInput}
                        type="text"
                        placeholder="Название статьи"
                        value={this.props.title}
                        onChange={this.changeTitle}
                      />
                    </fieldset>

                    <fieldset className={styles.editorFormGroup}>
                      <label
                        className={styles.editorFormLabel}
                        htmlFor="article-description"
                      >
                        Описание
                      </label>
                      <input
                        id="article-description"
                        name="description"
                        className={styles.editorFormInput}
                        type="text"
                        placeholder="О чем статья"
                        value={this.props.description}
                        onChange={this.changeDescription}
                      />
                    </fieldset>

                    {/* TODO: implement image field in form */}
                    <fieldset className={styles.editorFormGroup}>
                      <span className={styles.editorFormLabel}>
                        Изображение
                      </span>
                      <label
                        className={styles.editorFormImageInput}
                        htmlFor="article-image"
                      >
                        {this.props.image || "Изображение (опционально)"}
                        <img
                          src={paperClipIcon}
                          className={styles.editorFormImageIcon}
                          alt="Прикрепить изображение"
                        />
                        <input
                          id="article-image"
                          name="image"
                          style={{ display: "none" }}
                          type="file"
                          placeholder="Изображение (опционально)"
                          onChange={this.changeImage}
                          accept="image/jpeg,image/png,image/gif"
                        />
                      </label>
                    </fieldset>

                    <fieldset className={styles.editorFormGroup}>
                      <label
                        className={styles.editorFormLabel}
                        htmlFor="article-body"
                      >
                        Содержание
                      </label>
                      <textarea
                        id="article-body"
                        name="body"
                        className={styles.editorFormInput}
                        rows="8"
                        placeholder="Текст статьи"
                        value={this.props.body}
                        onChange={this.changeBody}
                      ></textarea>
                    </fieldset>

                    <fieldset className={styles.editorFormGroup}>
                      <label
                        className={styles.editorFormLabel}
                        htmlFor="article-tags"
                      >
                        Теги
                      </label>
                      <input
                        id="article-tags"
                        name="tags"
                        className={styles.editorFormInput}
                        type="text"
                        placeholder="Введите теги (нажмите Enter для сохранения тега)"
                        value={this.props.tagInput}
                        // TODO: remove tags apply with Enter - split value by "," and save tags array
                        onChange={this.changeTagInput}
                        onKeyUp={this.watchForEnter}
                      />
                    </fieldset>
                    <div className={styles.tagsList}>
                      {(this.props.tagList || []).map((tag) => {
                        return (
                          <span className={styles.tagItem} key={tag}>
                            <i
                              className={
                                "ion-close-round " + styles.editorTagsCloseIcon
                              }
                              onClick={this.removeTagHandler(tag)}
                            ></i>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </fieldset>

                  <fieldset className={styles.editorFormButtonGroup}>
                    <button
                      className={`${styles.button}
                      ${this.props.inProgress ? styles.disabled : null}`}
                      type="button"
                      disabled={this.props.inProgress}
                      onClick={this.submitForm}
                    >
                      Опубликовать
                    </button>
                  </fieldset>
                </form>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
