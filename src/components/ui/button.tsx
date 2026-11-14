"use client";

import { type ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

/*
  Sticker buttons: pills with a 2px outline. Primary and secondary carry the hard offset
  shadow, which collapses on press so the button feels pushed in.
*/
const variantClasses: Record<string, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--on-primary)] border-2 border-[var(--outline)] shadow-[2px_2px_0_var(--outline)] hover:bg-[var(--primary-hover)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  secondary:
    "bg-[var(--bg-card)] text-[var(--text)] border-2 border-[var(--outline)] shadow-[2px_2px_0_var(--outline)] hover:bg-[var(--paper)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  danger:
    "bg-[var(--tomato)] text-black border-2 border-[var(--outline)] shadow-[2px_2px_0_var(--outline)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
  ghost: "bg-transparent text-[var(--text-secondary)] border-2 border-transparent hover:bg-[var(--paper)] hover:text-[var(--text)]",
};

const sizeClasses: Record<string, string> = {
  sm: "h-8 px-3.5 text-[13px]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-[15px]",
};

export function Button({ variant = "primary", size = "md", className = "", style, children, disabled, onClick, type, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full font-bold cursor-pointer transition-[background-color,color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
      type={type}
      aria-label={rest["aria-label"]}
    >
      {children}
    </button>
  );
}
