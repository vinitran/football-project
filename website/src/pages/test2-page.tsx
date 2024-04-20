
import { useAxios } from '../hooks/use-axios';
import { useState } from "react"

export const Test2Page = ()=> {
    const [pagination, setPagination] = useState({})
    const [{ data, loading }, refetch, cancelRequest] = useAxios({
      url: '/users?delay=5',
      params: { ...pagination }
    })
  
    const handleFetch = () => {
      setPagination({ per_page: 2, page: 2 })
    }
  
    const externalRefetch = async () => {
      try {
        await refetch()
      } catch (e) {
        // Handle cancellation
      }
    }
  
    return (
      <div className="flex gap-2">
        <button onClick={handleFetch}>refetch</button>
        <button onClick={externalRefetch}>External Refetch</button>
        <button disabled={!loading} onClick={cancelRequest}>
          Cancel Request
        </button>
        {loading && <p>...loading</p>}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }