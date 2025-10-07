/** 各カテゴリ情報を表す型 */
export interface Category {
    [key: string]: string;
}

/** 高等数学（高校レベル）全体の構造 */
export interface HighSchoolMathJson {
    alg: Category;      // 代数
    geo: Category;      // 幾何
    analysis: Category; // 解析
    logic: Category;    // 確率・論理
}

/** 大学数学全体の構造 */
export interface UniversityMathJson {
    basic: Category;      // 基礎
    applied: Category;    // 応用
    abstract: Category;   // 抽象
}

/** JSON全体の構造（高校＋大学） */
export interface MathStructureJson {
    hs: HighSchoolMathJson;
    univ: UniversityMathJson;
}