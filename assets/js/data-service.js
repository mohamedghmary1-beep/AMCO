/* Shared read service. Authenticated client only; no credentials or personal data logged. */
(function () {
  "use strict";
  const cache = new Map();
  async function cached(key, fn) {
    if (!cache.has(key))
      cache.set(
        key,
        Promise.resolve()
          .then(fn)
          .catch((error) => {
            cache.delete(key);
            throw error;
          }),
      );
    return cache.get(key);
  }
  function client() {
    if (
      !window.__guardClient ||
      !window.currentUserRole ||
      window.currentUserRole === "blocked"
    )
      throw new Error("Authentication required");
    return window.__guardClient;
  }
  async function readRegister(table) {
    const records = [];
    for (let offset = 0; ; offset += 1000) {
      const { data, error } = await client().from(table).select("*").range(offset, offset + 999);
      if (error) return { available: false, records: [] };
      records.push(...(data || []));
      if (!data || data.length < 1000) return { available: true, records };
    }
  }
  window.MDCEODataService = Object.freeze({
    performance(id = 1) {
      return cached("performance:" + id, async () => {
        const { data, error } = await client()
          .from("project_performance")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        return data;
      });
    },
    invalidatePerformance(id = 1) {
      cache.delete("performance:" + id);
    },
    scheduleSnapshot() {
      return cached("xer", async () => {
        client();
        const url = window.MDCEO_DATA_SOURCES?.scheduleUrl;
        // No Primavera (XER) file is connected to this project yet: fail fast, the dashboard shows its "schedule unavailable" state.
        if (!url) throw new Error("Schedule unavailable");
        const response = await fetch(url);
        if (!response.ok) throw new Error("Schedule unavailable");
        const bytes = await response.arrayBuffer();
        let text;
        try {
          text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        } catch {
          text = new TextDecoder("windows-1252").decode(bytes);
        }
        return window.MDCEOPerformanceModel.parseXer(text);
      });
    },
    alerts() {
      return cached("alerts", async () => {
        // No alert migration has been applied by this work. Read only explicitly connected existing sources.
        const table = window.MDCEO_DATA_SOURCES?.alertTable;
        if (!table) return { available: false, records: [] };
        const result = await readRegister(table);
        result.records.sort((a, b) => String(b.created_at || b.date || "").localeCompare(String(a.created_at || a.date || "")));
        return result;
      });
    },
    risks() {
      return cached("risks", async () => {
        // No risk schema exists in this repository. An existing deployment may explicitly configure its read source.
        const table = window.MDCEO_DATA_SOURCES?.riskTable;
        if (!table) return { available: false, records: [] };
        return readRegister(table);
      });
    },
  });
})();
