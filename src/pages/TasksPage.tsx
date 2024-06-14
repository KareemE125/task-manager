import Task from '@/components/task/Task'
import AsyncGridList from '@/components/shared/AsyncGridList'
import useCacheApiCall from '@/hooks/useCacheApiCall'
import { getTasks } from '@/store/taskSlice'
import { useAppSelector } from '@/store/store'
import CreateTask from '@/components/task/CreateTask'


  
export default function TasksPage() {  
  
  const tasks = useAppSelector((state) => state.task)

  useCacheApiCall(getTasks, tasks.lastFetch)

  return (
    <main>
      <CreateTask />
      <AsyncGridList
        view='list'
        list={tasks.list} 
        loading={tasks.loading} 
        error={tasks.error}
        Component={Task} 
      />
    </main>
  )
}
