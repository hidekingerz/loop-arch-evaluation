export interface RegistrationInput {
  username: string;
  email: string;
  password: string;
  age: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// NOTE(loop/refactor): This works and all tests are green, but it is intentionally
// messy — one long function, deep nesting, and the same validation shape copy-pasted
// per field. Refactor it (extract per-field validators, flatten with guard clauses)
// so ESLint's complexity / max-depth / max-lines-per-function rules pass, WITHOUT
// changing behavior (tests must stay green) and WITHOUT eslint-disable or weakening rules.
export function validateRegistration(input: RegistrationInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (input.username !== undefined && input.username !== null) {
    if (input.username.trim() === "") {
      errors.username = "ユーザー名は必須です";
    } else {
      if (input.username.length < 3) {
        errors.username = "ユーザー名は3文字以上で入力してください";
      } else {
        if (input.username.length > 20) {
          errors.username = "ユーザー名は20文字以下で入力してください";
        } else {
          if (!/^[a-zA-Z0-9_]+$/.test(input.username)) {
            errors.username = "ユーザー名は英数字とアンダースコアのみ使用できます";
          }
        }
      }
    }
  } else {
    errors.username = "ユーザー名は必須です";
  }

  if (input.email !== undefined && input.email !== null) {
    if (input.email.trim() === "") {
      errors.email = "メールアドレスは必須です";
    } else {
      if (input.email.length > 254) {
        errors.email = "メールアドレスが長すぎます";
      } else {
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) {
          errors.email = "メールアドレスの形式が正しくありません";
        }
      }
    }
  } else {
    errors.email = "メールアドレスは必須です";
  }

  if (input.password !== undefined && input.password !== null) {
    if (input.password === "") {
      errors.password = "パスワードは必須です";
    } else {
      if (input.password.length < 8) {
        errors.password = "パスワードは8文字以上で入力してください";
      } else {
        if (!/[0-9]/.test(input.password)) {
          errors.password = "パスワードには数字を含めてください";
        } else {
          if (!/[a-zA-Z]/.test(input.password)) {
            errors.password = "パスワードには英字を含めてください";
          }
        }
      }
    }
  } else {
    errors.password = "パスワードは必須です";
  }

  if (input.age !== undefined && input.age !== null && input.age.trim() !== "") {
    const parsed = Number(input.age);
    if (Number.isNaN(parsed)) {
      errors.age = "年齢は数値で入力してください";
    } else {
      if (!Number.isInteger(parsed)) {
        errors.age = "年齢は整数で入力してください";
      } else {
        if (parsed < 18) {
          errors.age = "18歳以上である必要があります";
        } else {
          if (parsed > 120) {
            errors.age = "年齢が正しくありません";
          }
        }
      }
    }
  } else {
    errors.age = "年齢は必須です";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
