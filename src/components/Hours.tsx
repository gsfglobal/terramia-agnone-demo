import { hours, hoursToConfirm } from "@/config/site";
import { type Locale, ui } from "@/lib/i18n";
import { ToConfirm } from "./ui";

export function HoursList({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return (
    <div>
      <p className="eyebrow mb-4">
        {ui.hours[locale]}
        {hoursToConfirm && <ToConfirm locale={locale} note="Fonte: Tripadvisor 20/11/2026. AIC indica ferie a novembre." />}
      </p>
      <dl className={`divide-y divide-ivory/10 ${compact ? "text-sm" : ""}`}>
        {hours.map((h) => (
          <div key={h.day} className="flex justify-between gap-6 py-2">
            <dt className="text-ivory/70">{h[locale]}</dt>
            <dd className="text-right tabular-nums text-ivory">
              {h.slots.length === 0 ? (
                <span className="text-stone/70">{ui.closed[locale]}</span>
              ) : (
                h.slots.map(([a, b]) => `${a}–${b}`).join(" · ")
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
