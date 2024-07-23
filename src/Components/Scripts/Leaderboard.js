import styles from "../Styles/Leaderboard.module.css";
import FastestOfToday from "./FastestOfToday";
import AddScorePopup from "./AddScorePopup";
import { dummyData } from "./DummyData";
import { useRef, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { BiSolidTimer } from "react-icons/bi";

const Leaderboard = () => {
	const [scores, setScores] = useState(dummyData);
	const [showPopup, setShowPopup] = useState(false);
	const mainboxRef = useRef(null);
	const [newIndex, setNewIndex] = useState(null);

	const handleSave = (newScore) => {
		const updatedScores = [...scores, newScore];
		updatedScores.sort((a, b) => {
			const scoreA = parseInt(a.score.replace(/[^0-9]/g, ""), 10);
			const scoreB = parseInt(b.score.replace(/[^0-9]/g, ""), 10);
			return scoreA - scoreB;
		});
		const index = updatedScores.findIndex(
			(score) =>
				score.playerName === newScore.playerName &&
				score.score === newScore.score
		);
		setScores(updatedScores);
		setShowPopup(false);

		setTimeout(() => {
			const newScoreElement = mainboxRef.current.children[index];
			if (newScoreElement) {
				newScoreElement.scrollIntoView({
					behavior: "smooth",
					block: "center",
				});
			}
		}, 100);
		setNewIndex(index);
	};

	const getPrizeAmount = (index) => {
		switch (index) {
			case 0:
				return "₹50000";
			case 1:
				return "₹5000";
			case 2:
				return "₹500";
			default:
				return "";
		}
	};

	return (
		<div className={styles.container}>
			<FastestOfToday />
			<button
				className={styles.addButton}
				onClick={() => setShowPopup(true)}
			>
				+ Add Score
			</button>
			{showPopup && (
				<AddScorePopup
					onSave={handleSave}
					onClose={() => setShowPopup(false)}
				/>
			)}
			<div className={styles.mainbox} ref={mainboxRef}>
				<div className={styles.header}>
					<div className={styles.trophy}>
						<FaTrophy />
					</div>
					<div className={styles.name}>
						<p>Name</p>
						<p>
							<BiSolidTimer /> Time
						</p>
					</div>
				</div>
				{scores.map((score, index) => (
					<div
						key={index}
						className={`${styles.scoreItemBox} ${
							index === newIndex ? styles.newScore : styles.swipe
						} ${
							index === 0
								? styles.gold
								: index === 1
								? styles.silver
								: index === 2
								? styles.bronze
								: ""
						}`}
						style={{ "--animation-delay": `${index * 0.2}s` }}
					>
						<div className={styles.counter}>{index + 1}</div>
						<div className={styles.scoreItem}>
							<p>{score.playerName}</p>
							<div className={styles.score_details}>
								<p>{getPrizeAmount(index)}</p>
								<p>{score.score}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.secondPic}></div>
		</div>
	);
};

export default Leaderboard;
