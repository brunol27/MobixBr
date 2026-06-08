import React from "react";
import { AlertCircle } from "lucide-react";

interface InputFieldProps {
    label: string;
    value: string;
    error?: string;
    type?: string;
    placeholder?: string;
    hint?: string;
    rightEl?: React.ReactNode;
    onChange: (v: string) => void;
}

export function InputField({
    label,
    value,
    error,
    type = "text",
    placeholder,
    hint,
    rightEl,
    onChange,
}: InputFieldProps) {
    return (
        <div>
            <label className="block text-sm text-[#0c2d6b] mb-1.5" style={{ fontWeight: 600 }}>
                {label}
            </label>

            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full bg-[#f0f2f8] border rounded-xl px-4 py-3.5 text-[#0c2d6b] placeholder-gray-400 outline-none transition-all ${error
                            ? "border-red-400 focus:border-red-500 bg-red-50"
                            : "border-transparent focus:border-[#0c2d6b] focus:bg-white"
                        } ${rightEl ? "pr-12" : ""}`}
                />

                {rightEl && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {rightEl}
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-center gap-1.5 mt-1.5">
                    <AlertCircle size={13} className="text-red-500 flex-shrink-0" />
                    <span className="text-red-500 text-xs">{error}</span>
                </div>
            )}

            {hint && !error && (
                <p className="text-gray-400 text-xs mt-1">{hint}</p>
            )}
        </div>
    );
}