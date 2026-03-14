import React, { useState } from "react";

const navItems = [
  { id: "modules", label: "Модули" },
  { id: "calculators", label: "Калькуляторы" },
  { id: "methods", label: "Методы" },
  { id: "notes", label: "Конспект" },
];

const modules = [
  {
    title: "Элементарная теория погрешностей",
    description:
      "Абсолютная и относительная погрешности, предельные оценки и верные знаки.",
    items: [
      "Δ = |A − a|, δ = Δ / |A|",
      "Интервал истинного значения",
      "Правила округления и значащие цифры",
    ],
  },
  {
    title: "Погрешности результата",
    description:
      "Оценка погрешностей при арифметических операциях над приближёнными величинами.",
    items: [
      "Сумма и разность: Δ ≤ Δx + Δy",
      "Произведение и частное: δ ≤ δx + δy",
      "Контроль количества верных цифр",
    ],
  },
  {
    title: "Метод квадратных корней (Холецкого)",
    description:
      "Решение СЛАУ с симметричной положительно определённой матрицей.",
    items: [
      "Разложение A = L · Lᵀ",
      "Решение Ly = b и Lᵀx = y",
      "Точность 0,001 (3 знака)",
    ],
  },
  {
    title: "Нелинейные уравнения",
    description:
      "Половинное деление, метод Ньютона и простая итерация.",
    items: [
      "Надёжная сходимость на отрезке",
      "Быстрое уточнение при удачном x₀",
      "Подбор параметра λ для итераций",
    ],
  },
];

const quickFacts = [
  { label: "Учебник", value: "Воробьёв Г.Н., Данилов А.Н., 1990" },
  { label: "Дисциплина", value: "Численные методы" },
  { label: "Формат", value: "Практикум + конспект" },
];

const methodCards = [
  {
    title: "Половинного деления",
    text: "Отрезок [a, b] делится пополам, выбирается половина со сменой знака. Надёжен, не требует производных.",
  },
  {
    title: "Ньютона (касательных)",
    text: "xₙ₊₁ = xₙ − f(xₙ) / f′(xₙ). Быстрая сходимость при удачном начальном приближении.",
  },
  {
    title: "Простой итерации",
    text: "xₙ₊₁ = xₙ − λ · f(xₙ). Параметр λ подбирают для устойчивости и сходимости.",
  },
  {
    title: "Хорд и касательных",
    text: "Комбинирует секущие и Ньютона, стягивая отрезок к корню с двух сторон.",
  },
];

const noteBlocks = [
  {
    title: "СРСП_лк_1. Правила подсчёта цифр",
    items: [
      "Абсолютная погрешность: Δa = |a − ã|.",
      "Относительная погрешность: δa = |Δa| / |a|.",
      "Значащие цифры — все цифры кроме ведущих нулей.",
      "Округление: < 5 без изменения, ≥ 5 округление вверх.",
      "Сложение и вычитание: округление по наименее точному разряду.",
      "Умножение и деление: по минимальному числу значащих цифр.",
    ],
  },
  {
    title: "СРСП_лк_2. Абсолютная величина и нормы матриц",
    items: [
      "|ab| = |a| · |b|, |a + b| ≤ |a| + |b|.",
      "‖x‖₂, ‖x‖₁, ‖x‖∞ задают разные меры длины вектора.",
      "‖A‖₁ — максимум сумм по столбцам, ‖A‖∞ — по строкам.",
      "Субмультипликативность: ‖AB‖ ≤ ‖A‖ · ‖B‖.",
    ],
  },
  {
    title: "СРСП_лк_3. Предел векторов и матриц",
    items: [
      "x(k) → x, если каждая координата стремится к xi.",
      "Эквивалентность: lim ‖x(k) − x‖ = 0.",
      "A(k) → A, если все элементы матрицы сходятся.",
      "Сходимость по координатам равносильна сходимости в норме.",
    ],
  },
  {
    title: "СРСП_лк_4. Комбинированный метод хорд и касательных",
    items: [
      "Метод хорд: секущая вместо касательной, не требует производной.",
      "Метод Ньютона: использует f′(x), сходится быстро.",
      "Комбинация уточняет разные концы отрезка для устойчивости.",
    ],
  },
  {
    title: "СРСП_лк_5. Интерполяция. Многочлен Лагранжа",
    items: [
      "Построение Pn(x) степени ≤ n через узлы (xi, yi).",
      "Pn(x) = Σ yi · Li(x), где Li(xi) = 1, Li(xj) = 0.",
      "Ошибка: Rn(x) = f(n+1)(ξ)/(n+1)! · ∏(x − xi).",
    ],
  },
  {
    title: "СРСП_лк_6. Интерполяционные формулы Ньютона",
    items: [
      "Разделённые разности задают коэффициенты многочлена Ньютона.",
      "Pn(x) = f[x0] + f[x0,x1](x−x0) + ...",
      "Для равноотстоящих узлов используют конечные разности.",
      "Первая формула Ньютона удобна при x близком к x0.",
    ],
  },
];

