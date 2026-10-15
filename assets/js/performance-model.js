/* Pure calculations. No example project values, elapsed delay/float confusion, or invented history. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.MDCEOPerformanceModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const DAY = 86400000;
  function number(value) {
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "")
    )
      return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  function date(value) {
    if (!value) return null;
    const str = String(value).trim();
    let match;
    if ((match = str.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/)))
      return validDate(+match[3], +match[2], +match[1]);
    if ((match = str.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{2}|\d{4})$/))) {
      const month =
        [
          "jan",
          "feb",
          "mar",
          "apr",
          "may",
          "jun",
          "jul",
          "aug",
          "sep",
          "oct",
          "nov",
          "dec",
        ].indexOf(match[2].toLowerCase()) + 1;
      return month
        ? validDate(
            +match[3] + (match[3].length === 2 ? 2000 : 0),
            month,
            +match[1],
          )
        : null;
    }
    if ((match = str.match(/^(\d{4})-(\d{2})-(\d{2})(?:[ T].*)?$/)))
      return validDate(+match[1], +match[2], +match[3]);
    return null;
  }
  function validDate(y, m, d) {
    const dt = new Date(Date.UTC(y, m - 1, d));
    return dt.getUTCFullYear() === y &&
      dt.getUTCMonth() === m - 1 &&
      dt.getUTCDate() === d
      ? dt.toISOString().slice(0, 10)
      : null;
  }
  function periods(rows) {
    const list = (Array.isArray(rows) ? rows : []).map((row, index) => ({
      ...row,
      periodDate: date(row.week),
      sourceIndex: index,
    }));
    if (list.length && list.every((r) => r.periodDate))
      list.sort(
        (a, b) =>
          a.periodDate.localeCompare(b.periodDate) ||
          a.sourceIndex - b.sourceIndex,
      );
    return list;
  }
  function snapshot(record, asOf) {
    const history = periods(record?.weekly_table),
      filterable = !!history.length && history.every((r) => r.periodDate);
    const weekly =
      asOf && filterable
        ? history.filter((r) => r.periodDate <= asOf)
        : history;
    const latest = weekly.at(-1),
      previous = weekly.at(-2);
    const actual = number(latest?.actual),
      planned = number(latest?.plan);
    const variance =
      actual !== null && planned !== null ? actual - planned : null;
    const prevActual = number(previous?.actual),
      prevPlanned = number(previous?.plan);
    return {
      weekly,
      latest,
      previous,
      actual,
      planned,
      variance,
      filterable,
      actualDelta:
        actual !== null && prevActual !== null ? actual - prevActual : null,
      plannedDelta:
        planned !== null && prevPlanned !== null ? planned - prevPlanned : null,
      varianceDelta:
        variance !== null && prevActual !== null && prevPlanned !== null
          ? variance - (prevActual - prevPlanned)
          : null,
      spi: number(record?.spi),
      contract: number(record?.contract_value_no_vat),
      invoice: number(record?.cash_flow_ai),
      dataDate: latest?.periodDate || date(record?.updated_at),
    };
  }
  function parseXer(text) {
    if (
      !String(text)
        .replace(/^\uFEFF/, "")
        .startsWith("ERMHDR\t")
    )
      throw new Error("Invalid XER header");
    const tables = {};
    let table,
      fields = [];
    for (const line of text.split(/\r?\n/)) {
      const parts = line.split("\t");
      if (parts[0] === "%T") {
        table = parts[1];
        tables[table] = [];
        fields = [];
      } else if (parts[0] === "%F") fields = parts.slice(1);
      else if (parts[0] === "%R" && table)
        tables[table].push(
          Object.fromEntries(fields.map((f, i) => [f, parts[i + 1] ?? ""])),
        );
    }
    const project = tables.PROJECT?.[0];
    if (!project || !tables.TASK)
      throw new Error("Missing PROJECT or TASK table");
    const wbs = new Map((tables.PROJWBS || []).map((row) => [row.wbs_id, row]));
    function discipline(wbsId) {
      const path = [],
        seen = new Set();
      let row = wbs.get(wbsId);
      while (row && !seen.has(row.wbs_id)) {
        seen.add(row.wbs_id);
        path.unshift(row.wbs_name);
        row = wbs.get(row.parent_wbs_id);
      }
      const branch = path
        .slice(1)
        .find((p) =>
          /civil|structur|architect|mechanic|electri|infrastr|plumbing|landscap|road|drain/i.test(
            p,
          ),
        );
      return { discipline: branch || null, wbsPath: path.join(" / ") };
    }
    const activities = tables.TASK.map((row) => {
      const physical = number(row.phys_complete_pct),
        duration = number(row.target_drtn_hr_cnt),
        remaining = number(row.remain_drtn_hr_cnt);
      const complete =
        row.status_code === "TK_Complete"
          ? 100
          : row.complete_pct_type === "CP_Drtn" &&
              duration > 0 &&
              remaining !== null
            ? Math.max(
                0,
                Math.min(100, (100 * (duration - remaining)) / duration),
              )
            : physical;
      return {
        task_id: row.task_id,
        task_code: row.task_code,
        task_name: row.task_name,
        wbs_id: row.wbs_id,
        ...discipline(row.wbs_id),
        planned_start: date(row.target_start_date),
        planned_finish: date(row.target_end_date),
        actual_start: date(row.act_start_date),
        actual_finish: date(row.act_end_date),
        forecast_finish: date(row.early_end_date),
        actual_percent: complete,
        status:
          row.suspend_date && !row.resume_date
            ? "on_hold"
            : row.status_code === "TK_Complete"
              ? "completed"
              : row.status_code === "TK_Active"
                ? "in_progress"
                : "not_started",
        duration_hours: duration,
        total_float_hours: number(row.total_float_hr_cnt),
        milestone:
          row.task_type === "TT_Mile" || row.task_type === "TT_FinMile",
      };
    });
    const finish = activities
      .map((a) => a.planned_finish)
      .filter(Boolean)
      .sort()
      .at(-1);
    return {
      source: "xer_snapshot",
      projectName: project.proj_short_name,
      dataDate: date(project.last_recalc_date),
      start: date(project.plan_start_date),
      finish,
      activities,
    };
  }
  function scheduleSummary(schedule) {
    if (!schedule?.activities?.length) return null;
    const counts = { completed: 0, in_progress: 0, not_started: 0, on_hold: 0 },
      grouped = new Map(),
      delays = [];
    const asOf = schedule.dataDate;
    for (const a of schedule.activities) {
      if (Object.hasOwn(counts, a.status)) counts[a.status]++;
      if (
        a.discipline &&
        a.duration_hours > 0 &&
        number(a.actual_percent) !== null
      ) {
        const g = grouped.get(a.discipline) || {
          name: a.discipline,
          weight: 0,
          earned: 0,
        };
        g.weight += a.duration_hours;
        g.earned += a.duration_hours * a.actual_percent;
        grouped.set(a.discipline, g);
      }
      // Forecast slip is measured against baseline finish; overdue is only evaluated at the snapshot date.
      const forecast =
        a.forecast_finish && a.planned_finish
          ? (Date.parse(a.forecast_finish) - Date.parse(a.planned_finish)) / DAY
          : 0;
      const overdue =
        asOf && a.planned_finish && a.status !== "completed"
          ? (Date.parse(asOf) - Date.parse(a.planned_finish)) / DAY
          : 0;
      const days = Math.max(0, Math.ceil(forecast), Math.ceil(overdue));
      if (days > 0) delays.push({ ...a, delayDays: days });
    }
    return {
      counts,
      total: schedule.activities.length,
      milestones: schedule.activities
        .filter((a) => a.milestone)
        .sort((a, b) =>
          (a.planned_finish || "").localeCompare(b.planned_finish || ""),
        ),
      delays: delays.sort((a, b) => b.delayDays - a.delayDays),
      disciplines: [...grouped.values()]
        .map((g) => ({ ...g, progress: g.earned / g.weight }))
        .sort((a, b) => b.weight - a.weight),
    };
  }
  return Object.freeze({
    number,
    date,
    periods,
    snapshot,
    parseXer,
    scheduleSummary,
  });
});
