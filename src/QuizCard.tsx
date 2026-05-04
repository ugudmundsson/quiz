import React from "react";


type QuizCardProps = {
  swedish: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
};

export const QuizCard: React.FC<QuizCardProps> = ({
  swedish,
  options,
  selected,
  onSelect,
}) => {
  return (
    <div className="quiz-card">
      <div className="quiz-header">{swedish}</div>

      <div className="quiz-options">
        {options.map((opt) => (
          <label key={opt} className="quiz-option">
            <input
              type="radio"
              name={swedish}
              value={opt}
              checked={selected === opt}
              onChange={() => onSelect(opt)}
            />
            <span className="checkmark" />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
};
