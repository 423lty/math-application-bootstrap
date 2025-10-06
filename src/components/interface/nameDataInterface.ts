/** 各カテゴリ情報を表す型 */
export interface Category {
  [key: string]: string; // 例: { "equation": "方程式", "sequence": "数列" }
}

/** 各分野（例：代数・幾何など）を表す型 */
export interface Area {
  name: string;          // 例: "代数"
  category: Category;    // カテゴリ情報
}

/** 高等数学（高校レベル）全体の構造 */
export interface HighSchoolMath {
  alg: Area;      // 代数
  geo: Area;      // 幾何
  analysis: Area; // 解析
  logic: Area;    // 確率・論理
}

/** 大学数学全体の構造 */
export interface UniversityMath {
  basic: Area;      // 基礎
  applied: Area;    // 応用
  abstract: Area;   // 抽象
}

/** JSON全体の構造（高校＋大学） */
export interface MathStructure {
  hs: HighSchoolMath;
  univ: UniversityMath;
}
