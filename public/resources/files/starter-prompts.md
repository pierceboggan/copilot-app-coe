# Starter prompt library

Concrete prompts new users can run on day one. Replace anything in angle brackets. Each prompt lists the mode to use.

## First session (any role)

**Plan mode.** Read the linked issue and the code it touches. Propose a plan that lists the files you will change, the approach, and the tests you will add or update. Wait for my approval before writing code.

**Interactive mode.** Explain how this repository is organized. Name the five most important directories, how to build and test, and where a new contributor should start.

**Interactive mode.** List my open pull requests in this repository with CI status, unresolved review threads and merge conflicts. Put anything that needs my action first.

## One prompt per canvas

**Editor canvas (Markdown).** Open an editor canvas with a one-page project brief for <project>: goal, users, scope, non-goals, risks and open questions. I will edit it with you.

**Browser canvas.** Start the dev server and open the home page in the browser canvas. Check the page at mobile and desktop widths and list any layout problems you see.

**Excel canvas.** Open the attached CSV in an Excel canvas. Add a summary row, a pivot by <column> and a chart of the top five values. Explain each formula you add.

**Word canvas.** Create a Word document that turns the notes below into a one-page memo with a summary, decisions, open questions and next steps.

**PowerPoint canvas.** Create a five-slide PowerPoint deck from the brief above: title, problem, solution, plan and ask. Add speaker notes to each slide.

**Terminal canvas.** Open a terminal canvas and run the test suite in watch mode so I can see failures as you fix them.

## Parallel work

**Plan mode.** Split this into separate child sessions that run at the same time: (1) <first task>, (2) <second task>, (3) <third task>. Tell me as each one finishes, with a one-line summary and a link.

**Autopilot mode, after a plan.** /fleet Implement the approved plan. Run independent steps in parallel and summarize what each subagent changed.

**Plan mode, several repositories.** /orchestrate Make <change> in <repo A> first, then update <repo B> and <repo C>. One child session per repository, one pull request each.

## Daily habits

**Automation, daily.** Review issues opened in the last 24 hours. Suggest a label for each, flag likely duplicates with links and list any missing reproduction steps.

**Automation, weekly.** Draft this week's team update from merged pull requests and closed issues. Keep it under 250 words.

**Interactive mode.** /security-review

## Good prompt habits

- Name the files, the constraint and how you will judge success.
- Ask for a plan first when the approach is open.
- Ask the agent to show its work: commands run, tests passed, sources used.
- Keep one task per session.
