export interface Question {
    id: string;                // 問題ID（例: "hs_alg_eq_001"）
    level: string;             // レベル（例: "高等数学"）
    area: string;              // 分野（例: "代数"）
    category: string;          // カテゴリ（例: "方程式"）
    question: string;          // 問題文
    choices: string[];         // 選択肢（文字列配列）
    answer: number;            // 正解のインデックス番号（0～3など）
    explanation: string;       // 解説
    type: string;              // 問題の種類（例: "選択式"）
}

/** JSON全体の構造（questions配列を持つ） */
export interface QuestionData {
    questions: Question[]
}