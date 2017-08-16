import React from 'react';
import i18n from './i18n';

export const getId = () => Math.random().toString(36).substr(3, 5);

export function onEnter(event, key, cb) {
  console.log(event.keyCode);
  if (event.keyCode === key) {
    cb(event);
  }
}

export const getEditPostUrl = id => `./post.php?post=${Number(id)}&action=edit`;

export const getButton = (title, click, value =i18n.stepButton.next) => (<button title={title} onKeyUp={e => onEnter(e, 78, click)} onClick={click} key={getId()} id={getId()} className="button blue_white" style={{ cursor: 'pointer', margin: '0.5em' }} type="button">{value}</button>);

export const getInputButton = (title, click, value =i18n.stepButton.next) => (<input title={title} onClick={click} value={value} key={getId()} id={getId()} className="button blue_white" style={{ cursor: 'pointer' }} type="button" />);

export const getInput = (key, change, placeholder = '[input]') => <input type="text" key={key} onChange={change} placeholder={placeholder.toLocaleLowerCase()} style={{ margin: '0.5em' }} />;

export const overlayConfirm = (inner, confirm, cancel) => {
  const y = confirm != null ? getButton(i18n.modal.confirm, confirm, i18n.modal.yes) : null;
  const n = cancel != null ? getButton(i18n.modal.cancel, cancel, i18n.modal.no) : null;
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
