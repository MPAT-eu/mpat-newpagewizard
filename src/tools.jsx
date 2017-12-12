import React from 'react';
import l10n from './languages';

export const getId = () => Math.random().toString(36).substr(3, 5);

export function onEnter(event, key, cb) {
  //console.log(event.keyCode);
  if (event.keyCode === key) {
    cb(event);
  }
}

export const getEditPostUrl = id => `./post.php?post=${Number(id)}&action=edit`;

export const getButton = (title, click, value = l10n.stepButton.next) => {
  //console.log('getButton', value);
  return (<button title={title} onKeyUp={e => onEnter(e, 78, click)} onClick={click} key={getId()} id={getId()} className="button blue_white" style={{ cursor: 'pointer', margin: '0.5em' }} type="button">{value}</button>);
}

export const getInputButton = (title, click, value = l10n.stepButton.next) => (<input title={title} onClick={click} value={value} key={getId()} id={getId()} className="button blue_white" style={{ cursor: 'pointer' }} type="button" />);

export const getInput = (key, change, placeholder = '[input]') => {
  let ph = placeholder;
  try {
    const pht = typeof placeholder;
    // fix for sudden weird behaviour from react-localization
    if (pht === 'object') {
      ph = placeholder.join('');
    }
    //console.log(pht, ph);
  } catch (err) { console.log('placeholder input', err); }
  return (<input type="text" key={key} onChange={change} placeholder={ph} style={{ margin: '0.5em'/*, width: '384px' */ }} />);
}

export const overlayConfirm = (inner, confirm, cancel) => {
  const y = confirm != null ? getButton(l10n.modal.confirm, confirm, l10n.modal.yes) : null;
  const n = cancel != null ? getButton(l10n.modal.cancel, cancel, l10n.modal.no) : null;
  return (<div
    style={{
      display: 'inline',
      position: 'fixed', /* Stay in place */
      zIndex: 1, /* level up */
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.7)'
    }}><div
      style={{
        backgroundColor: '#fefefe',
        margin: '25%',
        padding: '20px',
        border: '1px solid #888',
        overflow: 'auto',
        width: '50%'
      }}>{inner}
      <div style={{ margin: '5px' }}>
        {y}&nbsp;{n}
      </div>
    </div>
  </div>);
};
