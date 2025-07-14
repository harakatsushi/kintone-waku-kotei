jQuery.noConflict();
(function (PLUGIN_ID) {
  "use strict";
  const setObserver = (dom, callback) => {
    // DOMの変化が起こった時の処理
    const observer = new MutationObserver((mutations) => {
      console.log(`DOMが変化しました`, mutations);
      callback(mutations);
      // observer.disconnect(); // 監視を終了
    });

    // 監視時のオプション
    const config = {
      childList: true, // 子ノードの変化を監視
      subtree: true, // 子孫ノードも監視対象に含める
      attributes: false, // 属性変化の監視
      characterData: false, // テキストノードの変化を監視
      characterDataOldValue: false, // 変化前のテキストを matation.oldValue に格納する
      attributeOldValue: false, // 変化前の属性値を matation.oldValue に格納する
    };

    /** 要素の変化監視をスタート */
    observer.observe(dom, config);
  };
  let cols = "";
  let rows = "";
  kintone.events.on(["app.record.index.show"], (event) => {
    // プラグインの設定情報を取得する
    const config = kintone.plugin.app.getConfig(PLUGIN_ID) || {};
    console.log(config);
    // 設定情報がなければ処理を終了する
    if (Object.keys(config).length === 0) {
      return;
    }
    cols = config.cols;
    rows = config.rows;
    // domの変化を検出しstyleを変更
    const table = document.getElementsByTagName("table")[0];
    const thead3 = document.getElementsByTagName("thead")[1];
    const thead4 = document.getElementsByTagName("thead")[0];

    console.log("===index");

    setObserver(table, (mutations) => {
      var table = document.querySelector(".recordlist-gaia");

      table.setAttribute(
        "_fixedhead",
        "rows:" + config.rows + "; cols:" + config.cols
      );
      let thead = document.getElementsByTagName("thead")[0];
      // /let thead = document.querySelector("thead");
      let theadHTML = table.innerHTML.match(
        /(?<=<thead>).*?(?=<\/thead>)/
      )?.[0];
      if (theadHTML) {
        let trHTML = theadHTML
          .replace("<thead>", "<tr>")
          .replace("</thead>", "</tr>");

        thead.insertAdjacentHTML("afterend", trHTML);
      }
      const hreadtable = document.querySelector(
        ".gaia-app-recordlist-fixedheader"
      );
      console.log(hreadtable);
      jQuery(".gaia-app-recordlist-fixedheader").remove();
      thead.style.display = "none";
      thead3.style.display = "none";
      thead4.style.display = "none";
      table.style.zIndex = "999";
      // hreadtable.style.display = "none";
      FixedMidashi.create();
    });
  });
  window.addEventListener("load", (event) => {
    setTimeout(function () {
      var table = document.querySelector(".recordlist-gaia");

      table.setAttribute("_fixedhead", "rows:" + rows + "; cols:" + cols);

      let thead = document.querySelector("thead");
      let theadHTML = table.innerHTML.match(
        /(?<=<thead>).*?(?=<\/thead>)/
      )?.[0];
      if (theadHTML) {
        let trHTML = theadHTML
          .replace("<thead>", "<tr>")
          .replace("</thead>", "</tr>");

        thead.insertAdjacentHTML("afterend", trHTML);
      }

      thead.style.display = "none";

      FixedMidashi.create();
    }, 1800);
  });
})(kintone.$PLUGIN_ID, jQuery);
