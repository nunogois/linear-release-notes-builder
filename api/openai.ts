import OpenAI from 'openai'
import type { RoadmapProject } from './linear'

const openai = new OpenAI({
  apiKey: Bun.env.OPENAI_API_KEY
})

export const processData = async (
  prompt: string,
  roadmapProjects: RoadmapProject[]
): Promise<string> => {
  const processedData = await Promise.all(
    roadmapProjects.map(async ({ roadmap, projects }) => {
      const processedProjects = await Promise.all(
        projects.map(async project => {
          return `## ${project.name.replace(/\[[^>]+\]/g, '').trim()}\n### ${
            project.description
          }`
        })
      )
      return `# ${roadmap}\n${processedProjects.join('\n')}`
    })
  )
  return `Provide only the requested output. ${prompt}\n${processedData.join(
    '\n\n'
  )}`
}

export const sendPrompt = async (prompt: string) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: Bun.env.OPENAI_MODEL || 'gpt-3.5-turbo'
  })

  return chatCompletion.choices[0].message.content
}
