# nocurl

This is a CLI tool for sending API requests over the web from a terminal without needing to remember complex commands.

## Installation

1. Open terminal in root directory

2. Install the NPM package

    ```
    npm i -g nocurl
    ```

3. In windows might need to run 

    ```
    Set-ExecutionPolicy RemoteSigned -Scope Process
    ```

4. Initialise the package

    ```
    nocurl -i
    ```

And it is ready to use

## Features

- Supported in All Systems and Terminals (CMD, PS, bash, sh, zsh)

- Supports Basic auth and OAuth2.0 with client credentials

- Save Requests and Use them later

- Use Auth Mechanism of other saved request in new request

- HTTP methods: GET POST PUT PATCH DELETE

- Body Type: JSON XML Text

- Headers: Any number of headers as key value pairs

- See the full description of Request or Auth mechanism in the terminal

## Sample commands

- Send a new Request

    ```
    nocurl -r
    ```

- Execute an existing request

    ```
    nocurl -n <name>
    ```

- List a saved Request

    ```
    nocurl -lr
    ```

- List a saved Auth mechanism

    ```
    nocurl -la
    ```