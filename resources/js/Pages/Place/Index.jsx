import CreateButton from '@/Components/CreateButton';
import PlaceCard from '@/Components/PlaceCard';
import { Button } from '@/Components/ui/button';
import BaseLayout from '@/Layouts/BaseLayout';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const Index = ({auth,places}) => {

    const { flash } = usePage().props;
    console.log(flash)

    useEffect(() => {
        switch (flash.message) {
            case "places.created":
                toast.success("Place has been created!");
                break;
            case "places.deleted":
                toast.error("Place has been deleted!");
                break;
            case "places.edited":
                toast.info("Place has been edited!");
                break;
        }
    }, [flash]);

  return (
    <BaseLayout user={auth?.user}>
        <div className='flex justify-between mb-4 items-center'>
            <h1>
                You can see the beautiful places.
            </h1>
            <CreateButton createNew='places' buttonTitle="Create new place"/>
        </div>
        <div className='grid grid-cols-3 gap-8'>

      {places.map((place)=>(
          <PlaceCard placeImage={place.image} placeDescription={place.description} placeName={place.name} enableDropdown placeId={place.id} key={place.id} user={auth.user}/>
        ))}
        </div>
    </BaseLayout>
  )
}

export default Index



