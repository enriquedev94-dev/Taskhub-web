
export interface Task {
    id: number
    title: string
    description?: string | null
    project_id: number
    status: string
}