function numberOrNull(value) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim().replace(/,/g, ".");
  if (!cleaned) return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function formatNumber(value, digits = 6) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }
  let rounded = Number(value).toFixed(digits);
  if (rounded.includes(".")) {
    rounded = rounded.replace(/0+$/, "");
    rounded = rounded.replace(/\.$/, "");
  }
  return rounded;
}

function parseNumberList(text) {
  if (!text) return [];
  const matches = text
    .replace(/,/g, ".")
    .match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/gi);
  if (!matches) return [];
  const numbers = matches.map((token) => Number(token));
  if (numbers.some((n) => !Number.isFinite(n))) {
    return null;
  }
  return numbers;
}

function compileExpression(raw) {
  if (!raw || typeof raw !== "string") {
    return { error: "Введите выражение f(x)." };
  }
  const safePattern = /^[0-9+\-*/().xX\s^,a-zA-Z]*$/;
  if (!safePattern.test(raw)) {
    return { error: "Недопустимые символы в выражении." };
  }

  let expr = raw.trim().toLowerCase().replace(/,/g, ".");
  expr = expr.replace(/\^/g, "**");
  expr = expr.replace(/\bpi\b/g, "Math.PI");
  expr = expr.replace(/\bln\b/g, "Math.log");
  expr = expr.replace(
    /\b(sin|cos|tan|exp|log|sqrt|abs)\b/g,
    (match) => `Math.${match}`
  );

  try {
    const fn = new Function("x", `"use strict"; return (${expr});`);
    return { fn };
  } catch (error) {
    return { error: "Не удалось разобрать выражение." };
  }
}

function CalculatorCard({ title, subtitle, children }) {
  return (
    <div className="card calculator-card">
      <div className="card-header">
        <h3>{title}</h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

function ResultBox({ children }) {
  return <div className="result-box">{children}</div>;
}

function AbsRelCalculator() {
  const [exact, setExact] = useState("3.14159");
  const [approx, setApprox] = useState("3.14");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const exactNum = numberOrNull(exact);
    const approxNum = numberOrNull(approx);
    if (exactNum === null || approxNum === null) {
      setResult({ error: "Введите оба значения A и a." });
      return;
    }
    const delta = Math.abs(exactNum - approxNum);
    if (exactNum === 0) {
      setResult({
        delta,
        rel: null,
        note: "Относительная погрешность не определена при A = 0.",
      });
      return;
    }
    const rel = delta / Math.abs(exactNum);
    setResult({ delta, rel, relPercent: rel * 100 });
  };

  return (
    <CalculatorCard
      title="Абсолютная и относительная погрешность"
      subtitle="Введите точное значение A и приближённое a."
    >
      <div className="form-grid">
        <label>
          Точное значение A
          <input
            type="text"
            value={exact}
            onChange={(event) => setExact(event.target.value)}
            placeholder="например, 3.14159"
          />
        </label>
        <label>
          Приближённое значение a
          <input
            type="text"
            value={approx}
            onChange={(event) => setApprox(event.target.value)}
            placeholder="например, 3.14"
          />
        </label>
      </div>
      <button className="primary" type="button" onClick={calculate}>
        Вычислить
      </button>
      {result ? (
        <ResultBox>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p>
                Δ = {formatNumber(result.delta, 8)}
              </p>
              <p>
                δ = {result.rel === null ? "—" : formatNumber(result.rel, 8)}
              </p>
              {result.relPercent !== undefined ? (
                <p>
                  δ · 100% = {formatNumber(result.relPercent, 6)}%
                </p>
              ) : null}
              {result.note ? <p>{result.note}</p> : null}
            </>
          )}
        </ResultBox>
      ) : null}
    </CalculatorCard>
  );
}

