/* Existing Performance route: reference layout + authenticated records. */
(function () {
  "use strict";
  const M = window.MDCEOPerformanceModel,
    D = window.MDCEODataService;
  const dictionary = {
    en: {
      admin: "Administrator",
      super_admin: "Super Administrator",
      contractor: "Contractor",
      limited: "Limited access",
      no_files: "Viewer",
      home: "Home",
      overview: "Executive Overview",
      subtitle: "Real-time project performance and key indicators",
      loading: "Loading project records…",
      loadError: "Performance records could not be loaded.",
      retry: "Retry",
      actualProgress: "Actual Progress",
      plannedProgress: "Planned Progress",
      progressVariance: "Progress Variance",
      spiLabel: "Schedule Performance Index",
      contractValue: "Contract Value",
      invoicedAmount: "Invoiced Amount",
      currentRecord: "Current record",
      forecast: "Recorded forecast",
      excludingVat: "Excluding VAT",
      progressCurve: "Planned vs Actual Progress (S-Curve)",
      allPeriods: "All periods",
      last12: "Last 12 periods",
      last6: "Last 6 periods",
      noHistory: "No progress history",
      noHistoryHint: "Approved weekly records will appear here.",
      projectStatus: "Project Status",
      completed: "Completed",
      in_progress: "In Progress",
      not_started: "Not Started",
      on_hold: "On Hold",
      noSchedule: "Schedule unavailable",
      noScheduleHint: "Activity status requires a connected schedule.",
      startDate: "Start Date",
      finishDate: "Finish Date",
      viewSchedule: "View Primavera Schedule",
      openSchedule: "Open project schedule",
      updateProgress: "Update Activity Progress",
      approvedHistory: "Review approved reporting periods",
      viewRisks: "View Project Risks",
      reviewRisks: "Review the risk register",
      viewWarnings: "View Warnings",
      checkAlerts: "Check project alerts",
      generateWeekly: "Generate Weekly Report",
      createReport: "Create a project report",
      milestones: "Key Milestones",
      viewAll: "View All",
      topDelays: "Top 5 Delayed Activities",
      financialSummary: "Project Financial Summary",
      manpowerHistogram: "Manpower Histogram",
      noManpower: "No manpower history",
      noManpowerHint: "Recorded staffing periods will appear here.",
      disciplineProgress: "Discipline Progress",
      riskWarnings: "Risk & Early Warnings",
      criticalRisks: "Critical Risks",
      highRisks: "High Risks",
      activeAlerts: "Active Alerts",
      detailsTitle: "Performance details & historical records",
      print: "Print",
      exportCsv: "Export CSV",
      editData: "Edit Data",
      contractInfo: "Contract Information",
      projectDates: "Project Dates",
      manpowerSpi: "Manpower & SPI",
      cashFlow: "Cash Flow (SAR)",
      noVat: "Contract Value without VAT",
      withVat: "Contract Value with VAT",
      changeOrder: "Approved Change Order",
      phase1Finish: "Contract Finish Date (Phase 1)",
      eotFinish: "Finish Date After EOT",
      expectedFinish: "Expected Finish Date",
      directPlanned: "Direct Planned (Person)",
      directActual: "Direct Actual (Person)",
      spi: "SPI",
      ev: "Earned Value (EV)",
      ai: "Actual Invoice (AI)",
      pv: "Planned Value (PV)",
      aiEvVariance: "Variance (AI − EV)",
      evPvVariance: "Variance (EV − PV)",
      invoiceIsNotCost: "Invoiced amounts are not actual project costs.",
      costHistory: "S-Curve — Weekly Cost",
      weeklyChart: "Planned vs Actual — Reporting Periods",
      weeklyHistory: "Weekly Table — Percentages",
      manpowerHistory: "Manpower Histogram — Reporting Periods",
      period: "Period",
      actual: "Actual",
      planned: "Planned",
      variance: "Variance",
      scheduleDetails: "Primavera Schedule Snapshot",
      searchActivities: "Search activities",
      delayedActivities: "Delayed Activities",
      delayMethod:
        "Calendar days from planned finish to the schedule data date, or forecast finish slip. Float is not elapsed delay.",
      riskRegister: "Risk Register",
      earlyWarnings: "Early Warnings",
      addPeriod: "+ Add period",
      cancel: "Cancel",
      saveChanges: "Save Changes",
      viewDashboard: "View Dashboard",
      confirmationFailed:
        "Password confirmation is unavailable. Nothing was saved.",
      noData: "Not available",
      pp: "pp",
      paymentReceived: "Payment Received",
      retention: "Retention Amount",
      notRecorded: "Not recorded",
      noDelays: "No delay at the schedule data date",
      noDelaysHint: "No finish-date slip is recorded in this snapshot.",
      noMilestones: "No milestone records",
      noDiscipline: "No weighted discipline records",
      noRisks: "Risk register not connected",
      noRisksHint:
        "Connect an existing risk data source to display real risk records.",
      noWarnings: "Early warnings not connected",
      noWarningsHint: "No accessible early-warning source is available.",
      noOpenWarnings: "No active warnings recorded",
      snapshot: "Schedule snapshot",
      stale: "Historical snapshot; import an approved update to refresh.",
      snapshotWarning:
        "Snapshot values are not current approved activity updates.",
      weightedMethod:
        "Discipline percentages use planned-duration weighting (hours), excluding milestones and zero-duration tasks.",
      forecastUnavailable:
        "No forecast history recorded; forecast is not shown.",
      snapshotAsOf: "Schedule data date",
      baselineStart: "Baseline Start",
      baselineFinish: "Baseline Finish",
      actualStart: "Actual Start",
      actualFinish: "Actual Finish",
      forecastFinish: "Forecast Finish",
      floatHours: "Total Float (hours)",
      activityId: "Activity ID",
      activityName: "Activity Name",
      delayDays: "Delay (Days)",
      status: "Status",
      discipline: "Discipline",
      reportedProgress: "Reported Progress",
      plannedCost: "Planned Cost",
      actualCost: "Recorded Actual Cost",
      dataDate: "Data Date",
      generateReport: "Generate Report",
      searchAll: "Search activities, records, documents…",
      notifications: "Notifications",
      close: "Close",
      team: "Project team",
      reportingDateMissing: "Reporting dates unavailable",
      lastUpdated: "Last updated",
      sourceNote:
        "Progress uses approved weekly records. SPI and financial totals use the current performance record; selecting a historical progress date does not reconstruct historical financial totals.",
      noAccess: "You do not have permission to edit these records.",
      saving: "Saving…",
      saveSuccess: "Saved successfully",
      saveError: "Could not save the performance record.",
      weekPlaceholder: "Reporting period",
      actualPlaceholder: "Actual %",
      plannedPlaceholder: "Planned %",
      plannedCostPlaceholder: "Planned cost",
      actualCostPlaceholder: "Actual cost",
      removePeriod: "Remove period",
      matched: "matching activities",
      scheduleMissing: "The schedule snapshot could not be loaded.",
      riskTitle: "Risk",
      warningTitle: "Warning",
      severity: "Severity",
      recordDate: "Date",
      notes: "Notes",
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
      open: "Open",
      in_progress_alert: "In Progress",
      acknowledged: "Acknowledged",
      resolved: "Resolved",
      searchResult: "Search results",
      noMatches: "No matching records",
      readOnlyProgress: "Activity Progress",
      readOnlyHint: "View approved reporting history",
    },
    ar: {
      admin: "?????",
      super_admin: "????? ???",
      contractor: "?????",
      limited: "???? ?????",
      no_files: "?????",
      home: "الرئيسية",
      overview: "النظرة التنفيذية",
      subtitle: "أداء المشروع ومؤشراته الرئيسية",
      loading: "جارٍ تحميل سجلات المشروع…",
      loadError: "تعذر تحميل سجلات الأداء.",
      retry: "إعادة المحاولة",
      actualProgress: "التقدم الفعلي",
      plannedProgress: "التقدم المخطط",
      progressVariance: "فرق التقدم",
      spiLabel: "مؤشر أداء الجدول الزمني",
      contractValue: "قيمة العقد",
      invoicedAmount: "المبلغ المفوتر",
      currentRecord: "السجل الحالي",
      excludingVat: "دون ضريبة القيمة المضافة",
      progressCurve: "التقدم المخطط مقابل الفعلي (المنحنى التراكمي)",
      allPeriods: "جميع الفترات",
      last12: "آخر 12 فترة",
      last6: "آخر 6 فترات",
      noHistory: "لا يوجد سجل تقدم",
      noHistoryHint: "تظهر هنا السجلات الأسبوعية المعتمدة.",
      projectStatus: "حالة المشروع",
      completed: "مكتمل",
      in_progress: "قيد التنفيذ",
      not_started: "لم يبدأ",
      on_hold: "متوقف",
      noSchedule: "الجدول غير متاح",
      noScheduleHint: "تتطلب حالات الأنشطة جدولًا متصلًا.",
      startDate: "تاريخ البداية",
      finishDate: "تاريخ النهاية",
      viewSchedule: "عرض جدول بريمافيرا",
      openSchedule: "فتح جدول المشروع",
      updateProgress: "تحديث تقدم الأنشطة",
      approvedHistory: "مراجعة فترات التقارير المعتمدة",
      viewRisks: "عرض مخاطر المشروع",
      reviewRisks: "مراجعة سجل المخاطر",
      viewWarnings: "عرض التنبيهات",
      checkAlerts: "مراجعة تنبيهات المشروع",
      generateWeekly: "إعداد التقرير الأسبوعي",
      createReport: "إعداد تقرير المشروع",
      milestones: "المعالم الرئيسية",
      viewAll: "عرض الكل",
      topDelays: "أكثر 5 أنشطة تأخرًا",
      financialSummary: "الملخص المالي للمشروع",
      manpowerHistogram: "مخطط القوى العاملة",
      noManpower: "لا يوجد سجل قوى عاملة",
      noManpowerHint: "تظهر هنا فترات القوى العاملة المسجلة.",
      disciplineProgress: "تقدم التخصصات",
      riskWarnings: "المخاطر والتنبيهات المبكرة",
      criticalRisks: "مخاطر حرجة",
      highRisks: "مخاطر عالية",
      activeAlerts: "تنبيهات نشطة",
      detailsTitle: "تفاصيل الأداء والسجلات التاريخية",
      print: "طباعة",
      exportCsv: "تصدير CSV",
      editData: "تعديل البيانات",
      contractInfo: "معلومات العقد",
      projectDates: "تواريخ المشروع",
      manpowerSpi: "القوى العاملة ومؤشر الأداء",
      cashFlow: "التدفق النقدي (ريال سعودي)",
      noVat: "قيمة العقد دون الضريبة",
      withVat: "قيمة العقد مع الضريبة",
      changeOrder: "أمر التغيير المعتمد",
      phase1Finish: "نهاية العقد للمرحلة الأولى",
      eotFinish: "تاريخ النهاية بعد التمديد",
      expectedFinish: "تاريخ النهاية المتوقع",
      directPlanned: "القوى المباشرة المخططة (أفراد)",
      directActual: "القوى المباشرة الفعلية (أفراد)",
      spi: "مؤشر أداء الجدول الزمني",
      ev: "القيمة المكتسبة (EV)",
      ai: "الفواتير الفعلية (AI)",
      pv: "القيمة المخططة (PV)",
      aiEvVariance: "الفرق (AI − EV)",
      evPvVariance: "الفرق (EV − PV)",
      invoiceIsNotCost: "المبالغ المفوترة لا تمثل التكاليف الفعلية للمشروع.",
      costHistory: "المنحنى التراكمي — التكلفة الأسبوعية",
      weeklyChart: "المخطط مقابل الفعلي — فترات التقارير",
      weeklyHistory: "الجدول الأسبوعي — النسب المئوية",
      manpowerHistory: "القوى العاملة — فترات التقارير",
      period: "الفترة",
      actual: "الفعلي",
      planned: "المخطط",
      variance: "الفرق",
      scheduleDetails: "لقطة جدول بريمافيرا",
      searchActivities: "البحث في الأنشطة",
      delayedActivities: "الأنشطة المتأخرة",
      delayMethod:
        "أيام تقويمية بين النهاية المخططة وتاريخ بيانات الجدول، أو انزلاق النهاية المتوقعة. السماحية ليست مدة تأخير.",
      riskRegister: "سجل المخاطر",
      earlyWarnings: "التنبيهات المبكرة",
      addPeriod: "+ إضافة فترة",
      cancel: "إلغاء",
      saveChanges: "حفظ التغييرات",
      viewDashboard: "عرض لوحة الأداء",
      confirmationFailed: "تأكيد كلمة المرور غير متاح. لم تُحفظ أي بيانات.",
      noData: "غير متاح",
      pp: "نقطة مئوية",
      paymentReceived: "الدفعات المستلمة",
      retention: "مبلغ الاحتجاز",
      notRecorded: "غير مسجل",
      noDelays: "لا يوجد تأخير عند تاريخ بيانات الجدول",
      noDelaysHint: "لا تسجل هذه اللقطة انزلاقًا في تواريخ النهاية.",
      noMilestones: "لا توجد سجلات معالم",
      noDiscipline: "لا توجد سجلات تخصصات موزونة",
      noRisks: "سجل المخاطر غير متصل",
      noRisksHint: "اربط مصدر مخاطر موجودًا لعرض السجلات الفعلية.",
      noWarnings: "التنبيهات المبكرة غير متصلة",
      noWarningsHint: "لا يتوفر مصدر تنبيهات مبكرة يمكن الوصول إليه.",
      noOpenWarnings: "لا توجد تنبيهات نشطة مسجلة",
      snapshot: "لقطة الجدول",
      stale: "لقطة تاريخية؛ استورد تحديثًا معتمدًا لتحديثها.",
      snapshotWarning: "قيم اللقطة ليست تحديثات تقدم حالية معتمدة.",
      weightedMethod:
        "نسب التخصصات موزونة بالمدد المخططة بالساعات، مع استبعاد المعالم والأنشطة ذات المدة الصفرية.",
      forecastUnavailable: "لا توجد بيانات توقعات تاريخية؛ لا يظهر خط توقعات.",
      snapshotAsOf: "تاريخ بيانات الجدول",
      baselineStart: "البداية المرجعية",
      baselineFinish: "النهاية المرجعية",
      actualStart: "البداية الفعلية",
      actualFinish: "النهاية الفعلية",
      forecastFinish: "النهاية المتوقعة",
      floatHours: "السماحية الكلية (ساعات)",
      activityId: "معرّف النشاط",
      activityName: "اسم النشاط",
      delayDays: "التأخير (أيام)",
      status: "الحالة",
      discipline: "التخصص",
      reportedProgress: "التقدم المسجل",
      plannedCost: "التكلفة المخططة",
      actualCost: "التكلفة الفعلية المسجلة",
      dataDate: "تاريخ البيانات",
      generateReport: "إعداد تقرير",
      searchAll: "البحث في الأنشطة والسجلات والمستندات…",
      notifications: "الإشعارات",
      close: "إغلاق",
      team: "فريق المشروع",
      reportingDateMissing: "تواريخ التقارير غير متاحة",
      lastUpdated: "آخر تحديث",
      sourceNote:
        "التقدم من السجلات الأسبوعية المعتمدة. المؤشر والإجماليات المالية من سجل الأداء الحالي؛ اختيار تاريخ تقدم سابق لا يعيد بناء إجماليات مالية تاريخية.",
      noAccess: "ليست لديك صلاحية تعديل هذه السجلات.",
      saving: "جارٍ الحفظ…",
      saveSuccess: "تم الحفظ بنجاح",
      saveError: "تعذر حفظ سجل الأداء.",
      weekPlaceholder: "فترة التقرير",
      actualPlaceholder: "الفعلي %",
      plannedPlaceholder: "المخطط %",
      plannedCostPlaceholder: "التكلفة المخططة",
      actualCostPlaceholder: "التكلفة الفعلية",
      removePeriod: "حذف الفترة",
      matched: "نشاط مطابق",
      scheduleMissing: "تعذر تحميل لقطة الجدول.",
      riskTitle: "الخطر",
      warningTitle: "التنبيه",
      severity: "الخطورة",
      recordDate: "التاريخ",
      notes: "الملاحظات",
      critical: "حرج",
      high: "عالٍ",
      medium: "متوسط",
      low: "منخفض",
      open: "مفتوح",
      in_progress_alert: "قيد المتابعة",
      acknowledged: "تم الإقرار",
      resolved: "تم الحل",
      searchResult: "نتائج البحث",
      noMatches: "لا توجد سجلات مطابقة",
      readOnlyProgress: "تقدم الأنشطة",
      readOnlyHint: "عرض سجل التقدم المعتمد",
    },
  };
  window.registerDictionary(dictionary);
  const charts = new Map();
  let record = null,
    schedule = null,
    summary = null,
    alerts = { available: false, records: [] },
    risks = { available: false, records: [] },
    asOf = null,
    loaded = false;
  const $ = (id) => document.getElementById(id),
    t = (key) => window.T(key),
    n = M.number;
  function element(tag, cls, text) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text !== undefined) el.textContent = text;
    return el;
  }
  function text(id, value) {
    if ($(id)) $(id).textContent = value;
  }
  function pct(value, precision = 2) {
    return n(value) === null
      ? "—"
      : Number(value).toLocaleString("en-US", {
          minimumFractionDigits: precision,
          maximumFractionDigits: precision,
        }) + "%";
  }
  function money(value, compact = true) {
    if (n(value) === null) return "—";
    return (
      "SAR " +
      new Intl.NumberFormat("en-US", {
        notation: compact ? "compact" : "standard",
        maximumFractionDigits: compact ? 1 : 2,
      }).format(Number(value))
    );
  }
  function date(value) {
    const iso = M.date(value);
    return iso
      ? new Intl.DateTimeFormat(
          window.getCurrentLang() === "ar" ? "ar-SA-u-ca-gregory" : "en-GB",
          { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" },
        ).format(new Date(iso))
      : "—";
  }
  function color(key) {
    return getComputedStyle(document.body).getPropertyValue(key).trim();
  }
  function empty(target, title, message) {
    const box = element("div", "perf-empty");
    box.append(element("strong", "", t(title)));
    if (message) box.append(element("p", "", t(message)));
    $(target).replaceChildren(box);
  }
  function chart(id, type, data, extra = {}) {
    charts.get(id)?.destroy();
    charts.delete(id);
    if (!window.Chart || !$(id)) return;
    const config = {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            align: "start",
            labels: {
              usePointStyle: true,
              boxWidth: 6,
              boxHeight: 6,
              padding: 12,
              font: { size: 10 },
            },
          },
          tooltip: { padding: 10 },
        },
        scales: {
          x: {
            grid: { color: color("--chart-grid") },
            ticks: {
              font: { size: 9 },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 12,
            },
          },
          y: {
            beginAtZero: true,
            grid: { color: color("--chart-grid") },
            ticks: { font: { size: 9 } },
          },
        },
      },
      ...extra,
    };
    if (extra.options) config.options = { ...config.options, ...extra.options };
    charts.set(id, new Chart($(id), config));
  }
  function spark(id, values, tone) {
    const available = values.map(n).filter((v) => v !== null);
    $(id).parentElement.hidden = available.length < 2;
    if (available.length < 2) {
      charts.get(id)?.destroy();
      charts.delete(id);
      return;
    }
    chart(
      id,
      "line",
      {
        labels: values.map((_, i) => i),
        datasets: [
          {
            data: values.map(n),
            borderColor: color(tone),
            backgroundColor: color("--chart-area"),
            fill: true,
            borderWidth: 1,
            pointRadius: 0,
            tension: 0.25,
          },
        ],
      },
      {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } },
        },
      },
    );
  }
  function delta(id, value) {
    const el = $(id);
    el.className = "perf-kpi-trend";
    if (value === null) {
      el.textContent = "";
      return;
    }
    el.classList.add(value < 0 ? "negative" : "positive");
    el.textContent =
      (value < 0 ? "▼ " : "▲ ") +
      (value > 0 ? "+" : "") +
      value.toFixed(2) +
      " " +
      t("pp");
  }
  function selectedPeriods(rows, limit, filterDate = true) {
    const ordered = M.periods(rows);
    const filtered =
      filterDate && asOf && ordered.length && ordered.every((r) => r.periodDate)
        ? ordered.filter((r) => r.periodDate <= asOf)
        : ordered;
    return limit === "all" ? filtered : filtered.slice(-Number(limit));
  }
  function dataTable(headers, rows) {
    const table = element("table", "perf-data-table"),
      head = document.createElement("thead"),
      hr = document.createElement("tr"),
      body = document.createElement("tbody");
    headers.forEach((h) => {
      const th = element("th", "", t(h));
      th.scope = "col";
      hr.append(th);
    });
    head.append(hr);
    rows.forEach((cells) => {
      const tr = document.createElement("tr");
      cells.forEach((value) => {
        const td = document.createElement("td");
        if (value instanceof Node) td.append(value);
        else td.textContent = value ?? "—";
        tr.append(td);
      });
      body.append(tr);
    });
    table.append(head, body);
    return table;
  }
  function activityLink(a) {
    const link = element("a", "", a.task_code);
    link.href = "#activity=" + encodeURIComponent(a.task_code);
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openActivity(a.task_code);
    });
    return link;
  }
  function badge(status) {
    return element("span", "perf-badge " + status, t(status));
  }
  function renderCurve() {
    const rows = selectedPeriods(record?.weekly_table, $("curvePeriod").value);
    const forecasts = rows.map((r) => n(r.forecast_percent ?? r.forecast));
    $("curveEmpty").hidden = !!rows.length;
    $("progressCurve").hidden = !rows.length;
    if (!rows.length) {
      charts.get("progressCurve")?.destroy();
      charts.delete("progressCurve");
      return;
    }
    chart(
      "progressCurve",
      "line",
      {
        labels: rows.map((r) => r.week),
        datasets: [
          {
            label: t("planned"),
            data: rows.map((r) => n(r.plan)),
            borderColor: color("--secondary"),
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.3,
            fill: false,
          },
          {
            label: t("actual"),
            data: rows.map((r) => n(r.actual)),
            borderColor: color("--primary"),
            backgroundColor: color("--chart-area"),
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.3,
            fill: true,
          },
          ...(forecasts.some((v) => v !== null)
            ? [
                {
                  label: t("forecast"),
                  data: forecasts,
                  borderColor: color("--secondary"),
                  borderDash: [5, 4],
                  borderWidth: 1.5,
                  pointRadius: 0,
                  tension: 0.3,
                  fill: false,
                },
              ]
            : []),
        ],
      },
      {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: {
              position: "top",
              align: "start",
              labels: { usePointStyle: true, boxWidth: 6, font: { size: 10 } },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => ctx.dataset.label + ": " + pct(ctx.parsed.y),
                afterBody: (items) =>
                  items.length === 2
                    ? t("variance") +
                      ": " +
                      (items[1].parsed.y - items[0].parsed.y).toFixed(2) +
                      " " +
                      t("pp")
                    : "",
              },
            },
          },
          scales: {
            x: {
              grid: { color: color("--chart-grid") },
              ticks: { font: { size: 8 }, maxRotation: 0, maxTicksLimit: 12 },
            },
            y: {
              min: 0,
              max: 100,
              grid: { color: color("--chart-grid") },
              ticks: {
                stepSize: 20,
                font: { size: 9 },
                callback: (v) => v + "%",
              },
            },
          },
        },
      },
    );
  }
  function renderManpower() {
    const rows = selectedPeriods(
      record?.manpower_data,
      $("manpowerPeriod").value,
    );
    $("manpowerEmpty").hidden = !!rows.length;
    $("manpowerChart").hidden = !rows.length;
    if (rows.length)
      chart("manpowerChart", "bar", {
        labels: rows.map((r) => r.week),
        datasets: [
          {
            label: t("planned"),
            data: rows.map((r) => n(r.planned)),
            backgroundColor: color("--secondary"),
            borderRadius: 2,
            barPercentage: 0.7,
            categoryPercentage: 0.65,
          },
          {
            label: t("actual"),
            data: rows.map((r) => n(r.actual)),
            backgroundColor: color("--primary"),
            borderRadius: 2,
            barPercentage: 0.7,
            categoryPercentage: 0.65,
          },
        ],
      });
    else {
      charts.get("manpowerChart")?.destroy();
      charts.delete("manpowerChart");
    }
  }
  function renderFinance() {
    const rows = [
      ["contractValue", n(record.contract_value_no_vat)],
      ["invoicedAmount", n(record.cash_flow_ai)],
      ["paymentReceived", n(record.payment_received)],
      ["retention", n(record.retention_amount)],
    ];
    $("financialSummary").replaceChildren();
    rows.forEach(([label, value]) => {
      const row = element("div", "perf-finance-row");
      row.append(element("span", "", t(label)));
      const track = element("div", "perf-track"),
        fill = document.createElement("span"),
        ratio =
          value !== null && n(record.contract_value_no_vat) > 0
            ? (100 * value) / record.contract_value_no_vat
            : null;
      fill.style.width =
        ratio === null ? "0%" : Math.max(0, Math.min(100, ratio)) + "%";
      track.append(fill);
      const amount = element("strong", "", value === null ? "—" : money(value));
      amount.append(
        element("small", "", ratio === null ? t("notRecorded") : pct(ratio, 1)),
      );
      row.append(track, amount);
      $("financialSummary").append(row);
    });
  }
  function renderSchedule() {
    if (!summary) {
      empty("milestoneList", "noMilestones");
      empty("delayTable", "noSchedule", "noScheduleHint");
      empty("disciplineList", "noDiscipline");
      empty("scheduleRegister", "noSchedule", "noScheduleHint");
      empty("allDelays", "noSchedule");
      $("statusContent").hidden = true;
      $("statusEmpty").hidden = false;
      text("scheduleDetailNote", t("scheduleMissing"));
      return;
    }
    $("statusContent").hidden = false;
    $("statusEmpty").hidden = true;
    const keys = ["completed", "in_progress", "not_started", "on_hold"],
      tones = ["--tone-teal", "--secondary", "--primary", "--text-muted"];
    chart(
      "projectStatusChart",
      "doughnut",
      {
        labels: keys.map(t),
        datasets: [
          {
            data: keys.map((k) => summary.counts[k]),
            backgroundColor: tones.map(color),
            borderWidth: 1,
            borderColor: color("--bg-card"),
          },
        ],
      },
      {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          cutout: "72%",
          plugins: { legend: { display: false } },
          scales: {},
        },
      },
    );
    text(
      "statusPercent",
      pct((100 * summary.counts.completed) / summary.total),
    );
    $("statusLegend").replaceChildren();
    keys.forEach((key, i) => {
      const row = document.createElement("div"),
        dot = element("span", "dot"),
        label = element("span", "", t(key));
      dot.style.background = color(tones[i]);
      label.append(
        element(
          "strong",
          "",
          summary.counts[key] +
            " (" +
            pct((100 * summary.counts[key]) / summary.total, 1) +
            ")",
        ),
      );
      row.append(dot, label);
      $("statusLegend").append(row);
    });
    text("statusDate", t("snapshot") + ": " + date(schedule.dataDate));
    $("milestoneList").replaceChildren();
    summary.milestones.slice(0, 5).forEach((a) => {
      const link = element("a", "perf-milestone");
      link.href = "#activity=" + encodeURIComponent(a.task_code);
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openActivity(a.task_code);
      });
      const time = element(
        "time",
        "",
        date(a.planned_finish || a.planned_start),
      );
      if (a.planned_finish) time.dateTime = a.planned_finish;
      link.append(
        element("span", "milestone-dot"),
        element("strong", "", a.task_name),
        time,
        badge(a.status),
      );
      $("milestoneList").append(link);
    });
    renderDelays("delayTable", summary.delays.slice(0, 5));
    renderDelays("allDelays", summary.delays);
    $("disciplineList").replaceChildren();
    summary.disciplines.slice(0, 6).forEach((g) => {
      const row = element("div", "perf-discipline");
      const name = element("span", "", g.name);
      name.title = g.name;
      const track = element("div", "perf-track"),
        fill = document.createElement("span");
      fill.style.width = Math.max(0, Math.min(100, g.progress)) + "%";
      track.append(fill);
      row.append(name, track, element("span", "", pct(g.progress, 0)));
      $("disciplineList").append(row);
    });
    if (!summary.disciplines.length) empty("disciplineList", "noDiscipline");
    const today = new Date().toISOString().slice(0, 10),
      stale =
        schedule.dataDate &&
        (Date.parse(today) - Date.parse(schedule.dataDate)) / 86400000 > 14;
    const note =
      t("snapshotAsOf") +
      ": " +
      date(schedule.dataDate) +
      ". " +
      (stale ? t("stale") + " " : "") +
      t("snapshotWarning") +
      " " +
      t("weightedMethod");
    text("scheduleSourceNote", note);
    text("scheduleDetailNote", note);
    renderRegister();
  }
  function renderDelays(target, rows) {
    if (!rows.length) {
      empty(target, "noDelays", "noDelaysHint");
      return;
    }
    $(target).replaceChildren(
      dataTable(
        ["activityId", "activityName", "delayDays", "status"],
        rows.map((a) => [
          activityLink(a),
          a.task_name,
          a.delayDays,
          badge(a.status),
        ]),
      ),
    );
  }
  function renderRegister() {
    if (!schedule) return;
    const query = $("scheduleSearch").value.trim().toLocaleLowerCase();
    const rows = schedule.activities.filter((a) =>
      [a.task_code, a.task_name, a.wbsPath]
        .join(" ")
        .toLocaleLowerCase()
        .includes(query),
    );
    $("scheduleRegister").replaceChildren(
      dataTable(
        [
          "activityId",
          "activityName",
          "baselineStart",
          "baselineFinish",
          "reportedProgress",
          "status",
        ],
        rows.map((a) => [
          activityLink(a),
          a.task_name,
          date(a.planned_start),
          date(a.planned_finish),
          pct(a.actual_percent, 1),
          badge(a.status),
        ]),
      ),
    );
  }
  function renderWarnings() {
    const active = alerts.records.filter(
      (a) => !["resolved", "closed"].includes(String(a.status).toLowerCase()),
    );
    text(
      "criticalRisks",
      risks.available
        ? risks.records.filter(
            (r) =>
              String(r.severity).toLowerCase() === "critical" &&
              !["closed", "resolved"].includes(String(r.status).toLowerCase()),
          ).length
        : "—",
    );
    text(
      "highRisks",
      risks.available
        ? risks.records.filter(
            (r) =>
              String(r.severity).toLowerCase() === "high" &&
              !["closed", "resolved"].includes(String(r.status).toLowerCase()),
          ).length
        : "—",
    );
    text("activeAlerts", alerts.available ? active.length : "—");
    const count = active.filter((a) =>
      ["critical", "high"].includes(String(a.severity).toLowerCase()),
    ).length;
    if ($("perfBellCount")) {
      $("perfBellCount").hidden = !alerts.available || !count;
      text("perfBellCount", String(count));
    }
    if (!alerts.available) {
      empty("recentWarnings", "noWarnings");
      empty("warningRegister", "noWarnings", "noWarningsHint");
    } else if (!active.length) {
      empty("recentWarnings", "noOpenWarnings");
      renderRecordList("warningRegister", alerts.records, "warning");
    } else {
      renderRecordList("recentWarnings", active.slice(0, 4), "warning");
      renderRecordList("warningRegister", alerts.records, "warning");
    }
    if (!risks.available) empty("riskRegister", "noRisks", "noRisksHint");
    else renderRecordList("riskRegister", risks.records, "risk");
  }
  function renderRecordList(target, rows, kind) {
    if (!rows.length) {
      empty(target, "noData");
      return;
    }
    $(target).replaceChildren(
      dataTable(
        [
          "activityId",
          kind === "risk" ? "riskTitle" : "warningTitle",
          "severity",
          "recordDate",
        ],
        rows.map((r) => {
          const link = element(
            "a",
            "",
            r.title || r.alert_title || r.risk_title || String(r.id),
          );
          link.href = "#" + kind + "=" + encodeURIComponent(r.id);
          link.addEventListener("click", (e) => {
            e.preventDefault();
            openRecord(r, kind);
          });
          const severity = String(r.severity || "").toLowerCase();
          return [
            String(r.id),
            link,
            ["critical", "high", "medium", "low"].includes(severity)
              ? badge(severity)
              : "—",
            date(r.created_at || r.date),
          ];
        }),
      ),
    );
  }
  function renderGauges() {
    const snap = M.snapshot(record);
    [
      ["actualGauge", snap.actual, 100, "--primary", "detailActual"],
      ["plannedGauge", snap.planned, 100, "--secondary", "detailPlanned"],
      ["spiGauge", snap.spi, 2, "--tone-teal", "detailSpi"],
    ].forEach(([id, value, max, tone, label]) => {
      $(id).hidden = value === null;
      text(
        label,
        value === null ? "—" : max === 100 ? pct(value) : value.toFixed(2),
      );
      if (value === null) {
        charts.get(id)?.destroy();
        charts.delete(id);
        return;
      }
      const clamped = Math.max(0, Math.min(max, value));
      chart(
        id,
        "doughnut",
        {
          labels: [t(max === 100 ? "reportedProgress" : "spi"), t("noData")],
          datasets: [
            {
              data: [clamped, max - clamped],
              backgroundColor: [color(tone), color("--border")],
              borderWidth: 3,
              borderColor: color("--bg-card"),
            },
          ],
        },
        {
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: false,
            cutout: "75%",
            circumference: max === 2 ? 180 : 360,
            rotation: max === 2 ? 270 : 0,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            scales: {},
          },
        },
      );
    });
  }
  function renderDetails() {
    [
      ["valNoVat", "contract_value_no_vat"],
      ["valVat", "contract_value_vat"],
    ].forEach(([id, key]) => text(id, money(record[key], false)));
    text("valChangeOrder", record.approved_change_order ?? "—");
    [
      ["valPhase1", "contract_finish_phase1"],
      ["valEot", "finish_date_after_eot"],
      ["valExpected", "expected_finish_date"],
    ].forEach(([id, key]) => text(id, date(record[key])));
    text("manpowerPlanned", n(record.manpower_planned) ?? "—");
    text("manpowerActual", n(record.manpower_actual) ?? "—");
    text(
      "spiValue",
      n(record.spi) === null ? "—" : Number(record.spi).toFixed(2),
    );
    [
      ["cfEv1", "cash_flow_ev"],
      ["cfAi", "cash_flow_ai"],
      ["cfPv", "cash_flow_pv"],
    ].forEach(([id, key]) => text(id, money(record[key], false)));
    text(
      "cfVarAiEv",
      n(record.cash_flow_ai) === null || n(record.cash_flow_ev) === null
        ? "—"
        : money(record.cash_flow_ai - record.cash_flow_ev, false),
    );
    text(
      "cfVarEvPv",
      n(record.cash_flow_ev) === null || n(record.cash_flow_pv) === null
        ? "—"
        : money(record.cash_flow_ev - record.cash_flow_pv, false),
    );
    text("updatedMeta", t("lastUpdated") + ": " + date(record.updated_at));
    const rows = M.periods(record.weekly_table);
    const tbody = $("weeklyTable").querySelector("tbody");
    tbody.replaceChildren();
    rows.forEach((r) => {
      const tr = document.createElement("tr");
      const variance =
        n(r.actual) === null || n(r.plan) === null ? null : r.actual - r.plan;
      [
        r.week,
        pct(r.actual),
        pct(r.plan),
        variance === null ? "—" : variance.toFixed(2) + " " + t("pp"),
      ].forEach((v) => tr.append(element("td", "", v)));
      tbody.append(tr);
    });
    const costs = M.periods(record.scurve_data);
    $("costHistoryTable").replaceChildren(
      dataTable(
        ["period", "plannedCost", "actualCost"],
        costs.map((r) => [
          r.week,
          money(r.planned_cost, false),
          money(r.actual_cost, false),
        ]),
      ),
    );
  }
  function renderDetailCharts() {
    if (!record) return;
    renderGauges();
    const rows = M.periods(record.weekly_table);
    chart("plannedActualChart", "bar", {
      labels: rows.map((r) => r.week),
      datasets: [
        {
          label: t("planned"),
          data: rows.map((r) => n(r.plan)),
          backgroundColor: color("--secondary"),
        },
        {
          label: t("actual"),
          data: rows.map((r) => n(r.actual)),
          backgroundColor: color("--primary"),
        },
      ],
    });
    const costs = M.periods(record.scurve_data);
    chart("scurveChart", "bar", {
      labels: costs.map((r) => r.week),
      datasets: [
        {
          label: t("plannedCost"),
          data: costs.map((r) => n(r.planned_cost)),
          backgroundColor: color("--secondary"),
        },
        {
          label: t("actualCost"),
          data: costs.map((r) => n(r.actual_cost)),
          backgroundColor: color("--primary"),
        },
      ],
    });
  }
  function render() {
    if (!record) return;
    const snap = M.snapshot(record, asOf);
    text("kpiActual", pct(snap.actual));
    text("kpiPlanned", pct(snap.planned));
    text(
      "kpiVariance",
      snap.variance === null ? "—" : snap.variance.toFixed(2) + "%",
    );
    $("kpiVariance").classList.toggle(
      "is-negative",
      snap.variance !== null && snap.variance < 0,
    );
    text("kpiSpi", snap.spi === null ? "—" : snap.spi.toFixed(2));
    text("kpiContract", money(snap.contract));
    text("kpiInvoice", money(snap.invoice));
    $("kpiContract").title = money(snap.contract, false);
    $("kpiInvoice").title = money(snap.invoice, false);
    $("kpiVariance").title = t("pp");
    delta("deltaActual", snap.actualDelta);
    delta("deltaPlanned", snap.plannedDelta);
    delta("deltaVariance", snap.varianceDelta);
    text(
      "invoiceRatio",
      snap.invoice !== null && snap.contract > 0
        ? pct((100 * snap.invoice) / snap.contract, 1)
        : "",
    );
    spark(
      "sparkActual",
      snap.weekly.map((r) => r.actual),
      "--secondary",
    );
    spark(
      "sparkPlanned",
      snap.weekly.map((r) => r.plan),
      "--secondary",
    );
    spark(
      "sparkVariance",
      snap.weekly.map((r) =>
        n(r.actual) !== null && n(r.plan) !== null ? r.actual - r.plan : null,
      ),
      "--danger",
    );
    // No SPI/contract/invoice histories exist in the legacy schema: no invented sparklines.
    ["sparkSpi", "sparkContract", "sparkInvoice"].forEach(
      (id) => ($(id).parentElement.hidden = true),
    );
    renderCurve();
    renderManpower();
    renderFinance();
    renderSchedule();
    renderWarnings();
    renderDetails();
    if ($("performanceDetails").open) renderDetailCharts();
    const name = record.project_name || "AMCO FACTORY";
    document
      .querySelectorAll(".perf-project-name")
      .forEach((el) => (el.textContent = name));
    if ($("perfProject")) {
      $("perfProject").options[0].textContent = name;
    }
    text("projectLocation", record.project_location || "");
    text("projectStart", date(record.project_start_date || schedule?.start));
    text(
      "projectFinish",
      date(
        record.expected_finish_date ||
          record.finish_date_after_eot ||
          record.contract_finish_phase1 ||
          schedule?.finish,
      ),
    );
    text("overallPercent", pct(snap.actual));
    $("overallBar").style.width =
      snap.actual === null
        ? "0%"
        : Math.max(0, Math.min(100, snap.actual)) + "%";
    text("sidebarProjectName", name);
    text("sidebarStart", date(record.project_start_date || schedule?.start));
    text(
      "sidebarFinish",
      date(
        record.expected_finish_date ||
          record.finish_date_after_eot ||
          record.contract_finish_phase1 ||
          schedule?.finish,
      ),
    );
    text("sidebarProgress", pct(snap.actual));
    if ($("sidebarBar"))
      $("sidebarBar").style.width = $("overallBar").style.width;
    text(
      "performanceSourceNote",
      t("sourceNote") +
        " " +
        (M.periods(record.weekly_table).some(
          (r) => n(r.forecast_percent ?? r.forecast) !== null,
        )
          ? ""
          : t("forecastUnavailable")),
    );
    const dateInput = $("perfDataDate");
    if (dateInput) {
      dateInput.disabled = !snap.filterable;
      dateInput.title = snap.filterable ? "" : t("reportingDateMissing");
      if (!asOf && snap.dataDate) dateInput.value = snap.dataDate;
    }
    updateProfile();
    translateAria();
  }
  function translateAria() {
    const attrs = {
      curvePeriod: "period",
      manpowerPeriod: "period",
      exportWeekly: "exportCsv",
      progressCurve: "progressCurve",
      projectStatusChart: "projectStatus",
      manpowerChart: "manpowerHistogram",
      scurveChart: "costHistory",
      plannedActualChart: "weeklyChart",
      closeRecord: "close",
      perfProject: "overview",
      perfBell: "notifications",
      actualGauge: "actualProgress",
      plannedGauge: "plannedProgress",
      spiGauge: "spi",
    };
    Object.entries(attrs).forEach(([id, key]) =>
      $(id)?.setAttribute("aria-label", t(key)),
    );
    if (window.mdceoShell)
      window.mdceoShell.search.placeholder = t("searchAll");
  }
  function updateProfile() {
    if (window.currentUserRole === "blocked" || !$("editToggleBtn")) return;
    text("perfUsername", window.currentUsername || t("team"));
    text("perfRole", t(window.currentUserRole || "team"));
    const menu = $("mdceoAccountMenu");
    if (menu && $("perfProfile")) $("perfProfile").prepend(menu);
    const avatar = $("mdceoAccountAvatar");
    if (avatar && !avatar.dataset.performanceAccessible) {
      avatar.dataset.performanceAccessible = "1";
      avatar.tabIndex = 0;
      avatar.setAttribute("role", "button");
      avatar.setAttribute("aria-label", window.currentUsername || t("team"));
      avatar.setAttribute("aria-haspopup", "true");
      const dropdown = $("mdceoAccountDropdown");
      if (dropdown) {
        const syncExpanded = () => avatar.setAttribute("aria-expanded", String(dropdown.classList.contains("open")));
        new MutationObserver(syncExpanded).observe(dropdown, { attributes: true, attributeFilter: ["class"] });
        syncExpanded();
      }
      avatar.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          avatar.click();
        }
      });
    }
    const canEdit = window.canEditDashboard === true;
    $("editToggleBtn").hidden = !canEdit;
    $("editToggleBtn").style.display = canEdit ? "" : "none";
    if (!canEdit) {
      const action = $("progressAction");
      action.querySelector("strong").textContent = t("readOnlyProgress");
      action.querySelector("small").textContent = t("readOnlyHint");
    }
  }
  function enhanceShell() {
    const shell = window.mdceoShell;
    if (!shell || shell.top.dataset.performanceEnhanced) return;
    shell.top.dataset.performanceEnhanced = "1";
    const brand = element("a", "perf-brand");
    brand.href = "performance.html";
    const logo = document.createElement("img");
    logo.src =
      "../images/logo-mdceo.jpeg";
    logo.alt = "MDCEO";
    brand.append(logo);
    shell.top.prepend(brand);
    const toggle = $("navToggleBtn");
    if (toggle) brand.after(toggle);
    const selector = element("select", "perf-project-select");
    selector.id = "perfProject";
    const option = element("option", "", "AMCO FACTORY");
    option.value = "1";
    selector.append(option);
    shell.search.before(selector);
    const dateBox = element("label", "perf-top-date"),
      dateLabel = element("span", "", t("dataDate"));
    dateLabel.dataset.i18n = "dataDate";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "perfDataDate";
    dateInput.disabled = true;
    dateBox.append(dateLabel, dateInput);
    shell.search.after(dateBox);
    dateInput.addEventListener("change", () => {
      asOf = dateInput.value || null;
      render();
    });
    const generate = element("a", "perf-generate", t("generateReport"));
    generate.href = "weekly_report.html";
    generate.dataset.i18n = "generateReport";
    dateBox.after(generate);
    const bell = element("a", "perf-bell");
    bell.id = "perfBell";
    bell.href = "#warningsDetails";
    bell.append(element("i", "fa-regular fa-bell"));
    const count = element("span", "perf-bell-count");
    count.id = "perfBellCount";
    count.hidden = true;
    bell.append(count);
    generate.after(bell);
    const profile = element("div", "perf-profile");
    profile.id = "perfProfile";
    const profileText = element("div", "perf-profile-text");
    const name = element("strong", "", "");
    name.id = "perfUsername";
    const role = element("small", "", "");
    role.id = "perfRole";
    profileText.append(name, role);
    profile.append(profileText);
    shell.top.append(profile);
    shell.search.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        globalSearch(shell.search.value);
      }
    });
    const project = element("div", "perf-sidebar-project"),
      photo = element("div", "perf-sidebar-art");
    photo.setAttribute("aria-hidden", "true");
    photo.append(element("i", "fa-solid fa-industry"));
    const pname = element("strong", "");
    pname.id = "sidebarProjectName";
    const info = element("small", "", t("snapshot"));
    const timeline = element("div", "perf-sidebar-timeline", t("projectDates"));
    timeline.dataset.i18n = "projectDates";
    const dates = element("div", "perf-sidebar-dates");
    const start = element("span", "");
    start.id = "sidebarStart";
    const finish = element("span", "");
    finish.id = "sidebarFinish";
    dates.append(start, finish);
    const track = element("div", "perf-track"),
      bar = document.createElement("span");
    bar.id = "sidebarBar";
    track.append(bar);
    const progress = element("small", "");
    progress.id = "sidebarProgress";
    project.append(photo, pname, info, timeline, dates, track, progress);
    shell.nav.append(project);
    translateAria();
    updateProfile();
  }
  function openDetails(id) {
    const el = $(id);
    if (!el) return;
    let parent = el.closest("details");
    if (parent) parent.open = true;
    if (el.tagName === "DETAILS") el.open = true;
    requestAnimationFrame(() => {
      el.scrollIntoView({
        block: "start",
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    });
  }
  function openActivity(code) {
    const activity = schedule?.activities.find((a) => a.task_code === code);
    if (!activity) return;
    const content = $("recordContent"),
      dl = document.createElement("dl");
    text("recordTitle", activity.task_code + " — " + activity.task_name);
    [
      ["baselineStart", activity.planned_start],
      ["baselineFinish", activity.planned_finish],
      ["actualStart", activity.actual_start],
      ["actualFinish", activity.actual_finish],
      ["forecastFinish", activity.forecast_finish],
    ].forEach(([label, value]) =>
      dl.append(element("dt", "", t(label)), element("dd", "", date(value))),
    );
    dl.append(
      element("dt", "", t("floatHours")),
      element("dd", "", activity.total_float_hours ?? "—"),
      element("dt", "", t("reportedProgress")),
      element("dd", "", pct(activity.actual_percent)),
      element("dt", "", t("status")),
      element("dd", "", t(activity.status)),
    );
    content.replaceChildren(
      element("p", "", activity.wbsPath),
      dl,
      element(
        "p",
        "perf-snapshot-note",
        t("snapshotAsOf") +
          ": " +
          date(schedule.dataDate) +
          ". " +
          t("snapshotWarning"),
      ),
    );
    $("recordDialog").showModal();
  }
  function openRecord(r, kind) {
    text(
      "recordTitle",
      r.title || r.alert_title || r.risk_title || String(r.id),
    );
    $("recordContent").replaceChildren(
      element(
        "p",
        "",
        t("severity") + ": " + t(String(r.severity || "").toLowerCase()),
      ),
      element("p", "", t("status") + ": " + String(r.status || "—")),
      element("p", "", r.note || r.notes || r.description || "—"),
    );
    $("recordDialog").showModal();
  }
  function globalSearch(query) {
    const q = query.trim().toLocaleLowerCase();
    if (!q) return;
    const activity = schedule?.activities.find((a) =>
      [a.task_code, a.task_name].join(" ").toLocaleLowerCase().includes(q),
    );
    if (activity) {
      $("scheduleSearch").value = query;
      renderRegister();
      openDetails("scheduleDetails");
      return;
    }
    const warning = alerts.records.find((r) =>
      [r.id, r.title, r.alert_title].join(" ").toLocaleLowerCase().includes(q),
    );
    if (warning) {
      openRecord(warning, "warning");
      return;
    }
    text("recordTitle", t("searchResult"));
    $("recordContent").replaceChildren(element("p", "", t("noMatches")));
    $("recordDialog").showModal();
  }
  function csv(name, headers, rows) {
    const quote = (v) => {
      const raw = String(v ?? "");
      const safe = /^[=+@-]/.test(raw) && !/^-?\d+(?:\.\d+)?$/.test(raw) ? "'" + raw : raw;
      return '"' + safe.replaceAll('"', '""') + '"';
    };
    const blob = new Blob(
      [
        "\uFEFF" +
          [headers, ...rows].map((r) => r.map(quote).join(",")).join("\r\n"),
      ],
      { type: "text/csv;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function load() {
    if (window.currentUserRole === "blocked" || !window.currentUserRole) return;
    loaded = true;
    $("performanceError").hidden = true;
    $("loadingMsg").hidden = false;
    const results = await Promise.allSettled([
      D.performance(),
      D.scheduleSnapshot(),
      D.alerts(),
      D.risks(),
    ]);
    if (results[0].status !== "fulfilled" || !results[0].value) {
      $("loadingMsg").hidden = true;
      $("performanceError").hidden = false;
      $("dashboard").hidden = true;
      return;
    }
    record = results[0].value;
    window.currentData = record;
    schedule = results[1].status === "fulfilled" ? results[1].value : null;
    summary = M.scheduleSummary(schedule);
    alerts =
      results[2].status === "fulfilled"
        ? results[2].value
        : { available: false, records: [] };
    risks =
      results[3].status === "fulfilled"
        ? results[3].value
        : { available: false, records: [] };
    $("loadingMsg").hidden = true;
    $("dashboard").hidden = false;
    render();
    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith("activity=")) openActivity(hash.slice(9));
    else if (hash) openDetails(hash);
  }
  function init() {
    if (window.currentUserRole === "blocked") return;
    enhanceShell();
    window.setLanguage(window.getCurrentLang());
    document.addEventListener("authguard:ready", () => {
      updateProfile();
      if (!loaded) load();
    });
    if (window.currentUserRole) load();
    $("retryPerformance").addEventListener("click", () => {
      D.invalidatePerformance();
      load();
    });
    $("curvePeriod").addEventListener("change", renderCurve);
    $("manpowerPeriod").addEventListener("change", renderManpower);
    $("scheduleSearch").addEventListener("input", renderRegister);
    $("performanceDetails").addEventListener("toggle", () => {
      if ($("performanceDetails").open) renderDetailCharts();
    });
    $("closeRecord").addEventListener("click", () => $("recordDialog").close());
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (
        link?.closest(".mdceo-sidebar") &&
        matchMedia("(max-width: 820px)").matches
      ) {
        document.body.classList.add("nav-collapsed");
        window.syncNavToggle?.();
      }
      if (
        link &&
        !link.hash.startsWith("#activity=") &&
        !link.hash.startsWith("#warning=") &&
        !link.hash.startsWith("#risk=")
      ) {
        const id = decodeURIComponent(link.hash.slice(1));
        if ($(id)) {
          e.preventDefault();
          history.replaceState(null, "", link.hash);
          openDetails(id);
        }
      }
    });
    $("exportWeekly").addEventListener("click", () => {
      const snap = M.snapshot(record, asOf);
      csv(
        "approved-progress.csv",
        [t("period"), t("actual"), t("planned")],
        snap.weekly.map((r) => [r.week, r.actual, r.plan]),
      );
    });
    $("exportPerformance").addEventListener("click", () =>
      csv(
        "performance-record.csv",
        ["Field", "Value"],
        Object.entries(record).map(([key, value]) => [
          key,
          typeof value === "object" ? JSON.stringify(value) : value,
        ]),
      ),
    );
    $("exportSchedule").addEventListener("click", () => {
      if (schedule)
        csv(
          "primavera-snapshot.csv",
          [
            t("activityId"),
            t("activityName"),
            t("baselineStart"),
            t("baselineFinish"),
            t("reportedProgress"),
            t("status"),
          ],
          schedule.activities.map((a) => [
            a.task_code,
            a.task_name,
            a.planned_start,
            a.planned_finish,
            a.actual_percent,
            t(a.status),
          ]),
        );
    });
  }
  const previousLanguageChanged = window.onLanguageChanged;
  window.onLanguageChanged = function (lang) {
    if (typeof previousLanguageChanged === "function")
      previousLanguageChanged(lang);
    translateAria();
    if (record) render();
  };
  window.MDCEOPerformancePage = { render, load, charts, openActivity };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
