/**
 * Next remounts a template on every navigation, so this is where the page
 * transition lives. The header and footer sit in the layout and are untouched by
 * it — the chrome holds still and only the content changes, which is what makes a
 * multi-page site read as one application rather than eleven documents.
 *
 * Deliberately CSS-only. The View Transitions API would allow shared-element
 * morphs, but its Next integration is still experimental and a hard dependency on
 * an unstable API is not worth a cross-fade.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
