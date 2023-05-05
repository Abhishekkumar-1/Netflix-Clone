import axios from 'axios';
import React,{useCallback,useMemo} from 'react';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';

import { AiOutlinePlus,AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps{
    movieId:string;
}

const FavoriteButton: React.FC<FavoriteButtonProps>=({movieId})=>{
    const {mutate:mutateFavorites}=useFavorites();

    const {data:currentUser,mutate}=useCurrentUser();

    const isFavorite=useMemo(()=>{
        const list=currentUser?.favoriteIds || [];

        return list.includes(movieId);
    },[currentUser,movieId]);

    const toogleFavorites=useCallback(async()=>{
        let response;

        if(isFavorite){
            response=await axios.delete('/api/favourite',{data:{movieId}});
        }
        else{
            response=await axios.post('/api/favourite',{movieId});
        }

        const updatedFavouriteIds=response?.data?.favoriteIds;

        mutate({
            ...currentUser,
            favoriteIds:updatedFavouriteIds
        });

        mutateFavorites();
    },[movieId,isFavorite,mutate,currentUser,mutateFavorites]);

    const Icon=isFavorite?AiOutlineCheck:AiOutlinePlus;

    return (
        <div className='
        cursor-pointer
        group/item
        w-6
        h-6
        lg:w-10 lg:h-10
        border-white
        border-2
        rounded-full
        flex
        justify-center
        transition hover:border-neutral-300'
        onClick={toogleFavorites}
        >
            <Icon className='text-white lg:mt-0.5' size={30}/>
        </div>
    )
}

export default FavoriteButton;