function IntervalCalculator() {
  const [approx, setApprox] = useState("2.5");
  const [delta, setDelta] = useState("0.05");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const approxNum = numberOrNull(approx);
    const deltaNum = numberOrNull(delta);
    if (approxNum === null || deltaNum === null || deltaNum < 0) {
      setResult({ error: "Введите значение a и Δa ≥ 0." });
      return;
    }
    setResult({
      lower: approxNum - deltaNum,
      upper: approxNum + deltaNum,
    });
  };

  return (
    <CalculatorCard
      title="Предельная абсолютная погрешность"
      subtitle="Интервал истинного значения A ∈ [a − Δa; a + Δa]."
    >
      <div className="form-grid">
        <label>
          Приближённое значение a
          <input
            type="text"
            value={approx}
            onChange={(event) => setApprox(event.target.value)}
            placeholder="например, 2.5"
          />
        </label>
        <label>
          Предельная абс. погрешность Δa
          <input
            type="text"
            value={delta}
            onChange={(event) => setDelta(event.target.value)}
            placeholder="например, 0.05"
          />
        </label>
      </div>
      <button className="primary" type="button" onClick={calculate}>
        Найти интервал
      </button>
      {result ? (
        <ResultBox>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <p>
              A ∈ [{formatNumber(result.lower, 6)}; {formatNumber(result.upper, 6)}]
            </p>
          )}
        </ResultBox>
      ) : null}
    </CalculatorCard>
  );
}

function OperationErrorCalculator() {
  const [operation, setOperation] = useState("sum");
  const [xValue, setXValue] = useState("12.34");
  const [xDelta, setXDelta] = useState("0.02");
  const [yValue, setYValue] = useState("0.006");
  const [yDelta, setYDelta] = useState("0.001");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const x = numberOrNull(xValue);
    const y = numberOrNull(yValue);
    const dx = numberOrNull(xDelta);
    const dy = numberOrNull(yDelta);

    if ([x, y, dx, dy].some((v) => v === null) || dx < 0 || dy < 0) {
      setResult({ error: "Введите значения x, y и Δx, Δy ≥ 0." });
      return;
    }

    let value = 0;
    let delta = 0;
    let rel = null;

    if (operation === "sum") {
      value = x + y;
      delta = dx + dy;
    }

    if (operation === "diff") {
      value = x - y;
      delta = dx + dy;
    }

    if (operation === "prod") {
      value = x * y;
      if (x === 0 || y === 0) {
        rel = null;
        delta = Math.abs(value) * 0;
      } else {
        rel = Math.abs(dx / x) + Math.abs(dy / y);
        delta = Math.abs(value) * rel;
      }
    }

    if (operation === "quot") {
      if (y === 0) {
        setResult({ error: "Деление на ноль недопустимо." });
        return;
      }
      value = x / y;
      if (x === 0 || y === 0) {
        rel = null;
        delta = Math.abs(value) * 0;
      } else {
        rel = Math.abs(dx / x) + Math.abs(dy / y);
        delta = Math.abs(value) * rel;
      }
    }

    setResult({ value, delta, rel });
  };

  return (
    <CalculatorCard
      title="Погрешности результата"
      subtitle="Оценки для суммы, разности, произведения и частного."
    >
      <div className="form-grid">
        <label>
          Операция
          <select value={operation} onChange={(event) => setOperation(event.target.value)}>
            <option value="sum">x + y</option>
            <option value="diff">x − y</option>
            <option value="prod">x · y</option>
            <option value="quot">x / y</option>
          </select>
        </label>
        <label>
          x
          <input
            type="text"
            value={xValue}
            onChange={(event) => setXValue(event.target.value)}
            placeholder="значение"
          />
        </label>
        <label>
          Δx
          <input
            type="text"
            value={xDelta}
            onChange={(event) => setXDelta(event.target.value)}
            placeholder="погрешность"
          />
        </label>
        <label>
          y
          <input
            type="text"
            value={yValue}
            onChange={(event) => setYValue(event.target.value)}
            placeholder="значение"
          />
        </label>
        <label>
          Δy
          <input
            type="text"
            value={yDelta}
            onChange={(event) => setYDelta(event.target.value)}
            placeholder="погрешность"
          />
        </label>
      </div>
      <button className="primary" type="button" onClick={calculate}>
        Вычислить погрешность результата
      </button>
      {result ? (
        <ResultBox>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p>Результат: {formatNumber(result.value, 8)}</p>
              <p>Δ ≤ {formatNumber(result.delta, 8)}</p>
              <p>δ ≤ {result.rel === null ? "—" : formatNumber(result.rel, 8)}</p>
            </>
          )}
        </ResultBox>
      ) : null}
    </CalculatorCard>
  );
}

