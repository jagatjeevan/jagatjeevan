---
title: 'The .venv Guide'
date: '2026-11-01'
description: 'Create and use a project-specific Python environment, install dependencies safely, and make the setup easy to recreate.'
tags: ['python', 'virtual environments']
---

## Why use a virtual environment?

Different Python projects can depend on different versions of the same package. Installing every dependency into one shared Python environment makes those projects harder to manage independently.

A virtual environment gives a project its own set of installed packages. It is created from an existing Python installation, and its packages are isolated from the base installation by default. Python's built-in `venv` module is enough for many projects; you do not need a third-party tool just to get started.

## Create an environment

From your project directory, create an environment named `.venv`:

```bash
# macOS or Linux
python3 -m venv .venv
```

On Windows, use the Python launcher in PowerShell or Command Prompt:

```powershell
py -m venv .venv
```

The command uses the Python interpreter you invoked. If you have more than one Python version installed, choose the one your project needs, for example `python3.12 -m venv .venv` where that command is available.

## Activate it

Activation adjusts your shell so commands such as `python` and installed command-line tools resolve to the environment.

```bash
# macOS or Linux, using bash or zsh
source .venv/bin/activate
```

```powershell
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
```

```bat
:: Windows Command Prompt
.\.venv\Scripts\activate.bat
```

The shell prompt may show `(.venv)` after activation. To confirm which interpreter will run, check its path:

```bash
python -c "import sys; print(sys.executable)"
```

The result should point inside your project's `.venv` directory. On Windows, PowerShell may block activation scripts under its current execution policy; see Python's [venv documentation](https://docs.python.org/3/library/venv.html) for the platform-specific note.

## Install and record project dependencies

With the environment active, install packages using that environment's Python:

```bash
python -m pip install requests
```

Using `python -m pip` helps ensure that `pip` runs under the same interpreter as your `python` command.

For a simple way to capture the installed packages and recreate them later:

```bash
python -m pip freeze > requirements.txt
python -m pip install -r requirements.txt
```

The first command writes the installed package versions to a file; the second installs the listed packages into the currently active environment. Keep `requirements.txt` with your project, but do not commit the `.venv` directory. Add `.venv/` to your `.gitignore` if it is not already ignored.

## Work without activating

Activation is convenient, but it is not required. You can call the environment's interpreter directly:

```bash
# macOS or Linux
.venv/bin/python -m pip install requests
.venv/bin/python app.py
```

```powershell
# Windows PowerShell
.\.venv\Scripts\python.exe -m pip install requests
.\.venv\Scripts\python.exe app.py
```

This is useful in scripts and tools that let you select a Python interpreter explicitly.

## Deactivate or recreate

When you are finished in an activated shell, leave the environment with:

```bash
deactivate
```

Virtual environments are meant to be disposable. Their installed scripts can refer to the environment's absolute path, so moving or copying the directory is not a reliable way to reuse it. If the project moves or the environment becomes inconsistent, create it again and reinstall the dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

Use the corresponding Windows creation and activation commands if you are on Windows.

## A quick checklist

- Create one environment per project, typically named `.venv`.
- Activate it before installing packages, or explicitly run its Python executable.
- Save dependency information in a project file such as `requirements.txt`.
- Ignore the environment directory in Git; recreate it rather than committing or moving it.

## References

- [Python `venv` documentation](https://docs.python.org/3/library/venv.html)
- [Hostinger: How to Create a Virtual Environment in Python](https://www.hostinger.com/in/tutorials/how-to-create-a-python-virtual-environment/)
