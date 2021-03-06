import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from '../Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import { motion } from "framer-motion";
import { layoutVariants} from "../../animation";

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  appTagline: state.common.appTagline,
  token: state.common.token
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    const tab = this.props.token ? 'feed' : 'all';
    const articlesPromise = this.props.token ?
      agent.Articles.feed :
      agent.Articles.all;

    this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <motion.div
        className="home-page"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={ layoutVariants }
      >

          <Banner appName={this.props.appName} appTagline={this.props.appTagline} />
          <div className="container page">

            <div className="row">
              <MainView />
              <Tags
                tags={this.props.tags}
                onClickTag={this.props.onClickTag}
              />
            </div>
          </div>

      </motion.div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
