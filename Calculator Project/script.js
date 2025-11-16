const exprEl = document.getElementById("expr");
const resEl = document.getElementById("res");
let expression = "";

function addValue(value) {
    expression += value;
    exprEl.textContent = expression;
}

function clearAll() {
    expression = "";
    exprEl.textContent = "";
    resEl.textContent = "0";
}

function backspace() {
    expression = expression.slice(0, -1);
    exprEl.textContent = expression;
}

function evaluateExpression() {

    try {
        if (expression.trim() === "") {
            resEl.textContent = "0";
            return;
        }

        const safeExp = expression.replace(/[^0-9.+\-*/() ]/g, "");
        const result = Function("return " + safeExp)();

        resEl.textContent = Number.isFinite(result) ? result : "Error";

    } catch {
        resEl.textContent = "Error";
    }
}

document.querySelector(".keys").addEventListener("click", e => {
    
    const btn = e.target.closest("button");
    if (!btn) return;

    const val = btn.dataset.value;
    const act = btn.dataset.action;

    if (val) {
        addValue(val);
        return;
    }

    if (act === "clear") {
        clearAll();
        return;
    }

    if (act === "back") {
        backspace();
        return;
    }

    if (act === "equals") {
        evaluateExpression();
        return;
    }
});
