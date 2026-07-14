家計簿
シンプル家計簿アプリをJavaScriptとFirebase(Firestore)で作りました

このアプリでできること
　ー　出費を追加（名前、価格、カテゴリー）
　ー　出費リストをリアルタイムで追加
　ー　出費の合計を自動で計算可能
　ー　出費をさ削除可能

ステップ１　
Firebaseプロジェクトをつくる

1. https://console.firebase.google.com/　をアクセスする
2.　プロジェクト追加をクリックする
3.　サイドバーメニューBuild>Firestore>Database
4. データベースをクリックし、テストモードを選択する
5.位置情報を一番近いところを選択する

スタップ２
プロジェクトのcredentialsを取得する

1.Firebaseコンソールでgearアイコンをクリックする
2.”Your apps”までスクロールし、"</>"アイコンをクリックする
3.アプリに名前をつける＊"kakeibo-web"
4.Firebaseはオブジェクト"firebaseConfig"以下見たいにできるはず:
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "kakeibo-xxxx.firebaseapp.com",
  projectId: "kakeibo-xxxx",
  storageBucket: "kakeibo-xxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

5.上のコードをコーピし、ファイルのfirebase-firebaseConfig.js,に貼り付けるプレースホルダーを置き換える例YOUR_API_KEY_HERE, etc.

ステップ３
ローカルでアプリを運用
VSCode+LiveServer
1.インストール後
2.index.htmlで、"Open with Live Server"をクリックする


ステップ４
テストをする
出費を追加し、上手くしようできたら画面ででてくる
Firebase Consoleで反映されたか確認する（expensesという変数で追加した値がでてくる）

ステップ５
Githubにアップする前の確認
**重要:** 通常、Firebase の **apiKey** は注意せずに公開リポジトリへアップロードしません。Firebase Web では、apiKey だけで Firestore に自由にアクセスできるわけではありません。本当にデータを守るのは **Firestore のセキュリティルール**です。それでも、apiKey を公開しないことが推奨されています。

プロジェクトを完成させる前に、次の画面でルールを変更しましょう。

**Firestore Database → Rules（ルール）**

「テストモード」のままにしないでください。テストモードは **30日後に期限切れ**になり、その間は誰でもデータを書き込めます。

シンプルな設定例は次のとおりです。

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{document} {
      allow read, write: if true;
    }
  }
}
```

また、GitHub リポジトリの **README** に、次の内容を簡単に書きましょう。

* プロジェクトの概要
* 使用した技術
* 実行方法

これらを書くことで、採用担当者がプロジェクトを理解しやすくなります。

## 今後の改善案

プロジェクトが完成したら、次の機能を追加すると、さらにアピールできます。

* カテゴリーで絞り込み検索を追加する
* Chart.js を使ってカテゴリーごとの支出グラフを表示する
* Firebase Authentication を使って複数ユーザーに対応する
* Firebase Hosting（無料）でデプロイし、公開URLを作成する
