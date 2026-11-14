import { describe, expect, it } from "vitest";
import { isAdminEmail } from "./auth";

describe("isAdminEmail", () => {
  const list = " Owner@Example.com, helper@example.com ,";

  it("matches listed emails regardless of case and spacing", () => {
    expect(isAdminEmail("owner@example.com", list)).toBe(true);
    expect(isAdminEmail("HELPER@EXAMPLE.COM", list)).toBe(true);
  });

  it("rejects anyone not on the list", () => {
    expect(isAdminEmail("student@example.com", list)).toBe(false);
    expect(isAdminEmail("owner@example.com.evil.test", list)).toBe(false);
    expect(isAdminEmail("wner@example.com", list)).toBe(false);
  });

  it("rejects a missing email and an empty list", () => {
    expect(isAdminEmail(undefined, list)).toBe(false);
    expect(isAdminEmail("", list)).toBe(false);
    expect(isAdminEmail("owner@example.com", "")).toBe(false);
    expect(isAdminEmail("owner@example.com", " , ")).toBe(false);
  });
});
