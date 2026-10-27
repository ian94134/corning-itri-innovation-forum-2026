# 康寧 × 工研院創新論壇網站｜Claude 交接

## 專案現況

- 這是無建置步驟的靜態網站，網站檔案直接放在儲存庫根目錄。
- GitHub 儲存庫：<https://github.com/ian94134/corning-itri-innovation-forum-2026>
- GitHub Pages：<https://ian94134.github.io/corning-itri-innovation-forum-2026/>
- GitHub Pages 由 `main` 分支的 `/ (root)` 自動部署。推送後請確認 Actions 的 `pages-build-deployment` 成功，並開啟上線網址檢查。
- 另有既有 Sites 網址：<https://corning-itri-innovation-2026.iccoursedomain5.chatgpt.site/>。後續以本儲存庫和 GitHub Pages 為主要交付版本。

## 使用者已確認的設計要求

- 將原始 eDM **重新設計成專業的網站**；文字、講者、議程等活動內容需維持原意與完整性。
- 以 `assets/header.jpg` 原始主視覺作為滿版首屏，整體配色跟隨主視覺的藍色系。
- 桌面與手機皆須易讀，維持響應式排版，避免過小字體與橫向溢出。
- 議程需清楚、精緻；時間區間以一行呈現，講者和主題有明確層級。
- 講者卡片中的職稱與下方分隔線不要留下過大的空白。
- 不要恢復已移除的「原始 eDM 圖文參考」區塊或頁尾「取消訂閱」文字。
- 保留原始報名連結：<https://itricollege.surveycake.biz/s/xNk8z>。

## 程式結構

- `index.html`：頁面骨架、活動介紹、導覽、主視覺、報名入口。
- `data.js`：14 位講者資料，以及主論壇、專題論壇 I、專題論壇 II 的 25 筆議程。內容修改前請核對原始 eDM，不要僅憑猜測更動。
- `app.js`：講者篩選、議程分頁和畫面渲染。
- `style.css`：全站唯一樣式表（2026-10-27 重新設計後合併原 `refined.css`、`agenda.css`）。色彩與字體定義在 `:root` 變數；斷點為 1100/900/700/360px。字體由 Google Fonts 載入 Noto Sans TC 與 Inter。
- `assets/`：主視覺、講者照片和其他來自 eDM 的素材。

## 接手與驗證

網站製作、優化與驗收規格另見 `WEB_SPEC.md`；依使用者的新需求執行對應工項。

1. 先讀取 `README.md`、`index.html`、`data.js`、`app.js` 及 `style.css`，確認目前行為後再改動。
2. 本機可於儲存庫根目錄執行 `python -m http.server 8000`，瀏覽 <http://localhost:8000/>；沒有套件安裝或編譯流程。
3. 每次修改至少檢查桌面與手機寬度：主視覺、講者篩選、三個議程分頁、報名連結、文字換行和圖片載入。
4. 推送 `main` 後，確認 GitHub Pages 實際顯示最新版本；不要只以 `git push` 成功作為上線完成的證據。
5. 目前沒有新一輪功能需求。待使用者提出具體修改後再製作，避免自行改動已確認的內容。
