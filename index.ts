import { fetchRoadmapProjects, fetchRoadmaps } from './api/linear'
import { processData, sendPrompt } from './api/openai'

const DEFAULT_PROMPT =
  'Generate markdown release notes. Arrange the GA features first, followed by the Beta features. Mark the Beta features section clearly. Here are the details:'

const main = async (roadmap?: string, prompt = DEFAULT_PROMPT) => {
  if (!roadmap)
    throw new Error(
      'Requires an argument. Please provide a roadmap search string.'
    )

  const roadmaps = await fetchRoadmaps(roadmap)
  const roadmapProjects = await fetchRoadmapProjects(roadmaps)
  const processedData = await processData(prompt, roadmapProjects)

  const releaseNotes = await sendPrompt(processedData)
  console.log(releaseNotes)
}

main(Bun.argv[2], Bun.argv[3])
