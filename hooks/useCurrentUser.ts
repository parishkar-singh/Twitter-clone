import useSWR from 'swr'
import fetcher from '@/libs/fetcher'
const useCurrentUser = () => {
    const {data, error, mutate} = useSWR('/api/current', fetcher)
    return {
        user: data,
        isLoading: !error && !data,
        error,
        mutate
    }
}
export default useCurrentUser
