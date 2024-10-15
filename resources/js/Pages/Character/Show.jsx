import BaseLayout from "@/Layouts/BaseLayout";
import React from "react";
import ContestTable from "@/Components/ContestTable";
import CharacterStats from "@/Components/CharacterStats";
import { usePage } from "@inertiajs/react";

const Show = ({ auth }) => {

    const { character,contests } = usePage().props;


    return (

        <BaseLayout user={auth?.user}>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">

            <ContestTable contests={contests} character={character}/>
                </div>
            <CharacterStats character={character}/>
            </div>
        </BaseLayout>
    );
};

export default Show;

