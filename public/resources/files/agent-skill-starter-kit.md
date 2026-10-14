# Custom agent and skill starter kit

Two ways to package your team's know-how so every session starts with it.

- **Custom agents** are specialists you can hand a task to, such as a reviewer that knows your standards.
- **Skills** are reusable instructions and files the agent loads when a task matches.

Custom agents go in `.github/agents/` and skills in `.github/skills/<name>/` in a repository. A person can also keep skills in `~/.copilot/skills/`. To ship the same set to many repositories, package it as a plugin (see the end of this file).

---

## Custom agent: `.github/agents/reviewer.agent.md`

```markdown
---
name: team-reviewer
description: Reviews changes against our team's standards before a pull request is opened.
---

You review code changes for this repository.

Check, in order:
1. Tests cover the change and pass.
2. Public APIs have docs.
3. No secrets, credentials or customer data in code or fixtures.
4. Errors are handled, not swallowed.

Report only issues you are confident about. For each one, give the file, the line and a suggested fix.
Do not comment on style that the linter already enforces.
```

---

## Skill: `.github/skills/release-notes/SKILL.md`

```markdown
---
name: release-notes
description: Use when writing release notes or a changelog from merged pull requests.
---

1. List pull requests merged since the last release tag.
2. Skip changes labeled `internal` or touching only tests.
3. Group the rest into New, Improved and Fixed.
4. Write each entry for customers in one sentence and link the pull request.
5. Put breaking changes first under a "Breaking" heading.
```

---

## Tips

- Keep each agent or skill to one job. Small, sharp instructions beat long ones.
- Write the description for the agent that decides when to use it: say when it applies.
- Review agents and skills like code. Add them to `CODEOWNERS`.

---

## Package it as a plugin

When many repositories need the same agents and skills, bundle them as one plugin in a private marketplace repository the CoE owns:

```
your-org/copilot-plugins
├── marketplace.json
└── plugins/
    └── starter-kit/
        ├── plugin.json
        ├── agents/reviewer.agent.md
        └── skills/release-notes/SKILL.md
```

`marketplace.json` lists each plugin and where it lives:

```json
{
  "name": "your-org-plugins",
  "owner": { "name": "Your Organization" },
  "plugins": [{ "name": "starter-kit", "source": "./plugins/starter-kit" }]
}
```

`plugin.json` needs only a kebab-case `name`. By default the runtime looks for agents in `agents/` and skills in `skills/`:

```json
{ "name": "starter-kit", "description": "Shared reviewer agent and release notes skill" }
```

Then register the marketplace for everyone with the `extraKnownMarketplaces` managed setting, and require the plugin with `enabledPlugins`. The Enablement Center's "Customizations and plugin marketplaces" page walks through the policy.

Field reference: [GitHub Copilot CLI plugin reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference). Managed settings keys: [Enterprise managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings).
