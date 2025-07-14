((PLUGIN_ID) => {
  // エスケープ処理
  const escapeHtml = (htmlstr) => {
    if (!htmlstr) {
      return "";
    }
    return htmlstr
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/\n/g, "&#xA;");
  };
  // プラグインの設定情報を取得
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);

  const colsData = document.getElementById("cols");
  const rowsData = document.getElementById("rows");

  colsData.value = config.cols || "";
  rowsData.value = config.rows || "";

  // アプリID取得
  const appId = kintone.app.getId();

  // 「キャンセル」ボタン押下時にプラグイン一覧画面に遷移する
  const cancelButton = document.getElementById("cancel");
  cancelButton.addEventListener("click", () => {
    // プラグイン一覧画面に遷移する
    window.location.href = `/k/admin/app/${appId}/plugin/`;
  });

  // 「保存する」ボタン押下時に入力情報を設定する
  const saveButton = document.getElementById("submit");
  saveButton.addEventListener(
    "click",
    () => {
      const cols = escapeHtml(colsData.value);
      const rows = escapeHtml(rowsData.value);

      var body = {
        app: appId,
      };

      // プラグインの設定を保存
      const newConfig = {
        cols,
        rows,
      };
      console.log(newConfig);
      kintone.plugin.app.setConfig(newConfig, () => {
        // アプリの設定画面に遷移する
        window.location.href = `/k/admin/app/flow?app=${appId}`;
      });
    },
    function (error) {
      // error
      console.log(error);
    }
  );
})(kintone.$PLUGIN_ID);