function CholeskyCalculator() {
  const [matrixText, setMatrixText] = useState(
    "4 2 -1\n2 3 0\n-1 0 2"
  );
  const [vectorText, setVectorText] = useState("12 -1 3");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const matrixNumbers = parseNumberList(matrixText);
    if (!matrixNumbers || matrixNumbers.length === 0) {
      setResult({ error: "Введите элементы матрицы A." });
      return;
    }

    const n = Math.sqrt(matrixNumbers.length);
    if (!Number.isInteger(n)) {
      setResult({ error: "Количество элементов A должно образовывать квадрат." });
      return;
    }

    const matrix = Array.from({ length: n }, (_, row) =>
      matrixNumbers.slice(row * n, row * n + n)
    );

    const bNumbers = parseNumberList(vectorText);
    if (!bNumbers || bNumbers.length !== n) {
      setResult({
        error: `Вектор b должен содержать ${n} чисел.`,
      });
      return;
    }

    const L = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j <= i; j += 1) {
        let sum = 0;
        for (let k = 0; k < j; k += 1) {
          sum += L[i][k] * L[j][k];
        }
        if (i === j) {
          const value = matrix[i][i] - sum;
          if (value <= 0) {
            setResult({
              error: "Матрица не является положительно определённой.",
            });
            return;
          }
          L[i][j] = Math.sqrt(value);
        } else {
          if (L[j][j] === 0) {
            setResult({ error: "Нулевой элемент на диагонали L." });
            return;
          }
          L[i][j] = (matrix[i][j] - sum) / L[j][j];
        }
      }
    }

    const y = Array(n).fill(0);
    for (let i = 0; i < n; i += 1) {
      let sum = 0;
      for (let k = 0; k < i; k += 1) {
        sum += L[i][k] * y[k];
      }
      y[i] = (bNumbers[i] - sum) / L[i][i];
    }

    const x = Array(n).fill(0);
    for (let i = n - 1; i >= 0; i -= 1) {
      let sum = 0;
      for (let k = i + 1; k < n; k += 1) {
        sum += L[k][i] * x[k];
      }
      x[i] = (y[i] - sum) / L[i][i];
    }

    setResult({
      x,
      L,
    });
  };

  const formatMatrix = (matrix) =>
    matrix
      .map((row) => row.map((value) => formatNumber(value, 4)).join("\t"))
      .join("\n");

  return (
    <CalculatorCard
      title="Метод квадратных корней (Холецкого)"
      subtitle="Решение Ax = b для симметричной положительно определённой матрицы."
    >
      <div className="form-grid">
        <label className="span-2">
          Матрица A (n×n), построчно или списком
          <textarea
            value={matrixText}
            onChange={(event) => setMatrixText(event.target.value)}
            rows={4}
          />
        </label>
        <label className="span-2">
          Вектор b (n чисел)
          <input
            type="text"
            value={vectorText}
            onChange={(event) => setVectorText(event.target.value)}
          />
        </label>
      </div>
      <button className="primary" type="button" onClick={calculate}>
        Решить систему
      </button>
      {result ? (
        <ResultBox>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p>
                x = [{result.x.map((value) => formatNumber(value, 3)).join(", ")}
                ]
              </p>
              <div className="matrix-block">
                <span>L:</span>
                <pre>{formatMatrix(result.L)}</pre>
              </div>
            </>
          )}
        </ResultBox>
      ) : null}
    </CalculatorCard>
  );
}

