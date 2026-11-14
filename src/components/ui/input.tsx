"use client";

import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text)" }}>
          {label}
        </label>
      )}
      <input
        className={`w-full h-11 px-4 rounded-xl text-sm outline-none transition-[border-color,box-shadow] duration-150 focus:border-[var(--primary)] focus:shadow-[2px_2px_0_var(--primary)] ${className}`}
        style={{ background: "var(--bg-card)", border: "2px solid var(--outline)", color: "var(--text)" }}
        {...props}
      />
    </div>
  );
}
