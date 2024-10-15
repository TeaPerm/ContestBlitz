import InfoCard from "@/Components/InfoCard";
import StatCard from "@/Components/StatCard";
import { ModeToggle } from "@/Components/mode-toggle";
import BaseLayout from "@/Layouts/BaseLayout";
import { Head, usePage } from "@inertiajs/react";
import { MapPinned, PersonStanding, Swords, Users } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const index = ({ characterCount, auth, contestCount, placeCount }) => {
    const { flash } = usePage().props;

    useEffect(() => {
        switch (flash.message) {
            case "login":
                toast.success("Succesful login!");
                break;
            }
        }, [flash]);

        return (

            <BaseLayout user={auth.user}>
            <h1>Welcome to the Home page!</h1>
            <div className="mt-2 mb-4">
                <InfoCard
                    title="Introduction"
                    description="Welcome to our dynamic gaming hub, where adrenaline-pumping battles and immersive worlds collide! Powered by Laravel, our platform offers a customizable playground for gamers to sculpt their ultimate gaming experiences. Dive into a universe where users reign supreme, forging alliances, and challenging rivals with a roster of unique characters, each wielding a formidable blend of skills and strengths. From epic contests to breathtaking locales, every click unveils new dimensions of excitement and strategy. Join us on this exhilarating journey, where the boundaries of gaming are yours to push and conquer!"
                    buttonTitle="Login"
                    className="col-span-3"
                    buttonRoute="login"
                    user={auth.user}
                />
            </div>
            <div className="grid grid-cols-3 gap-4 ">
                <StatCard
                    IconComponent={PersonStanding}
                    cardTitle="Characters"
                    cardCount={characterCount}
                    cardContent="Many more to come.."
                />
                <StatCard
                    IconComponent={Swords}
                    cardTitle="Contests"
                    cardCount={contestCount}
                    cardContent="Many more to come.."
                />
                <StatCard
                    IconComponent={MapPinned}
                    cardTitle="Places"
                    cardCount={placeCount}
                    cardContent="Many more to come.."
                />
            </div>
        </BaseLayout>
    );
};

export default index;
