# Hey

A Node.js CLI application that interfaces with OpenAI's `chat-gpt-3.5-turbo` model.

## Setup

Clone this repository.

Run `npm i`.

Enter your OpenAI API key into `.env-cmdrc.json`. If you need one, you need to have/create an OpenAI account, login, and go to https://platform.openai.com/account/api-keys to generate one.

## Building

Run `npm run build`

## CLI Reference

### `hey`

This is a command that uses OpenAI's Chat Completion feature.

To use it, run: `npm run hey "Say this is a test!"`
