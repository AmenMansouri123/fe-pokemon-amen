
import { useEffect, useState } from "react";
import QuizCard from "../components/QuizCard";

const TOTAL_QUESTIONS = 10;

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function Quiz() {
  const [pokemons, setPokemons] = useState([]);
  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  // Pokemon ophalen
  useEffect(() => {
    const controller = new AbortController();

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
      signal: controller.signal
    })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setPokemons(data.results);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Quiz kon niet geladen worden.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  function createQuestion() {
    if (pokemons.length < 4) return;

    const shuffled = shuffle(pokemons);
    const options = shuffled.slice(0, 4);
    const correct = options[Math.floor(Math.random() * 4)];

    const id = correct.url.split("/").filter(Boolean).pop();

    setQuestion({
      name: correct.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      options: shuffle(options.map((p) => p.name))
    });

    setSelectedAnswer(null);
  }

  // Start the first question
  useEffect(() => {
    if (pokemons.length >= 4 && questionNumber === 0 && !question) {
      const shuffled = shuffle(pokemons);
      const options = shuffled.slice(0, 4);
      const correct = options[Math.floor(Math.random() * 4)];
      const id = correct.url.split("/").filter(Boolean).pop();

      // Schedule initial question in state without extra API calls
      setQuestion({
        name: correct.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        options: shuffle(options.map((p) => p.name))
      });

      setQuestionNumber(1);
    }
  }, [pokemons, questionNumber, question]);

  function handleAnswer(answer) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    if (answer === question.name) {
      setScore((current) => current + 10);
    }
  }

  function nextQuestion() {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }

    createQuestion();
    setQuestionNumber((current) => current + 1);
  }

  function restartQuiz() {
    setScore(0);
    setFinished(false);
    setQuestionNumber(1);
    createQuestion();
  }

  if (loading) return <p>Quiz wordt geladen...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <div className="quiz-page">
      <p className="pokedex-label">🎮 POKÉMON CHALLENGE</p>
      <h1>Who's That Pokémon?</h1>
      <p>Guess the Pokémon and test your knowledge!</p>

      {finished ? (
        <div className="quiz-finished">
          <h2>🏆 Quiz Completed!</h2>
          <p>Your Final Score</p>
          <strong>{score} / {TOTAL_QUESTIONS * 10}</strong>

          <button onClick={restartQuiz}>
            🔄 Play Again
          </button>
        </div>
      ) : question ? (
        <>
          <div className="quiz-topbar">
            <span>
              Question {questionNumber} / {TOTAL_QUESTIONS}
            </span>
            <span>⭐ Score: {score}</span>
          </div>

          <QuizCard
            question={question}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />

          {selectedAnswer !== null && (
            <button className="quiz-next" onClick={nextQuestion}>
              {questionNumber >= TOTAL_QUESTIONS
                ? "See Results 🏆"
                : "Next Question →"}
            </button>
          )}
        </>
      ) : (
        <p>Preparing your first question...</p>
      )}
    </div>
  );
}

export default Quiz;
