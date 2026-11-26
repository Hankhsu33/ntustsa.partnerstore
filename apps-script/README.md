# 留言與許願部署

綁定資料庫：1f_qveJu-Q0b9PiwrV1JDGCPeTytZOwhso0KHNTxzOoY。

1. 在 Apps Script 執行 setupCommunity，確認 Google 試算表授權。
2. 建立網頁應用程式部署：執行身分「我」、存取者「所有人」。
3. 將 /exec 網址填入 config.js 的 communityUrl，再部署網站。
4. Reviews 為店家留言評分、Wishes 為許願。status 預設 pending；改為 approved 才公開；hidden 隱藏。
5. 工作表1 不刪除、不覆寫。請勿在公開分享的資料庫加入個資。

資料內容僅收暱稱、店家、星等、分類與文字，不收學號、email、電話。前後端均有輸入限制；文字以純文字呈現，試算表公式字元做跳脫。伺服器以 LockService 保護寫入，requestId 避免重複提交；每個瀏覽器識別碼每分鐘最多送出一次，此限制不是身分驗證，仍需人工審核。展示最近200則已審核資料（掃描最近2000列）。

已於 2026-11-26 部署，正式網址已填入 config.js。

管理方式：開啟資料庫 Reviews 或 Wishes，將 C 欄 status 從 pending 改成 approved，訪客重新載入留言後即可看到。hidden 表示隱藏。請保留第 1 列欄位名稱。測試用資料已設 hidden。

此試算表目前是知道連結即可存取；網站審核只控制網站顯示，不會改變原始試算表的分享權限。

修改 Code.gs 後需在 Apps Script「管理部署作業」編輯既有部署、選擇新版本，才能保留網站現有連結。新增店家時，同步更新後端與表單的 STORE_OPTIONS / stores。
