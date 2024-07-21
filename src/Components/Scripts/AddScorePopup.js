import { useState, useEffect, useRef } from "react";
import styles from "../Styles/AddScorePopup.module.css";

const AddScorePopup = ({ onSave, onClose }) => {
	const [score, setScore] = useState("");
	const [playerName, setPlayerName] = useState("");
	const [isScoreValid, setIsScoreValid] = useState(false);
	const popupRef = useRef(null);

	const handleSubmit = (e) => {
		onSave({ playerName: playerName, score: formatScore(score) });
		onClose();
	};

	const handleClickOutside = (event) => {
		if (popupRef.current && !popupRef.current.contains(event.target)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		validateScore(score);
	}, [score]);

	const validateScore = (input) => {
		const regex = /^(\d{2})(\d{2})(\d{3})$/;
		const match = input.match(regex);
		if (match) {
			const minutes = parseInt(match[1], 10);
			const seconds = parseInt(match[2], 10);
			if (minutes < 60 && seconds < 60) {
				setIsScoreValid(true);
				return;
			}
		}
		setIsScoreValid(false);
	};

	const formatScore = (input) => {
		const regex = /^(\d{2})(\d{2})(\d{3})$/;
		const match = input.match(regex);
		if (match) {
			const minutes = match[1];
			const seconds = match[2];
			const milliseconds = match[3];
			return `${minutes}:${seconds}::${milliseconds}`;
		}
		return input;
	};

	return (
		<div className={styles.popup} ref={popupRef}>
			<h2>Add Score</h2>
			<form>
				<div className={styles.input_container}>
					<label htmlFor="playerName">Name:</label>
					<input
						type="text"
						id="playerName"
						placeholder="abc (minimum 3 characters)"
						value={playerName}
						onChange={(e) => setPlayerName(e.target.value)}
					/>
				</div>
				<div className={styles.input_container}>
					<label htmlFor="score">Score:</label>
					<input
						type="text"
						id="score"
						placeholder="1234567 (exactly 7 digits)"
						value={score}
						onChange={(e) => setScore(e.target.value)}
					/>
				</div>
				<div className={styles.button_container}>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={
							playerName.length < 3 ||
							!isScoreValid ||
							!/^\d+$/.test(score)
						}
					>
						Save
					</button>
					<button type="button" onClick={onClose}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddScorePopup;
