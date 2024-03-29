/**
 * Sets theme based on preference
 */
document.addEventListener("DOMContentLoaded", function() {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDarkTheme.matches) {
        document.getElementById("work").classList.add("reversi");
    }
    else {
		document.getElementById("work").classList.add("light");
	}
});

/**
 * toggles theme from default to reversi and back
*/
function toggleTheme() {
    document.getElementById("work").classList.toggle("light");
    document.getElementById("work").classList.toggle("reversi");
}
