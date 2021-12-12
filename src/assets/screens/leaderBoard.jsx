import { initializeApp } from "firebase/app"
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAPM4k803smpISk7JkHkDdTCFCvh8GW20U",
    authDomain: "sleeer-70748.firebaseapp.com",
    projectId: "sleeer-70748",
    storageBucket: "sleeer-70748.appspot.com",
    messagingSenderId: "988143171330",
    appId: "1:988143171330:web:2328eef52fbd0108a7741b"
});

const db = getFirestore();

async function getData() {
    const querySnapshot = await getDocs(collection(db, "leaderboard"));
    const scoreList = await querySnapshot.docs.map(doc => doc.data());
    console.log(scoreList)
    return scoreList
}

let scores = [
    {
        username: 'Nick',
        score: 20
    },
    {
        username: 'Nick',
        score: 7
    },
    {
        username: 'Nick',
        score: 20
    },
    {
        username: 'Nick',
        score: 20
    },
    {
        username: 'Nick',
        score: 21
    },
]

scores.sort(function (a, b) {
    return parseFloat(b.score) - parseFloat(a.score);
});

const leaderBoard = (
    <div className="col-12">
        <div className="screen">
            <h1>High scores</h1>
            <ol className="list">
                {scores.map(score => {
                    return <li>
                        <span className="username">{score.username}</span>
                        <span className="score">{score.score}</span>
                    </li>
                })}
                <li className="player">
                    <span className="username">Je moeder</span>
                    <span className="score">01</span>
                </li>
            </ol>
        </div>
    </div>
)

export default leaderBoard