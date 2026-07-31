import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { getProjects, createProject as createProjectApi, updateProject as updateProjectApi, deleteProject as deleteProjectApi } from '../services/projectService'
import { clients as clientData } from '../data/dummyData'
import { useAuth } from './AuthContext'
const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  const fetchProjects = useCallback(async () => {
    if (!isAuthenticated) {
      setProjects([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const data = await getProjects()
      setProjects(data)
    } catch (e) {
      console.error('Failed to fetch projects', e)
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const addProject = async (payload) => {
    const created = await createProjectApi(payload)
    setProjects((prev) => [created, ...prev])
    return created
  }

  const editProject = async (id, payload) => {
    const updated = await updateProjectApi(id, payload)
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
    return updated
  }

  const removeProject = async (id) => {
    await deleteProjectApi(id)
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <DataContext.Provider
      value={{ projects, clients: clientData, loading, addProject, editProject, removeProject, refresh: fetchProjects }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => useContext(DataContext)
