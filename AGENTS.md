<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Public content routes show an empty session-aware workspace; private data comes only from authenticated server functions and RLS.
- Use a shared Trip Log workspace for transport pages; leaf routes own unique head metadata.
- Staff credentials live in Cloud Auth, roles in user_roles, and staff display fields in staff_accounts; do not persist PINs in application tables.
- Master admin roles are provisioned out of band for an owner-confirmed email, never by public first-user signup.
- Writes to log_entries go through add_log, which serializes vehicle/date/kind and requires duplicate confirmation; generated fuel columns preserve entry-time price snapshots.
- PDF generation rasterizes the Bengali report in the browser; native file sharing is used when available and file download otherwise.
- Route schedule numbers use the existing `master_data.priority_order` field; trips with the same number share chronological grouping and serials, while legacy unnumbered routes remain name-sorted.
