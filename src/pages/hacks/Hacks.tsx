import {
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";
import { useEffect, useMemo, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { Link, useNavigate } from "react-router-dom";
import invariant from "tiny-invariant";
import { getAllHacksAPI, updateHackAPI } from "../../api/hack/hack";
import { getAllTagsAPI } from "../../api/tag/tag";
import Card from "../../components/card/Card";
import Textfield from "../../components/textfield/Textfield";
import { Hack } from "../../types/hack";
import { Tag } from "../../types/tag";
import { User } from "../../types/user";

interface Props {
  user: User | null;
}

const filterBySearchText = (
  selectedTags: Tag[],
  searchText: string,
  allHacks: Hack[]
) => {
  return allHacks
    .filter(({ title }) => {
      return searchText === ""
        ? true
        : title.toLowerCase().includes(searchText.toLowerCase());
    })
    .filter(({ tags }) => {
      if (selectedTags.length === 0) {
        return true;
      }
      const filteredTags = tags.filter(
        (tagId) => selectedTags.findIndex(({ id }) => tagId === id) !== -1
      );

      return filteredTags.length !== 0;
    });
};

const sortByLikes = (ascending: boolean, hacks: Hack[]) =>
  hacks.sort((a, b) => {
    if (ascending) {
      return b.likes - a.likes;
    } else {
      return a.likes - b.likes;
    }
  });

const sortByDate = (ascending: boolean, hack: Hack[]) =>
  hack.sort((a, b) => {
    if (ascending) {
      return b.createdAt - a.createdAt;
    } else {
      return a.createdAt - b.createdAt;
    }
  });

const Hacks: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  const [allHacks, setAllHacks] = useState<Hack[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [likedAscending, setLikedAscending] = useState(true);
  const [createdAtAscending, setCreatedAtAscending] = useState(true);

  const errorHandler = useErrorHandler();

  async function getAllTags() {
    try {
      const tags = await getAllTagsAPI();
      invariant(tags, "no tags available");
      setAllTags(tags);
    } catch (error) /* istanbul ignore next */ {
      errorHandler(error);
    }
  }

  async function getAllHacks() {
    try {
      const hacks = await getAllHacksAPI();
      invariant(hacks, "no hacks available");
      setAllHacks(hacks);
    } catch (error) /* istanbul ignore next */ {
      errorHandler(error);
    }
  }

  useEffect(() => {
    async function fetch() {
      await getAllTags();
      await getAllHacks();
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggleLike = async (hackId: number) => {
    const hack = allHacks.find(({ id }) => id === hackId);

    invariant(hack, "unknown hack");

    if (!props.user) {
      navigate("/login", { state: { redirectTo: "/hacks" } });
      return;
    }

    const updatedHack = await updateHackAPI(hackId, props.user.id);

    /* istanbul ignore else */
    if (updatedHack?.status === 200) {
      await getAllHacks();
    }
  };

  const onTagSelect = (tag: Tag) => {
    if (selectedTags.length === 0) {
      setSelectedTags([tag]);
      return;
    }

    /** add the tag only if its not already present */
    if (!selectedTags.find(({ id }) => id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
      return;
    }
    /** if tag is present then remove it */
    setSelectedTags(selectedTags.filter(({ id }) => tag.id !== id));
  };

  const memoizedFilterHacks = useMemo(
    () => filterBySearchText(selectedTags, searchText, allHacks),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTags, searchText, allHacks]
  );
  const renderTag = (tag: Tag, index: number) => {
    const isTagSelected =
      selectedTags.findIndex(({ id }) => tag.id === id) !== -1;

    return (
      <span
        key={tag.id}
        data-testid={`tag-${index}`}
        onClick={() => onTagSelect(tag)}
        className={` whitespace-nowrap px-4 py-1 text-xs rounded-md ${
          isTagSelected
            ? "bg-slate-800 text-slate-100"
            : "bg-slate-200 text-gray-600"
        }`}
      >
        {tag.name}
      </span>
    );
  };

  const sortedHacksByLikes = useMemo(
    () => sortByLikes(likedAscending, memoizedFilterHacks),
    [likedAscending, memoizedFilterHacks]
  );

  const sortedHacksByCreatedAt = useMemo(
    () => sortByDate(createdAtAscending, sortedHacksByLikes),
    [createdAtAscending, sortedHacksByLikes]
  );

  return (
    <div className=" flex flex-col items-center">
      <div className=" grid w-full gap-2 mb-5">
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
        <div className="scrollbar-hide space-x-1 overflow-x-scroll">
          {allTags.map(renderTag)}
        </div>
      </div>
      <div className="flex w-full mb-2">
        <div
          id="mostLiked"
          className="hover:cursor-pointer border-slate-800 flex items-center px-2 space-x-2 border"
          onClick={() => setLikedAscending(!likedAscending)}
        >
          <span className="border-r-slate-800 text-sm md:text-base whitespace-nowrap pr-1 border">
            Most Liked
          </span>
          {likedAscending ? (
            <ArrowNarrowUpIcon className="w-5 h-5" />
          ) : (
            <ArrowNarrowDownIcon className="w-5 h-5" />
          )}
        </div>
        <div
          id="createdAt"
          className="hover:cursor-pointer border-slate-800 flex items-center px-2 space-x-2 border"
          onClick={() => setCreatedAtAscending(!createdAtAscending)}
        >
          <span className="border-r-slate-800 text-sm md:text-base whitespace-nowrap pr-1 border">
            Created At
          </span>
          {createdAtAscending ? (
            <ArrowNarrowUpIcon className="w-5 h-5" />
          ) : (
            <ArrowNarrowDownIcon className="w-5 h-5" />
          )}
        </div>
        {props.user && (
          <div className="flex self-end justify-end w-full">
            <Link id="addNewHack" to="/add">
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
        {sortedHacksByCreatedAt.length > 0 ? (
          sortedHacksByCreatedAt.map((hack) => {
            return (
              <Card
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
