import React from 'react';
import ReactDOM from 'react-dom';
import CRUD from './crud';
import l10n from './languages';

import { overlayConfirm, getButton, getInput, getEditPostUrl } from './tools.jsx';


/**
1 Choose if it's a PageModel (PM) or PageLayout (PL) you want to base your page upon
2 Choose/create PM or PL.
  - option to edit the type of page template (PM/PL) after creation/selection.
3 Choose page title
  - when back, only newly created templates will be deleted
  - else go to page editor
*/

class MpatNewPage extends React.PureComponent {
  constructor(props) {
    super(props);

    // order and description of the steps
    /*  this.flow = {
        base: l10n.flow.base,
        layout: l10n.flow.layout,
        model: l10n.flow.model
      };*/

    // things that change
    this.state = {
      stepTag: 'base', // to determine the position in the workflow
      workFlow: null, // to determine the way/direction of the workflow
      errMsg: null, // if any error message

      layoutId: null, // layout id
      availableLayouts: [], // where the layouts are put after load
      newPageLayoutTitle: null, // for input title when creating new layout

      modelId: null, //model id
      availableModels: [], //where the models are put after load
      newPageModelTitle: null, // input title when creating new page model

      postParent: 0, //if the post has a parent (currently unchanged)

      child: null // when editing in another window
    };


    this.goBack = this.goBack.bind(this);
    this.waitForChildEdited = this.waitForChildEdited.bind(this);
    this.onSelectModelOrLayout = this.onSelectModelOrLayout.bind(this);
    this.createModel = this.createNewModel.bind(this);
    this.createLayout = this.createNewLayout.bind(this);
    this.createPage = this.createNewPage.bind(this);

    this.onInputNewModelName = this.onInputNewModelName.bind(this);
    this.onInputNewLayoutName = this.onInputNewLayoutName.bind(this);
    this.onInputNewPageName = this.onInputNewPageName.bind(this);

    //WP REST API
    this.restUrlPage = `${window.wpApiSettings.root}${window.wpApiSettings.versionString}pages`; //default REST
    this.restUrlPageLayout = `${window.wpApiSettings.root}mpat/v1/layout`; //custom REST
    this.restUrlPageModel = `${window.wpApiSettings.root}mpat/v1/model`; //custom REST
    this.isRestOk = true;
  }

  componentWillMount() {
    if (wpApiSettings === undefined) {
      alert('wpApiSettings object not found!');
      this.setState({ errMsg: 'need WP API' });
    } else {
      if (window.wpApiSettings.nonce !== undefined) {
        //this.setState({ errMsg: 'Detected WP API' });
        this.modelIO = new CRUD(this.restUrlPageModel);
        this.layoutIO = new CRUD(this.restUrlPageLayout);
        this.pageIO = new CRUD(this.restUrlPage);
      } else {
        this.setState({ errMsg: 'WP API nonce not set' });
      }
    }
  }

  componentDidMount() {
    // when the render() is done, load the content
    this.loadPageModels();
    this.loadPageLayouts();
  }

  /** model */
  loadPageModels() {
    this.modelIO.get(
      (result) => {
        const urls = [];
        for (const item of result) {
          const obj = {};
          obj.id = item.ID;
          obj.key = `page://${item.ID}`;
          obj.label = item.post_title !== '' ? item.post_title : 'no title';
          obj.disabled = false;
          urls.push(obj);
        }
        this.setState({ availableModels: urls, urlSelectDisabled: false });
      },
      (e) => {
        //console.log('loadPageModels', e);
        if (e.toString().indexOf('404') > -1) {
          this.isRestOk = false;
          this.setState({
            errMsg: `Missing the custom REST for Page Models ${this.restUrlPageModel}. Have you installed "mpat-core-plugin" ?`
          });
        } else {
          this.setState({
            errMsg: `${this.restUrlPageModel} gave ${e.toString()}`
          });
        }
      });
  }


