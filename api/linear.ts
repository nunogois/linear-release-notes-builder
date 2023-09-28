import { LinearClient, Project, Roadmap } from '@linear/sdk'

const linearClient = new LinearClient({ apiKey: Bun.env.LINEAR_API_KEY })

export interface RoadmapProject {
  roadmap: string
  projects: Project[]
}

export const fetchRoadmaps = async (roadmap: string): Promise<Roadmap[]> => {
  const allRoadmaps = await linearClient.roadmaps()
  return allRoadmaps.nodes.filter(({ name }) => name.includes(roadmap))
}

export const fetchRoadmapProjects = async (
  roadmaps: Roadmap[]
): Promise<RoadmapProject[]> => {
  const roadmapProjects = await Promise.all(
    roadmaps.map(async roadmap => ({
      roadmap: roadmap.name,
      projects: (await roadmap.projects()).nodes
    }))
  )
  return roadmapProjects
}
