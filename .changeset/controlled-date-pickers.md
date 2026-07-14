---
'@rtorcato/shadcn-ui': minor
---

Make `DatePickerWithPresets` and `DatePickerWithRange` controllable. Both now
accept `value` / `onChange` (controlled) and `defaultValue` (uncontrolled), and
`DatePickerWithPresets` takes a configurable `presets` array. `DatePickerWithRange`
no longer defaults to a hardcoded Jan 2022 range — it starts empty unless a
`value` or `defaultValue` is provided.
