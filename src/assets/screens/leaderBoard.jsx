// @ts-nocheck

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  limit,
  getDocs,
  query,
  doc,
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
  const q = query(collection(db, "leaderboard"));

  const querySnapshot = await getDocs(q);
  const scoreList = await querySnapshot.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });
  return scoreList;
}

const leaderBoard = async (score, context) => {
  const data = await getData();

  data.sort(function (a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
  });

  console.log(data, context.uid);

  const myOwn = data
    .map((value, index) => {
      if (value.uid === context.uid) return { ...value, standing: index + 1 };
    })
    .filter((value) => value !== undefined);

  console.log(myOwn);

  const top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div style={{ flexDirection: "column", gap: 32 }} className="col-12">
      <div style={{ padding: 30, width: "55%" }} className="screen">
        <span className="screen-overlay two"></span>
        <span className="screen-overlay three"></span>
        <span className="screen-overlay"></span>
        <h1>High scores</h1>
        <ol className="list">
          {top5.map((score, index) => {
            return (
              <li className={score.uid === context.uid && "player"}>
                <span className="index">{index + 1}</span>
                <span className="username">{score.name}</span>
                <span className="score">{score.score}</span>
              </li>
            );
          })}
          <li className="player">
            <span className="index">{myOwn[0].standing}</span>
            <span id="username" className="username">
              {context.name}
            </span>
            <span className="score">{score}</span>
          </li>
        </ol>
      </div>
      <button
        className="try-again"
        onClick={() => {
          context.scene.start("game");
          context.menuSound.stop();
        }}
      >
        TRY AGAIN
      </button>
    </div>
  );
};

export default leaderBoard;
