"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeSwitch() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<button className="p-2 rounded-md" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
		</button>
	);
}
