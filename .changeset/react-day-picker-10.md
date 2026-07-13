---
"@rtorcato/shadcn-ui": patch
---

Upgrade `react-day-picker` to v10. Adapts the `Calendar` component to the v10 API: the `table` class-names key is now `month_grid`, and the custom `WeekNumber` slot no longer leaks the `week` prop onto the DOM. No visible behavior change.