  /** layout */
  loadPageLayouts() {
    this.layoutIO.get(
      (result) => {
        const urls = [];
        for (const item of result) {
          const obj = {};
          obj.id = item.ID;
          obj.key = `page://${item.ID}`;
          obj.label = item.post_title !== '' ? item.post_title : 'no title';
          obj.disabled = false;
          urls.push(obj);
        }
        this.setState({ availableLayouts: urls, urlSelectDisabled: false });
      },
      (e) => {
        //console.log('loadPageLayouts', e);
        if (e.toString().indexOf('404') > -1) {
          this.isRestOk = false;
          this.setState({
            errMsg: `Missing the custom REST for Page Layouts ${this.restUrlPageLayout}. Have you installed "mpat-core-plugin" ?`
          });
        } else {
          this.setState({
            errMsg: `${this.restUrlPageLayout} gave ${e.toString()}`
          });
        }
      });
  }

  /** first step/selection of pagelayout/pagemodel */
  onSelectModelOrLayout(event) {

    switch (event.target.value) {
      case 'layout':
        this.setState({
          stepTag: 'layout',
          workFlow: 'layout'
        });
        break;
      case 'model':
        this.setState({
          stepTag: 'model',
          workFlow: 'model'
        });
        break;
      default:
        this.setState({ errMsg: `onSelectModelOrLayout(): '${event.target.value}' unknown` });
        break;
    }
  }

  onInputNewModelName(event) { return this.setState({ newPageModelTitle: event.target.value }); }
  onInputNewPageName(event) { return this.setState({ newPageTitle: event.target.value }); }
  onInputNewLayoutName(event) { return this.setState({ newPageLayoutTitle: event.target.value }); }

  createNewLayout() {
    //console.log('createNewLayout');
    this.layoutIO.post(
      {
        post_type: 'page_layout',
        post_status: 'publish',
        post_title: this.state.newPageLayoutTitle,
        mpat_content: {
          layout: this.state.layout
        }
      },
      (a) => {
        const id = a.data.id !== undefined ? a.data.id : a.data.ID;
        // const title = a.data.post_title !== undefined ? a.data.post_title : a.data.title;
        this.setState({
          layoutId: id,
          stepTag: 'page',
          workFlow: 'layout'
        },
          this.waitForChildEdited(this.state.newPageLayoutTitle, id)
        );
      },
      (e) => {
        this.setState({
          stepTag: 'layout',
          errMsg: e
        });
      });
  };

  createNewModel() {
    //console.log('createNewModel');
    this.modelIO.post(
      {
        post_type: 'page_model',
        post_status: 'publish',
        post_title: this.state.newPageModelTitle,
        mpat_content: {
          //  model: this.state.model
        }
      },
      (a) => {
        // depending of the (custom)rest service , id/ID key may be different
        const id = a.data.id !== undefined ? a.data.id : a.data.ID;
        //        const title = a.data.post_title !== undefined ? a.data.post_title : a.data.title;
        this.setState({
          modelId: id,
          workFlow: 'model',
          stepTag: 'page'
        }, this.waitForChildEdited(this.state.newPageModelTitle, id)
        );
      },
      (e) => {
        this.setState({
          stepTag: 'layout',
          errMsg: e
        });
      });
  }

  createNewPage() {
    //console.log('createNewPage');
    this.pageIO.post(
      {
        type: 'page',
        status: 'publish',
        title: this.state.newPageTitle,
        parent: this.state.postParent,
        mpat_content: {
          layoutId: this.state.layoutId
        }
      },
      (a) => {
        const id = Number(a.data.id);
        this.setState(
          {
            stepTag: 'done'
          },
          this.waitForChildEdited(this.state.newPageTitle, id)
        );
      },
      (e) => {
        this.setState({
          errMsg: e
        });
      });
  }

