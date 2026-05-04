import "./resultcard.css";

interface ResultCardProps {
  score: number;
  total: number;
  results: {
    swedish: string;
    correct: string;
    answer: string | null;
  }[];
  onReset: () => void;
}

export function ResultCard({ score, total, results, onReset }: ResultCardProps) {
  return (
    <div className="result-card">
      <div className="result-header">
        Resultat
      </div>

      <div className="result-score">
        {score} / {total}
      </div>

      <div className="result-list">
        {results.map((r, i) => (
          <div key={i} className="result-row">
            <strong>{r.swedish}</strong>

            <span
              className={
                r.answer === r.correct ? "answer correct" : "answer wrong"
              }
            >
              {r.answer ?? "inget"}
            </span>

            {r.answer !== r.correct && (
              <span className="correct-answer">({r.correct})</span>
            )}
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={onReset}>
        Starta om
      </button>
    </div>
  );
}
