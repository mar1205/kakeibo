//===============
// FIREBASE 設定
//===============
// このファイルではアプリをコンソールで作ったFirebaseと連携する
//　詳細はREADME.mdまで

// FirebaseのSDK関数をインポートする（CDNにて、モジュールバージョン）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// SDKセットアップ
const firebaseConfig = {
  apiKey: "AIzaSyCaKR7Nz5jC1zTxJqr18Sh7r6pnB5_UBzE",
  authDomain: "kakeibo-2f0d7.firebaseapp.com",
  projectId: "kakeibo-2f0d7",
  storageBucket: "kakeibo-2f0d7.firebasestorage.app",
  messagingSenderId: "706175490856",
  appId: "1:706175490856:web:6658c0340690f797238e1d",
  //measurementId: "G-7LVNZKH456"
};

// 上記の設定でFirebaseを起動する
const app = initializeApp(firebaseConfig);

// Firestone(データベース)を起動し、エクスポートしてapp.jsを使用する
export const db = getFirestore(app);
