# P303 — Downtime capture on the floor

## User and context

Alex Rivera is a floor supervisor moving between machines at fictional Northline Works. When a machine stops, Alex has one hand free, limited time, and may be glancing at the phone in a noisy environment.

## One task

Log a downtime event with the machine, reason, and duration. A note is optional. After saving, see an explicit confirmation and the new event in the recent log.

## Flow and success criteria

1. Open the phone-first page and immediately see the primary action, current shift, and a compact summary of the demo log.
2. Choose the machine and reason, enter a positive duration, optionally add a note, and save.
3. See an inline success message with the saved event and a recent-events list.
4. Invalid duration or missing required fields produce specific inline errors without losing input.
5. Review the two labeled sample events for handoff context; Reset demo clears them and shows the empty state.

Events are saved only in the browser for demonstration. Two clearly labeled sample events provide realistic context on a fresh visit. There is no shared backend, account, or claim of live integration. The layout must remain comfortable at narrow widths and usable on desktop.

## Design rationale

The form uses large touch targets, plain labels, minimal fields, and one prominent bottom action. Recent entries help Alex verify the log took effect. The mobile experience keeps navigation secondary to the task.