  waitForChildEdited(title, id) {
    const msgStr = l10n.formatString(l10n.modal.edit, title);
    // console.log(msgStr);
    const confirmCB = () => {
      const openedChild = window.open(getEditPostUrl(id));
      this.childTimer = setInterval(() => {
        if (this.state.child === null || this.state.child.closed) {
          this.setState({
            child: null,
            modal: null
          });
          clearInterval(this.childTimer);
        }
      }, 250);
      const inner = (<div>
        <h3>Editing {title} in other window</h3>
        <small>If pop-up blocked try <a target="_manualOpen" onClick={() => { this.setState({ child: null }); }} href={getEditPostUrl(id)}>manually</a> opening in another window</small>
      </div>);
      this.setState({
        modal: overlayConfirm(inner, null, null),
        child: openedChild
      });
    };

    const cancelCB = () => {
      this.setState({
        child: null,
        modal: null
      });
    };

    this.setState({ modal: overlayConfirm(msgStr, confirmCB, cancelCB) });
  }
  /**
   * The 'go back' button.
   */
  goBack() {
    switch (this.state.stepTag) {

      // after having choosen models
      case 'model':
        this.setState({
          newPageModelTitle: null,
          stepTag: 'base',
          workFlow: 'model'
        });
        break;

      // after having choosen layouts
      case 'layout':
        this.setState({
          newPageLayoutTitle: null,
          stepTag: 'base',
          workFlow: 'layout'
        });
        break;

      // after having created/choosen a templated (PL/PM)
      case 'page':
        switch (this.state.workFlow) {

          // you were interesed in a layout...
          case 'layout':
            if (this.state.newPageLayoutTitle != null) {
              // ...which you just created
              this.layoutIO.remove(this.state.layoutId);
            }
            this.setState({
              newPageLayoutTitle: null,
              stepTag: this.state.workFlow,
              workFlow: 'layout'
            });
            break;

          case 'model':

            // you were interesed in a model...
            if (this.state.newPageModelTitle != null) {
              // ...which you just created
              this.modelIO.remove(this.state.modelId);
            }
            this.setState({
              newPageModelTitle: null,
              stepTag: this.state.workFlow,
              workFlow: 'model'
            });
            break;

          default:
            break;
        }
        break;
      default:
        this.setState({
          stepTag: 'base'
        });
        break;
    }
  }

