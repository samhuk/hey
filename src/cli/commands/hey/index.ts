import axios from 'axios'
import { createGFError, GFResult } from 'good-flow'
import { baseCommand } from '../base'

const URL_PREFIX = 'https://api.openai.com/v1/chat/completions'

type Config = { apiKey: string }

type CliArgsOptions = { text: string }

const completeChat = async (text: string, config: Config): Promise<GFResult<string>> => {
  try {
    const res = await axios.post(
      URL_PREFIX,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: text },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
          "User-Agent": 'insomnia/2022.7.5',
        },
         
      },
    )
    return [res.data.choices[0].message.content]
  }
  catch (e) {
    return [undefined, createGFError({
      msg: 'OpenAI request failed.',
      inner: e,
    })]
  }
}

export const hey = baseCommand<CliArgsOptions>(async args => {
  // -- Validate CLI args
  if (args.text == null || args.text.length === 0) {
    return createGFError({
      msg: 'Invalid CLI argument(s).',
      inner: createGFError(c => `<text> must be defined and not empty. Received: ${c.cyan(args.text)}`),
    })
  }

  // -- Create config
  const config: Config = {
    apiKey: process.env.OPENAI_API_KEY,
  }

  // -- Validate config
  if (config.apiKey == null || config.apiKey.length === 0 || config.apiKey === '[YOUR OPENAI API KEY]') {
    return createGFError({
      msg: 'Invalid configuration.',
      inner: createGFError(c => `The defined OpenAI API key is not valid. Received: ${c.cyan(config.apiKey)}`),
    })
  }

  // -- Complete chat using ChatGPT
  const [response, err] = await completeChat(args.text, config)
  if (err != null)
    return err

  // -- Print response to console
  console.log(response)
  return null
})
