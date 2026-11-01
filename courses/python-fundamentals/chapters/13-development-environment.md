---
title: 'Development environment and machine setup'
order: 13
description: 'Install Python, create a project, and isolate its packages in a virtual environment.'
tryItUrl: 'https://www.programiz.com/python-programming/online-compiler/'
---

## Install and check Python

Get Python 3 from the [official downloads page](https://www.python.org/downloads/) or an approved package manager for your operating system. Open a terminal and check the installed interpreter:

```bash
python3 --version
```

On Windows, `py --version` is also commonly available. The command name differs by installation; use the same interpreter consistently when creating the environment and running the project.

## Create an isolated project environment

From the project directory, create a `.venv` environment:

For a step-by-step guide to creating, activating, using, and recreating virtual environments on macOS, Linux, and Windows, see [Python Virtual Environments: A Practical Guide to `.venv`](/blogs/python-virtual-environments).

```bash
# macOS or Linux
python3 -m venv .venv
source .venv/bin/activate
```

```powershell
# Windows PowerShell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Activation commands vary by shell. Once activated, `python -m pip install package-name` installs into that environment. Use `deactivate` to leave it. Add `.venv/` to `.gitignore`; keep project code and dependency instructions outside the environment so you can recreate it.

## Editor and project layout

Use an editor that can select the project's Python interpreter. A simple project might look like this:

```text
my-project/
    .venv/
    .gitignore
    main.py
    tests/
```

Do not commit the environment directory. It contains machine-specific files and can be recreated from the project's documented dependencies.

**Exercise:** Create a folder, make a virtual environment in it, activate it, and run `python --version` and `python -m pip --version`. Then deactivate it.

**Sources:** [Python downloads](https://www.python.org/downloads/), [Python Tutorial: Virtual Environments and Packages](https://docs.python.org/3/tutorial/venv.html), [Python `venv` reference](https://docs.python.org/3/library/venv.html), [Python Virtual Environments: A Practical Guide to `.venv`](/blogs/python-virtual-environments)