  /**
   * common function to display select-options
   * @param {} object of the available posts
   * @param {*} str workflow name
   */
  getHtmlSelect(coll, wF) {
    if (coll.length > 0) {
      return (<span className="content-editor-container">
        <select
          onChange={(event) => {
            const id = event.target.value;
            let title = null;
            for (const ddo in coll) {
              const dde = coll[ddo];
              if (Number(dde.id) === Number(id)) {
                title = dde.label;
              }
            }
            this.waitForChildEdited(title, id);
            if (this.state.child === null || this.state.child.closed) {
              this.setState({
                layoutId: Number(id),
                newPageLayoutTitle: null,
                workFlow: wF,
                stepTag: 'page'
              });
            }
          }}
        >
          <option />
          {coll.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
        </select>
      </span>);
    }
    return null;
  }


  render() {
    // console.log('state', this.state);
    /** render/display depends of current step and actions made.
     * two nested switch-case (one for the step, second for the type)
   */
    let htmlInput = null;
    let htmlButtonValidate = null;
    let htmlBackButton = null;
    let stepLabel = null;
    let htmlSelect = null;

    if (this.state.stepTag !== 'base') {
      htmlBackButton = getButton(l10n.stepLabel.back, this.goBack, this.state.stepTag !== 'done' ? l10n.stepButton.back : l10n.stepButton.done);
    }

    let inputPlaceholder = '';
    try {
      inputPlaceholder = l10n.formatString(l10n.inputNew, l10n.flow[this.state.stepTag]);
    }
    catch (err) {
      //console.log(err);
      //console.log(this.state.stepTag, l10n.inputNew, l10n.flow[this.state.stepTag]);
      inputPlaceholder = l10n.inputNew + " " + l10n.flow[this.state.stepTag];
    }

    switch (this.state.stepTag) {
      // First step
      case 'base':
        stepLabel = l10n.formatString(l10n.stepLabel.base, l10n.flow.layout, l10n.flow.model);
        htmlSelect = (<span className="content-editor-container">
          <select onChange={this.onSelectModelOrLayout}>
            <option>{l10n.optionChoose}...</option>
            <option value="layout">{l10n.flow.layout}</option>
            <option value="model">{l10n.flow.model}</option>
          </select>
        </span>);
        break;

      // choose (or create) a new model for your page
      case 'model':
        stepLabel = this.state.availableModels.length > 0 ? l10n.formatString(l10n.stepLabel.chooseCreate, l10n.flow.model) : l10n.formatString(l10n.stepLabel.createNew, l10n.flow.model);
        htmlSelect = this.getHtmlSelect(this.state.availableModels, 'model');

        htmlInput = getInput('inputModel', this.onInputNewModelName, inputPlaceholder);
        // if a title has been typed => show create button

        if (this.state.newPageModelTitle !== null && this.state.newPageModelTitle.length > 0) {
          htmlButtonValidate = getButton(
            l10n.formatString(l10n.stepLabel.createNew, this.state.newPageModelTitle),
            this.createModel,
            l10n.formatString(l10n.stepLabel.createNew, l10n.flow.model));
        }
        break;

      // choose (or create) a new layout for your page
      case 'layout':
        stepLabel = this.state.availableLayouts.length > 0 ? l10n.formatString(l10n.stepLabel.chooseCreate, l10n.flow.layout) : l10n.formatString(l10n.stepLabel.createNew, l10n.flow.layout);// 'Choose or create a "Page Layout"' : 'Create a Page Layout';
        htmlSelect = this.getHtmlSelect(this.state.availableLayouts, 'layout');

        htmlInput = getInput('inputLayout', this.onInputNewLayoutName, inputPlaceholder);
        // if a title has been typed => show create button
        if (this.state.newPageLayoutTitle !== null && this.state.newPageLayoutTitle.length > 0) {
          //htmlButtonValidate = getButton(`Create new layout ${this.state.newPageLayoutTitle}`, this.createLayout, 'creat new layout');
          htmlButtonValidate = getButton(
            l10n.formatString(l10n.stepLabel.createNew, this.state.newPageLayoutTitle),
            this.createLayout,
            l10n.formatString(l10n.stepLabel.createNew, l10n.flow.layout));
        }
        break;

      // create a new page...
      case 'page':
        let label = null;

        switch (this.state.workFlow) {
          // ...based upon a layout
          case 'layout':
            let layoutLabel = null;
            if (this.state.layoutId > 0) {
              this.state.availableLayouts.map((d) => {
                if (Number(d.id) === Number(this.state.layoutId)) {
                  layoutLabel = d.label;
                }
              });
            }
            label = layoutLabel !== null ? layoutLabel : this.state.newPageLayoutTitle;
            break;

          // ...based upon a model
          case 'model':
            let modelLabel = null;
            if (this.state.modelId > 0) {
              this.state.availableModels.map((d) => {
                if (Number(d.id) === Number(this.state.modelId)) {
                  modelLabel = d.label;
                }
              });
            }
            label = modelLabel !== null ? modelLabel : this.state.newPageModelTitle;
            break;

          default:
            // this.setState({ errMsg: 'unknown template type'});
            break;
        }

        htmlInput = getInput('inputpage', this.onInputNewPageName, inputPlaceholder);
        htmlButtonValidate = getButton(
          l10n.formatString(l10n.optionChoose, this.state.newPageTitle),
          this.createPage,
          l10n.stepButton.createPage);

        const typeOfPage = this.state.workFlow === 'layout' ? l10n.pageType.layout : l10n.pageType.model;
        //stepLabel = `Choose a title for the page based on ${typeOfPage} '${label}'`;
        stepLabel = l10n.formatString(l10n.insertTitle, typeOfPage, label);
        break;

      case 'done':
        stepLabel = l10n.stepLabel.done;
        break;

      default:
        break;
    }

    if (this.state.child !== null && !this.state.child.closed) {
      stepLabel = (<span>Editing {this.state.workFlow} in external window</span>);
    }

    //if custom rest available => show the rest of the interface
    let ui = null;
    if (this.isRestOk) {
      ui = (<div>
        <div>
          {htmlSelect}
          {htmlInput}
        </div>

        <div>
          {htmlBackButton}
          {htmlButtonValidate}
        </div>
      </div>);
    } else {
      stepLabel = null;
    }

    let st = this.state.stepTag.toLowerCase();
    let flow = l10n.flow[st];
    //console.log(st, flow, l10n.getLanguage());//, l10n.getInterfaceLanguage());
    return (<div className="mpat">
      <div>
        <h3>{flow}</h3>
        <h4>{stepLabel}</h4>
        <strong>{this.state.errMsg}</strong>
      </div>
      {ui}
      {this.state.modal}
    </div>);
  }
}

ReactDOM.render(<MpatNewPage />, document.getElementById('wpbody-content'));
