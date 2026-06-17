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

function isMissing(value: string): boolean {
  return value === undefined || value === null;
}

function validateUsername(username: string): string | undefined {
  if (isMissing(username) || username.trim() === "") {
    return "ユーザー名は必須です";
  }
  if (username.length < 3) {
    return "ユーザー名は3文字以上で入力してください";
  }
  if (username.length > 20) {
    return "ユーザー名は20文字以下で入力してください";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "ユーザー名は英数字とアンダースコアのみ使用できます";
  }
  return undefined;
}

function validateEmail(email: string): string | undefined {
  if (isMissing(email) || email.trim() === "") {
    return "メールアドレスは必須です";
  }
  if (email.length > 254) {
    return "メールアドレスが長すぎます";
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return "メールアドレスの形式が正しくありません";
  }
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (isMissing(password) || password === "") {
    return "パスワードは必須です";
  }
  if (password.length < 8) {
    return "パスワードは8文字以上で入力してください";
  }
  if (!/[0-9]/.test(password)) {
    return "パスワードには数字を含めてください";
  }
  if (!/[a-zA-Z]/.test(password)) {
    return "パスワードには英字を含めてください";
  }
  return undefined;
}

function validateAge(age: string): string | undefined {
  if (isMissing(age) || age.trim() === "") {
    return "年齢は必須です";
  }
  const parsed = Number(age);
  if (Number.isNaN(parsed)) {
    return "年齢は数値で入力してください";
  }
  if (!Number.isInteger(parsed)) {
    return "年齢は整数で入力してください";
  }
  if (parsed < 18) {
    return "18歳以上である必要があります";
  }
  if (parsed > 120) {
    return "年齢が正しくありません";
  }
  return undefined;
}

export function validateRegistration(input: RegistrationInput): ValidationResult {
  const errors: Record<string, string> = {};

  const fieldErrors: Array<[string, string | undefined]> = [
    ["username", validateUsername(input.username)],
    ["email", validateEmail(input.email)],
    ["password", validatePassword(input.password)],
    ["age", validateAge(input.age)],
  ];

  for (const [field, message] of fieldErrors) {
    if (message !== undefined) {
      errors[field] = message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
