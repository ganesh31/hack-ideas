import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import invariant from "tiny-invariant";
import { getAllHacks, updateHack } from "../../api/hack/hack";
import { getAllTags } from "../../api/tag/tag";
import Card from "../../components/card/Card";
import { Hack } from "../../types/hack";
import { Tag } from "../../types/tag";
import { User } from "../../types/user";

interface Props {
  user: User | null;
}

const Hacks: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const [allHacks, setAllHacks] = useState<Hack[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetch() {
      const hacks = await getAllHacks();
      invariant(hacks, "no hacks available");
      setAllHacks(hacks);

      const tags = await getAllTags();
      invariant(tags, "no tags available");
      setAllTags(tags);
    }
    fetch();
  }, []);

  const onToggleLike = async (hackId: number) => {
    const hack = allHacks.find(({ id }) => id === hackId);

    if (!hack) {
      throw new Error("unknown hack");
    }

    if (!props.user) {
      navigate("/login", { state: { redirectTo: "/hacks" } });
      return;
    }

    const updatedHack = await updateHack(hackId, props.user.id);

    if (updatedHack?.status === 200) {
      const hacks = await getAllHacks();
      invariant(hacks, "no hacks available");
      setAllHacks(hacks);
    }
  };

  return (
    <div className=" flex flex-col items-center">
      <section className="grid-cols-auto-fit grid w-full gap-2">
        {allHacks.length > 0 ? (
          allHacks.map((hack) => {
            return (
              <Card
                data-testid="hack"
                key={hack.id}
                allTags={allTags}
                hack={hack}
                onToggleLike={onToggleLike}
              />
            );
          })
        ) : (
          <>
            <h1 className="text-center font-semibold ">
              Sorry no hacks are currently available.
            </h1>
            <p className="italic text-center">
              Waiting for someone to add some hacks
            </p>
          </>
        )}
      </section>
    </div>
  );
};

export default Hacks;
