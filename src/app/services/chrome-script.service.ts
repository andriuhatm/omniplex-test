import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChromeScriptService {

  constructor() { }

  runScript(fn: any) {
    chrome.tabs.query(
      { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
      function (tabs: chrome.tabs.Tab[]) {
        const tabId = tabs[0].id;
        if (!tabId) return;

        chrome.scripting.executeScript({
          target: { tabId },
          func: fn,
          args: [],
        });
      }
    );
  }
}
