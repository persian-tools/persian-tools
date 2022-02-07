# Contributing to Persian tools steps

First off, thanks for taking the time to contribute!

---

### I. Branch conventions

After forking the repo, create a branch from `develop` with the below structure:

1. Use grouping tokens as prefixes separated with a slash:

    - **feature/*** feature or feature set
    - **bugfix/*** resolves an issue
    - **refactor/*** refactor a piece of code
    - **hotfix/*** resolves an important issue
    - **release/*** prepare release

2. Add a short descriptor of the task:

    >Use kebab-case style with imperative tense.
    - feature/**add-main-header**
    - fix/**change-main-header-color**

---

### II. Commits conventions

The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Real world examples can look like this:

```
chore: run tests on travis ci
```
```
fix(server): send cors headers
```
```
feat(blog): add comment section
```

>Read [here](https://www.conventionalcommits.org/en/v1.0.0/) for more information about conventions.

---

### III. Create a PR

- Write a pull request title with commit conventions.
- Completely describe your codes in the description (We create a template for this, and you should fill that before sending your PR, add `template=pull_request.md` query at the end of your compare page url.)
- Send your PR to `develop` branch.

---

### IV. Your PR is merged!

Congratulations 🎉🎉 The Persian tools team thanks you ✨.
