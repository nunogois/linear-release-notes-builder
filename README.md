# linear-release-notes-builder

Generate release notes based on Linear roadmaps.

For example, release notes for 2.0 roadmaps (all roadmaps that include the string "2.0"):

```bash
bun run index.ts 2.0
```

You can optionally specify the prompt sent to ChatGPT:

```bash
bun run index.ts 2.0 "Make release notes in the format of a poem with the following items"
```

You should set the following environment variables:

- `LINEAR_API_KEY` - Personal api token generated from https://linear.app/settings/api
- `OPENAI_API_KEY` - OpenAI API token generated from https://beta.openai.com/account/api-keys

Optionally, you can set the OpenAI model to use:

- `OPENAI_MODEL=gpt-4`

---

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
