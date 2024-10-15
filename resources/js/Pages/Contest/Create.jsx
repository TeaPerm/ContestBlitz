import CharacterStats from "@/Components/CharacterStats";
import { Button } from "@/Components/ui/button";
import BaseLayout from "@/Layouts/BaseLayout";
import { usePage } from "@inertiajs/react";
import React from "react";

const Create = ({ auth , userCharacters}) => {

    const{errors} = usePage().props;

    return (
        <BaseLayout user={auth.user}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {userCharacters.map((character)=>(
                    <CharacterStats enableView={true} key={character.id} character={character}/>
                ))}
            </div>
        </BaseLayout>
    );
};

export default Create;
