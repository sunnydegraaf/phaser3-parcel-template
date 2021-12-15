// @ts-nocheck

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  limit,
  getDocs,
  query,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAPM4k803smpISk7JkHkDdTCFCvh8GW20U",
  authDomain: "sleeer-70748.firebaseapp.com",
  projectId: "sleeer-70748",
  storageBucket: "sleeer-70748.appspot.com",
  messagingSenderId: "988143171330",
  appId: "1:988143171330:web:2328eef52fbd0108a7741b",
});

const db = getFirestore();

async function getData() {
  const q = query(collection(db, "leaderboard"), limit(5));

  const querySnapshot = await getDocs(q);
  const scoreList = await querySnapshot.docs.map((doc) => doc.data());
  return scoreList;
}

const leaderBoard = async (score, context) => {
  const data = await getData();

  data.sort(function (a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
  });

  return (
    <div className="col-12">
      <div className="screen">
        <span className="screen-overlay two"></span>
        <span className="screen-overlay three"></span>
        <span className="screen-overlay"></span>
        <h1>High scores</h1>
        <ol className="list">
          {data.map((score) => {
            return (
              <li>
                <span className="username">{score.username}</span>
                <span className="score">{score.score}</span>
              </li>
            );
          })}
          <li value={12} className="player">
            <span id="username" className="username">
              {context.name}
            </span>
            <span className="score">{score}</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default leaderBoard;
