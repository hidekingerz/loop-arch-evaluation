import { describe, expect, it } from "vitest";
import { validateRegistration, type RegistrationInput } from "./validateRegistration";

const valid: RegistrationInput = {
  username: "taro_123",
  email: "taro@example.com",
  password: "abcd1234",
  age: "30",
};

describe("validateRegistration", () => {
  it("accepts a fully valid input", () => {
    const result = validateRegistration(valid);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  describe("username", () => {
    it("requires a username", () => {
      expect(validateRegistration({ ...valid, username: "   " }).errors.username).toBe(
        "ユーザー名は必須です",
      );
    });
    it("rejects too short", () => {
      expect(validateRegistration({ ...valid, username: "ab" }).errors.username).toBe(
        "ユーザー名は3文字以上で入力してください",
      );
    });
    it("rejects too long", () => {
      expect(
        validateRegistration({ ...valid, username: "a".repeat(21) }).errors.username,
      ).toBe("ユーザー名は20文字以下で入力してください");
    });
    it("rejects invalid characters", () => {
      expect(validateRegistration({ ...valid, username: "taro-san" }).errors.username).toBe(
        "ユーザー名は英数字とアンダースコアのみ使用できます",
      );
    });
  });

  describe("email", () => {
    it("requires an email", () => {
      expect(validateRegistration({ ...valid, email: "" }).errors.email).toBe(
        "メールアドレスは必須です",
      );
    });
    it("rejects a malformed email", () => {
      expect(validateRegistration({ ...valid, email: "taro@@example" }).errors.email).toBe(
        "メールアドレスの形式が正しくありません",
      );
    });
  });

  describe("password", () => {
    it("requires a password", () => {
      expect(validateRegistration({ ...valid, password: "" }).errors.password).toBe(
        "パスワードは必須です",
      );
    });
    it("rejects too short", () => {
      expect(validateRegistration({ ...valid, password: "ab12" }).errors.password).toBe(
        "パスワードは8文字以上で入力してください",
      );
    });
    it("requires a digit", () => {
      expect(validateRegistration({ ...valid, password: "abcdefgh" }).errors.password).toBe(
        "パスワードには数字を含めてください",
      );
    });
    it("requires a letter", () => {
      expect(validateRegistration({ ...valid, password: "12345678" }).errors.password).toBe(
        "パスワードには英字を含めてください",
      );
    });
  });

  describe("age", () => {
    it("requires an age", () => {
      expect(validateRegistration({ ...valid, age: "  " }).errors.age).toBe("年齢は必須です");
    });
    it("rejects non-numeric", () => {
      expect(validateRegistration({ ...valid, age: "abc" }).errors.age).toBe(
        "年齢は数値で入力してください",
      );
    });
    it("rejects non-integer", () => {
      expect(validateRegistration({ ...valid, age: "20.5" }).errors.age).toBe(
        "年齢は整数で入力してください",
      );
    });
    it("rejects under 18", () => {
      expect(validateRegistration({ ...valid, age: "17" }).errors.age).toBe(
        "18歳以上である必要があります",
      );
    });
  });

  it("reports multiple errors at once", () => {
    const result = validateRegistration({ username: "", email: "", password: "", age: "" });
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors).sort()).toEqual(["age", "email", "password", "username"]);
  });
});
