# Copilot app FAQ

Edit the bracketed answers for your organization.

**Is it approved?**
Yes, for <scope>. It uses your existing Copilot seat.

**How is it different from Copilot in my editor?**
The app runs several agent sessions at once, each on its own branch, and covers the whole path from issue to pull request. Your editor is still the best place for hands-on coding. See the "which tool when" guide at <link>.

**Where does my code run?**
In a new working tree on your machine, in your local repository, or in a GitHub-hosted cloud sandbox. Your team's default is <default>.

**Can it change my main branch?**
Sessions in a new working tree work on their own branch. Review the diff before you open a pull request.

**What is `.github/github-app.yml`?**
A repository file that tells sessions how to set up and run the project. Its scripts run with your GitHub credentials, so the app asks you to review and accept it first.

**Can I use it without a repository?**
Yes. Chats need no branch or working tree, and you can create Word, PowerPoint and Excel files in canvases.

**Where do generated files go?**
They stay on your machine until you move them. To share one, save it to your usual file share, such as OneDrive or SharePoint. Keep a copy in the session if you want to keep iterating on it with the agent.

**Which connectors can I use?**
Those on the approved list at <link>. Request others in <channel>.

**Can I put secrets in a prompt?**
No. Never put secrets in prompts, deep links or automations.

**The app crashed or hung. What should I do?**
Post what you were doing and the time in <channel>. Champions review reliability reports in office hours.

**Who do I ask for help?**
Your team champion first, then office hours on <day and time>.
