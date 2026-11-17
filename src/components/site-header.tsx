const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <>
      <input aria-label="Toggle navigation" className="mt" id="mt" type="checkbox" />
      <header>
        <div className="wrap bar">
          <a aria-label="Ambika G — home" className="logo" href="#top">
            Ambika <span>G</span>
          </a>
          <label aria-label="Open or close menu" className="burger" htmlFor="mt" role="button">
            <i aria-hidden="true" />
            <i aria-hidden="true" />
          </label>
          <nav aria-label="Primary">
            <ul>
              {navigation.map((item) => (
                <li key={item.label}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
