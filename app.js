// =========================
// 家計簿　ー　論理思考
// =========================
// このファイルの４の役割は:
// 1.Firebaseと連携する（クラウドのデータベース）
// 2.リアルタイムで更新
// 3.フォームで追加した出費を送る
// 4.リストから削除できる

import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 操作対象となるHTML要素への参照
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const statusMessage = document.getElementById("status-message");

// 1.コレクションテーブルに関するfirestoreの出費
// FirestoreではコレクションはSQLのテーブル見たいなもので、
// 中に格ドキュメンrowのようなものです。
const expensesRef = collection(db, "expenses");

// 1. 出費を追加する
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // フォーム送信する際にページリフレッシュ予防

  const newExpense = {
    name: nameInput.value.trim(),
    amount: Number(amountInput.value),
    category: categoryInput.value,
    createdAt: Timestamp.now(), // 現在時間を保存する
  };

  try {
    // addDocがFirestoreにデータを送信する、
    // firestoreが自動でIDを作成する
    await addDoc(expensesRef, newExpense);

    // フォームを作成した後、自動でクリアする
    form.reset();
  } catch (error) {
    console.error("出費追加にエラー発生", error);
    statusMessage.textContent = "エラーが発生しました。もう一度お試しください";
  }
});

// 2.　リアルタイムでリストを更新する
// onSnapshotではDB情報を自動で更新する
const expensesQuery = query(expensesRef, orderBy("createdAt", "desc"));

onSnapshot(expensesQuery, (snapshot) => {
  list.innerHTML = ""; // 更新する前にリストをクリアする
  let total = 0;

  if (snapshot.empty) {
    statusMessage.textContent = "まだ支出が登録されていません。";
  } else {
    statusMessage.textContent = "";
  }

  snapshot.forEach((docSnap) => {
    const expense = docSnap.data();
    const expenseId = docSnap.id;

    total += expense.amount;

    // 支出を表示するために<li>要素を作成
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="expense-info">
        <span class="expense-name">${expense.name}</span>
        <span class="expense-category">${expense.category}</span>
      </div>
      <div>
        <span class="expense-amount">¥${expense.amount.toLocaleString()}</span>
        <button class="delete-btn" data-id="${expenseId}">削除</button>
      </div> 
`;

    list.appendChild(li);
  });

  // 合計を更新しトップへ表示
  totalDisplay.textContent = `¥${total.toLocaleString()}`;

  // 上記に格削除ボタンにクリックイベントを追加する
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => handleDelete(button.dataset.id));
  });
});

// 3.出費を削除する
async function handleDelete(expenseId) {
  try {
    // doc()は"expenses"とうドキュメントの中を指示する
    // deleteDoc()はそのドキュメントをデータベースから削除する
    await deleteDoc(doc(db, "expenses", expenseId));
  } catch (error) {
    console.error("削除する際にエラー発生:", error);
    statusMessage.textContent = "削除中にエラーが発生しました。";
  }
}
