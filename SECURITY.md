# Security Policy

## Supported Surface

This repository mainly contains:

- public documentation
- helper scripts
- a pinned `grok-cli` submodule reference

Security-sensitive issues may affect either this wrapper repository or the underlying `grok-cli` snapshot.

## Reporting

Please report security concerns privately through the GitHub security advisory flow for this repository or by contacting the maintainers through GitHub before opening a public issue.

When reporting, include:

- whether the issue is in the wrapper repo or the `grok-cli` submodule
- the affected file or command path
- reproduction steps
- whether secrets, tokens, or personal identifiers may leak

## Secret Handling

Do not commit:

- `.env` files
- repo-local `.grok/`
- pairing codes
- helper logs
- personal `~/.grok/` runtime files
