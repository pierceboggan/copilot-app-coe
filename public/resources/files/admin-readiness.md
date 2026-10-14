# Admin readiness package

Use this package to brief GitHub admins and security partners before pilot users install the Copilot app. It has four parts: a settings and controls checklist, a field slide deck outline, an admin webinar agenda and a follow-up email.

Items marked TODO are not covered by GitHub documentation yet. Check the linked docs again before you send this.

---

## 1. Settings and controls checklist

### Access

- [ ] Pilot users have Copilot seats.
- [ ] Organization policies reviewed for Copilot cloud agent, automations and storing local sessions in the cloud.
- [ ] Decision recorded on which features each rollout ring may use.
- [ ] **GitHub Copilot app** policy confirmed. It is on by default for Copilot Business and Enterprise and is separate from the Copilot CLI policy.
- [ ] Policies that also apply to the app reviewed: **Configure custom models**, **MCP servers in Copilot**, **Restrict MCP access to registry servers**, **Content exclusion** and model availability. See [Supported surfaces for policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies).

### Sign-in

- [ ] Confirm which host pilot users sign in to: GitHub.com or GitHub Enterprise Cloud with data residency (GHE.com, through **Use GitHub Enterprise**).
- [ ] GitHub Enterprise Server users told the app does not support GHES today.
- [ ] SSO and SAML authorization tested with a pilot account.

### Repository configuration

- [ ] `.github/github-app.yml` added to `CODEOWNERS` in pilot repositories.
- [ ] Reviewers know scripts in the file run with GitHub credentials.

### Sandboxes

- [ ] Default sandbox chosen for each pilot repository: local sandbox or cloud sandbox.
- [ ] Network allow list written down for builds that need registries or internal services.

### Automations, connectors and MCP servers

- [ ] Approver named for cloud automation write access.
- [ ] Approved connector list published (for example Sentry, WorkIQ for Microsoft 365, or an MCP server your team runs).
- [ ] Microsoft 365 tenant admin has enabled the integration before users connect work data, for example through the WorkIQ plugin. TODO: tenant prerequisites are not documented by GitHub; ask your Microsoft 365 admin.
- [ ] Review process in place for new MCP server requests.

### Restricted networks

- [ ] Required endpoints allowed through proxies and firewalls. See the [Copilot allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference).
- [ ] Bring-your-own-key (public preview) reviewed for teams that must route models to their own provider. See [Adding LLM models to the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/use-byok-models).

---

## 2. Field slide deck outline (10 slides)

1. **Title.** Copilot app at <Company>: admin briefing.
2. **What the app is.** Desktop app for agent-driven development. Parallel sessions, each isolated on its own branch.
3. **What changes for admins.** New surface for existing Copilot seats. Same policies plus a few new ones.
4. **Where code runs.** Local working tree, local sandbox or GitHub-hosted cloud sandbox. Diagram of each.
5. **Repository configuration.** What `.github/github-app.yml` can do, the accept-before-apply prompt, and why it needs code owner review.
6. **Automations.** Scheduled and event-driven prompts. Tool selection and least privilege.
7. **Connectors and MCP.** What data leaves GitHub, how each one authenticates, approval process.
8. **Rollout rings.** CoE, pilot, early adopters, general availability. Who moves to the next ring and when.
9. **What we measure.** Activation funnel and outcome metrics. Team-level only.
10. **Asks.** Policy decisions needed this week, owner and date for each.

---

## 3. Admin webinar agenda (45 minutes)

| Time | Segment | Owner |
| --- | --- | --- |
| 0:00 | Why we are rolling out the app and the outcome we expect | Sponsor |
| 0:05 | Live demo: issue to pull request with Plan mode | Champion |
| 0:15 | Live demo: cloud automation with narrowed tools | Champion |
| 0:22 | Settings and controls walkthrough, using the checklist above | Admin |
| 0:32 | Repository configuration and sandbox defaults | Security partner |
| 0:38 | Open questions | Everyone |
| 0:43 | Decisions and owners | CoE lead |

Record the session for admins in other time zones.

---

## 4. Follow-up email

**Subject:** Copilot app admin briefing: decisions and next steps

Hi all,

Thanks for joining the Copilot app admin briefing. The recording and slides are here: <link>.

Decisions we made:

- <decision> (owner, date)
- <decision> (owner, date)

Still open:

- <question> (owner, due date)

Next steps: the pilot cohort starts on <date>. Champions will run the first office hours on <date>. Questions go to <channel>.

Thanks,
<CoE lead>
