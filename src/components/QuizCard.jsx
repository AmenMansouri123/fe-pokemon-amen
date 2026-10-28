
function QuizCard({ question, selectedAnswer, onAnswer }) {
  const answered = selectedAnswer !== null;

  return (
    <div className="quiz-card">
      <div className="quiz-image-box">
        <img
          src={question.image}
          alt={answered ? question.name : "Mystery Pokémon"}
          className={`quiz-pokemon-image ${answered ? "revealed" : ""}`}
        />
      </div>

      <h2>
        {answered ? question.name : "Who's That Pokémon?"}
      </h2>

      <div className="quiz-answers">
        {question.options.map((option) => {
          let resultClass = "";

          if (answered) {
            if (option === question.name) {
              resultClass = "correct";
            } else if (option === selectedAnswer) {
              resultClass = "wrong";
            }
          }

          return (
            <button
              key={option}
              type="button"
              className={`quiz-answer ${resultClass}`}
              onClick={() => onAnswer(option)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <p className="quiz-result">
          {selectedAnswer === question.name
            ? "✅ Correct! +10 points"
            : `❌ Wrong! It was ${question.name}`}
        </p>
      )}
    </div>
  );
}

export default QuizCard;
