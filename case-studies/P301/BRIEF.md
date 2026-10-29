# P301 — Morning operations dashboard

## User and moment

Maya Chen is the operations director at fictional Northline Works. At the start of a shift, she needs to spot cells below target and assign attention quickly. She is reviewing current operating signals, not producing a formal report.

## Job to be done

See whether production is on pace, identify the most urgent exception, and acknowledge the item she has taken ownership of.

## Data and scope

The demo shows three production cells across day and night shifts. Throughput, first-pass yield, downtime, and active exceptions are invented and intentionally small enough to scan. Filters change the displayed measures and queue. Acknowledging an exception saves its state in this browser.

## Flow and success criteria

1. On arrival, Maya sees shift status, headline metrics, a quantified readout of the output gap, and the exception queue above detailed trends.
2. She filters to a shift and optionally a cell. Metrics, the readout, cell comparison, and queue update together; an empty queue is explained.
3. She opens an exception for context and acknowledges it. It leaves the active queue and the count changes.
4. She can reset the demo to repeat the review.

The page must work at desktop and phone widths, communicate targets and units, avoid color-only status encoding, and offer a clear empty state.

## Design rationale

The hierarchy is status → quantified readout → exception → context. Large, high-contrast numbers support quick scanning; target labels prevent ambiguous performance claims. The readout connects the 225-unit plant gap to the cell driving it, so the director can decide where to look first. Teal conveys stable operation, while coral marks issues requiring action. Compact filter controls match a director's quick morning review.
