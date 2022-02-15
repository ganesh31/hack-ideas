import { PlusSmIcon } from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import invariant from "tiny-invariant";
import { getAllHacks, updateHack } from "../../api/hack/hack";
import { getAllTags } from "../../api/tag/tag";
import Card from "../../components/card/Card";
import Textfield from "../../components/textfield/Textfield";
import { Hack } from "../../types/hack";
import { Tag } from "../../types/tag";
import { User } from "../../types/user";

interface Props {
  user: User | null;
}

const filterBySearchText = (searchText: string, allHacks: Hack[]) => {
  return allHacks.filter(({ title }) => {
    return searchText === ""
      ? true
      : title.toLowerCase().includes(searchText.toLowerCase());
  });
};

const Hacks: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const [allHacks, setAllHacks] = useState<Hack[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const [searchText, setSearchText] = useState("");

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

  const memoizedFilterHacks = useMemo(
    () => filterBySearchText(searchText, allHacks),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchText, allHacks]
  );

  return (
    <div className=" flex flex-col items-center">
      <div className=" grid-cols-auto-fit grid w-full gap-2 mb-5">
        <div className="flex flex-col space-y-1">
          <Textfield
            name="search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search By Title"
            noLabel
          />
        </div>
      </div>
      <div className="flex w-full mb-2">
        {props.user && (
          <div className="flex self-end justify-end w-full">
            <Link to="/add">
              <div
                data-testid="addHack"
                className="shadow-slate-400 text-slate-800 active:bg-slate-600 hover:bg-slate-400 bg-slate-50 min-w-[80px] flex items-center justify-center py-1 px-2 rounded shadow"
              >
                <PlusSmIcon className="w-5 h-5" />
                <span className="lg:block whitespace-nowrap hidden">
                  Add New Hack
                </span>
                <span className="lg:hidden block">Add</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      <section className="grid-cols-auto-fit grid w-full gap-2">
        {memoizedFilterHacks.length > 0 ? (
          memoizedFilterHacks.map((hack) => {
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
