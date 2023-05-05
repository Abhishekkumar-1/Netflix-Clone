import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useFavorites=()=>{
    const {data,
        error,
        isLoading,
        mutate
    }= useSWR('/api/favourites',fetcher,{
        revalidateIfStale:false,
        revalidateOnFocus:false,
        revalidateOnReconnect:false,
    });

    return {
        data,error,isLoading,mutate
    }
};

export default useFavorites;