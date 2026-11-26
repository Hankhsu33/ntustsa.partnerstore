# ntustsa.partnerstore

臺科學生的優惠店家清單與互動地圖。

Designed and developed by HSU HAN SHENG.
Copyright © 2026 HSU HAN SHENG. All rights reserved.
商標及第三方素材權利歸原權利人所有。

## 開發

需要 Node.js 22 以上，不需安裝外部套件。

```sh
npm run check
npm run build
npm start
```

開啟 http://127.0.0.1:8765。

## 發布

推送 main 後，GitHub Actions 建置 dist 並發布 GitHub Pages。
公開網址：https://hankhsu33.github.io/ntustsa.partnerstore/
GitHub Variables 的 SITE_URL 設為以上網址（不含最後斜線）。

目前採用本地公開 JSON 快照。店家合作期限、適用資格、圖片及部分地址仍待確認，詳情依頁面說明。
未設定 Google Sheets Secrets，不會執行外部資料同步。正式接入前需先完成欄位映射和資料審核。
GA4_ID 為選填，目前未啟用分析。

## 素材來源

地圖使用 Leaflet 1.9.4、CARTO 與 OpenStreetMap，頁面保留其署名。底圖服務依各提供者政策使用。
學生會徽章取自 https://ntustsa.oen.tw/ 使用的原圖，未修改顏色或比例。
學生證為虛構示意圖片，不含真實學生個資，非有效證件。
原始學生證照片、內部簽約草稿與工作檔不在此儲存庫。

## 2026-11-16 店家清單更新
僅收錄「第20屆特約商店」OO 分頁中「優惠內容」非空白的 14 家店家。店名、地址、電話、優惠與簽約狀況皆依該列資料。工作表1為學生期望的優惠，不作為上架來源。資料仍為快照，非即時同步。

## Google Maps 商家資料
2026-11-16 已逐家核對 14 筆商家，採用 Google Maps 商家座標與 Place ID，導航連結指定分店。可取得的 12 筆電話與 12 筆每週營業時間已更新；未提供欄位保留待確認。Tower Lucky 查得永和總店，優惠適用分店仍須學生會確認。優惠與規則保持 OO 分頁原文。


## 活動專區維護
編輯 `data/events.json`，每筆活動使用以下欄位：
- `id`：不重複的英文小寫、數字與連字號識別碼。
- `published`：布林值；只有 `true` 的活動會公開。
- `title`、`offer`：活動名稱與活動期間限定優惠。
- `startDate`、`endDate`：YYYY-MM-DD，依台灣日期判斷，起訖日皆包含。
- `storeIds`：合作店家 ID 陣列，必須存在於 `data/stores.json`。
- `rules`：選填的活動限制與使用方式。
目前沒有已確認活動，資料為空陣列，網站顯示「活動即將公布」。發布活動前先填齊資料；建置會拒絕錯誤日期、重複 ID、缺少優惠或不存在的店家。已結束活動可在活動狀態選單查看。推送 main 後部署生效。

地圖的「快速找店家」列出全部店家。選取店家會定位、開啟優惠視窗並以橘色標記突出；若店家被篩選隱藏，會先清除篩選再定位。

## 2026-11-26 探索頁更新
- `assets/refresh.js` / `assets/refresh.css`：主打卡片、進階篩選、轉盤與吃透透入口。
- 價格欄位 `pricePerPerson` 必須為已確認的正數；服務方式 `serviceModes` 為陣列（內用、外帶、外送）。缺資料不會通過指定價格或服務篩選，可用「待提供」查看。
- 主打卡片目前使用原創 CSS 餐食意象插畫，並非店家實拍。主打店家 ID 與簡介在 refresh.js 維護。
- 轉盤沿用目前清單篩選，選中後可開啟店家完整資訊。
- 留言、星等與許願因尚未有共享資料服務，依使用者指示取消。
