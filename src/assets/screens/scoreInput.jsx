// @ts-nocheck

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import image from "../images/tinified/score.png";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAPM4k803smpISk7JkHkDdTCFCvh8GW20U",
  authDomain: "sleeer-70748.firebaseapp.com",
  projectId: "sleeer-70748",
  storageBucket: "sleeer-70748.appspot.com",
  messagingSenderId: "988143171330",
  appId: "1:988143171330:web:2328eef52fbd0108a7741b",
});

const db = getFirestore();

const handleSetScore = async (context, score) => {
  const name = document.getElementById("name").value;

  try {
    await addDoc(collection(db, "leaderboard"), {
      name,
      score: score,
      achievedAt: Date.now(),
    });

    context.name = name;
    context.elementInput.destroy();
  } catch (error) {
    console.log(error);
  }
};

const scoreInput = async (context, score) => {
  return (
    <div className="col-12">
      <div className="screen">
        <span className="screen-overlay two"></span>
        <span className="screen-overlay three"></span>
        <span className="screen-overlay"></span>
        <img className="score-logo" src={image} width={100} height={100} />
        <h3 className="score-name">{score}</h3>
        <div className="form-wrapper">
          <input id="name" name="name" placeholder="ENTER YOUR NAME" />
          <button onClick={() => handleSetScore(context, score)}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default scoreInput;
