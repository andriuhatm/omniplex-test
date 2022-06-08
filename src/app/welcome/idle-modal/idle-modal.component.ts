import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html',
  styleUrls: ['./idle-modal.component.scss']
})
export class IdleModalComponent implements OnInit {
  REDIRECT_URL = "https://help.nickelled.com/";
  HTML = `<div id="idle-modal">
      <h1>Are you lost Adrian?</h1>
      <div id="idle-modal-buttons">
        <button id="idle-modal-button-yes">Yes</button>
        <button id="idle-modal-button-no">No</button>
      </div>
  </div>`;

  constructor() { }

  ngOnInit() {
    const $this = this;

    const trackMouseMovement = (html: string, redirect_url: string) => {
      let t: any;
      const IDLE_TIME_LIMIT = 5000; // 5 sec
      document.body.innerHTML += html; // inject modal html
      let modalEl = document.getElementById('idle-modal');

      let btnNo = document.getElementById('idle-modal-button-no');
      btnNo?.addEventListener("click", () => {
        hideModal();
      });

      let btnYes = document.getElementById('idle-modal-button-yes');
      btnYes?.addEventListener("click", () => {
        hideModal();
        window.open(redirect_url, '_blank');
      });

      const showModal = () => {
        if (modalEl && (!modalEl.style.display || modalEl.style.display === "none")) {
          modalEl.style.display = "block";
        }
      }

      const hideModal = () => {
        if (modalEl && (!modalEl.style.display || modalEl.style.display === "block")) {
          modalEl.style.display = "none";
        }
      }

      const resetTimer = () => {
        window.clearTimeout(t);
        t = window.setTimeout(showModal, IDLE_TIME_LIMIT);
      }

      // loadMouseTrackingEvent(true);
      window.onload = resetTimer;
      window.onmousemove = resetTimer;
      window.onmousedown = resetTimer;  // catches touchscreen presses    
      window.ontouchstart = resetTimer; // catches touchscreen swipes      
      window.ontouchmove = resetTimer;  // required by some devices 
      window.onclick = resetTimer;      // catches touchpad clicks as well
      window.onkeydown = resetTimer;
      window.addEventListener('scroll', resetTimer, true);
    }

    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs: chrome.tabs.Tab[]) {
        const tabId = tabs[0].id;
        if (!tabId) return;

        const css = `#idle-modal {
          display: none;
          border: 1px solid #e5e7eb;
          border-radius: 0.375rem;
          position: fixed;
          bottom: 30px;
          right: 30px;
          background-color: white !important;
          z-index: 1999;
          padding: 1.5rem;
        }
        #idle-modal h1 {
          font-weight: bold;
          color: black;
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
        #idle-modal-buttons {
          text-align:center;
          margin-top: 5px;
        }
        #idle-modal-buttons button {
          background-color: rgb(234 88 12);
          border-radius: 0.25rem;
          color: white;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          padding-left: 2rem;
          padding-right: 2rem;
          border: none;
          cursor: pointer;
        }`;
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          css: css,
        });

        chrome.scripting.executeScript({
          target: { tabId },
          func: trackMouseMovement,
          args: [$this.HTML, $this.REDIRECT_URL],
        });
      }
    );
  }

}
