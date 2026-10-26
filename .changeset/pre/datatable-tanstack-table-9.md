---
'@rtorcato/shadcn-ui': major
---

Migrate `DataTable` to `@tanstack/react-table` 9 (runtime dependency `^8.21.3` → `^9.3.1`).

- `ColumnDef` is now DataTable's own alias bound to the new exported `DataTableFeatures`; columns typed with TanStack's `ColumnDef` are not assignable.
- `TData` must extend `RowData`.
- v9 renames apply to custom column options (`sortingFn` → `sortFn`) and types (`VisibilityState` → `ColumnVisibilityState`).
- Table rows no longer render `data-state="selected"`.

Plain accessor/header/cell columns typed with `ColumnDef` from `@rtorcato/shadcn-ui/components/ui-extended/data-table` need no change. See "Upgrading from 1.x" in the Data table docs.