function NonlinearCalculator() {
  const [expression, setExpression] = useState("x^2 - 2");
  const [method, setMethod] = useState("bisection");
  const [epsilon, setEpsilon] = useState("0.001");
  const [aValue, setAValue] = useState("0");
  const [bValue, setBValue] = useState("2");
  const [x0Value, setX0Value] = useState("1");
  const [lambdaValue, setLambdaValue] = useState("0.5");
  const [maxIter, setMaxIter] = useState("50");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const { fn, error } = compileExpression(expression);
    if (error) {
      setResult({ error });
      return;
    }

    const eps = numberOrNull(epsilon);
    if (eps === null || eps <= 0) {
      setResult({ error: "Точность ε должна быть > 0." });
      return;
    }

    const maxIterations = Math.max(1, numberOrNull(maxIter) || 50);

    const evalSafe = (x) => {
      const value = fn(x);
      if (!Number.isFinite(value)) {
        throw new Error("Некорректное значение функции.");
      }
      return value;
    };

    try {
      if (method === "bisection") {
        const a = numberOrNull(aValue);
        const b = numberOrNull(bValue);
        if (a === null || b === null) {
          setResult({ error: "Введите значения a и b." });
          return;
        }
        let left = a;
        let right = b;
        let fLeft = evalSafe(left);
        let fRight = evalSafe(right);
        if (fLeft * fRight > 0) {
          setResult({ error: "На отрезке нет смены знака f(x)." });
          return;
        }
        const steps = [];
        let iter = 0;
        let mid = (left + right) / 2;
        while (iter < maxIterations && Math.abs(right - left) / 2 > eps) {
          mid = (left + right) / 2;
          const fMid = evalSafe(mid);
          steps.push({
            iter: iter + 1,
            a: left,
            b: right,
            x: mid,
            fx: fMid,
          });
          if (fLeft * fMid <= 0) {
            right = mid;
            fRight = fMid;
          } else {
            left = mid;
            fLeft = fMid;
          }
          iter += 1;
        }
        setResult({
          root: mid,
          fx: evalSafe(mid),
          iterations: iter,
          steps,
          mode: "bisection",
        });
        return;
      }

      if (method === "newton") {
        const x0 = numberOrNull(x0Value);
        if (x0 === null) {
          setResult({ error: "Введите начальное приближение x₀." });
          return;
        }
        const derivative = (x) => {
          const h = 1e-6 * (1 + Math.abs(x));
          return (evalSafe(x + h) - evalSafe(x - h)) / (2 * h);
        };
        let x = x0;
        let iter = 0;
        const steps = [];
        while (iter < maxIterations) {
          const fx = evalSafe(x);
          steps.push({ iter: iter + 1, x, fx });
          if (Math.abs(fx) <= eps) {
            break;
          }
          const dfx = derivative(x);
          if (Math.abs(dfx) < 1e-12) {
            setResult({ error: "Производная близка к нулю." });
            return;
          }
          x = x - fx / dfx;
          iter += 1;
        }
        setResult({
          root: x,
          fx: evalSafe(x),
          iterations: iter,
          steps,
          mode: "newton",
        });
        return;
      }

      if (method === "iteration") {
        const x0 = numberOrNull(x0Value);
        const lambda = numberOrNull(lambdaValue);
        if (x0 === null || lambda === null) {
          setResult({ error: "Введите x₀ и λ." });
          return;
        }
        let x = x0;
        let iter = 0;
        let xNext = x;
        const steps = [];
        while (iter < maxIterations) {
          const fx = evalSafe(x);
          steps.push({ iter: iter + 1, x, fx });
          xNext = x - lambda * fx;
          if (Math.abs(xNext - x) <= eps) {
            x = xNext;
            break;
          }
          x = xNext;
          iter += 1;
        }
        setResult({
          root: x,
          fx: evalSafe(x),
          iterations: iter,
          steps,
          mode: "iteration",
        });
      }
    } catch (err) {
      setResult({ error: err.message || "Ошибка вычислений." });
    }
  };

  return (
    <CalculatorCard
      title="Нелинейные уравнения"
      subtitle="Методы половинного деления, Ньютона и простой итерации."
    >
      <p className="helper-text">
        Вводите f(x) с sin, cos, exp, log, sqrt, abs и оператором ^.
      </p>
      <div className="form-grid">
        <label className="span-2">
          f(x) = 0
          <input
            type="text"
            value={expression}
            onChange={(event) => setExpression(event.target.value)}
            placeholder="x^2 - 2"
          />
        </label>
        <label>
          Метод
          <select value={method} onChange={(event) => setMethod(event.target.value)}>
            <option value="bisection">Половинного деления</option>
            <option value="newton">Ньютона (касательных)</option>
            <option value="iteration">Простой итерации</option>
          </select>
        </label>
        <label>
          Точность ε
          <input
            type="text"
            value={epsilon}
            onChange={(event) => setEpsilon(event.target.value)}
          />
        </label>
        {method === "bisection" ? (
          <>
            <label>
              a (левый конец)
              <input
                type="text"
                value={aValue}
                onChange={(event) => setAValue(event.target.value)}
              />
            </label>
            <label>
              b (правый конец)
              <input
                type="text"
                value={bValue}
                onChange={(event) => setBValue(event.target.value)}
              />
            </label>
          </>
        ) : null}
        {method !== "bisection" ? (
          <label>
            x₀
            <input
              type="text"
              value={x0Value}
              onChange={(event) => setX0Value(event.target.value)}
            />
          </label>
        ) : null}
        {method === "iteration" ? (
          <label>
            λ
            <input
              type="text"
              value={lambdaValue}
              onChange={(event) => setLambdaValue(event.target.value)}
            />
          </label>
        ) : null}
        <label>
          Макс. итераций
          <input
            type="text"
            value={maxIter}
            onChange={(event) => setMaxIter(event.target.value)}
          />
        </label>
      </div>
      <button className="primary" type="button" onClick={calculate}>
        Найти корень
      </button>
      {result ? (
        <ResultBox>
          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p className="result-title">Результат</p>
              <p>Приближённый корень: x ≈ {formatNumber(result.root, 8)}</p>
              <p>f(x) ≈ {formatNumber(result.fx, 8)}</p>
              <p>Итерации ({result.iterations})</p>
              {result.steps && result.steps.length ? (
                <ol className="iteration-list">
                  {result.steps.map((step) => (
                    <li key={step.iter}>
                      {result.mode === "bisection" ? (
                        <>
                          {step.iter}: a={formatNumber(step.a, 5)} b=
                          {formatNumber(step.b, 5)} x={formatNumber(step.x, 5)} f(x)=
                          {formatNumber(step.fx, 6)}
                        </>
                      ) : (
                        <>
                          {step.iter}: x={formatNumber(step.x, 6)} f(x)=
                          {formatNumber(step.fx, 6)}
                        </>
                      )}
                    </li>
                  ))}
                </ol>
              ) : null}
            </>
          )}
        </ResultBox>
      ) : null}
    </CalculatorCard>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="hero" id="top">
        <div className="hero-content">
          <p className="badge">Практикум по вычислительной математике</p>
          <h1>
            По учебнику Воробьёва Г.Н., Данилова А.Н. — Высш. школа, 1990
          </h1>
          <p className="subtitle">
            Конспект, теоретические блоки и интерактивные инструменты для
            практики. Выполнил: Mairambek uulu Amangeldi.
          </p>
          <div className="hero-actions">
            <a className="button" href="#modules">
              К модулям
            </a>
            <a className="button ghost" href="#calculators">
              К калькуляторам
            </a>
          </div>
        </div>
        <div className="hero-card">
          <h2>Главная</h2>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="facts">
            {quickFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="section" id="modules">
        <div className="section-title">
          <h2>Модули для практики</h2>
          <p>Базовые темы и ключевые формулы курса.</p>
        </div>
        <div className="grid">
          {modules.map((module) => (
            <div className="card" key={module.title}>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
              <ul>
                {module.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt" id="calculators">
        <div className="section-title">
          <h2>Калькуляторы</h2>
        </div>
        <div className="grid calculators">
          <AbsRelCalculator />
          <IntervalCalculator />
          <OperationErrorCalculator />
          <CholeskyCalculator />
          <NonlinearCalculator />
        </div>
      </section>

      <section className="section" id="methods">
        <div className="section-title">
          <h2>Методы решения</h2>
          <p>Краткие формулы и ориентиры для практики.</p>
        </div>
        <div className="grid">
          {methodCards.map((card) => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section alt" id="notes">
        <div className="section-title">
          <h2>Конспект «Численные методы»</h2>
          <p>Краткие выдержки по темам дисциплины.</p>
        </div>
        <div className="notes">
          {noteBlocks.map((block) => (
            <details key={block.title} className="note">
              <summary>{block.title}</summary>
              <ul>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>
          © 2026 Mairambek uulu Amangeldi. Все права защищены. Этот ресурс создан для образовательных целей и не является официальным учебным материалом. Учебник Воробьёва и Данилова — основа, но всегда полезно обращаться к дополнительным источникам для углубления знаний.
        </p>
      </footer>
    </div>
  );
}
