import { ThumbUpIcon } from "@heroicons/react/outline";
import invariant from "tiny-invariant";
import { Hack } from "../../types/hack";
import { Tag } from "../../types/tag";

interface Props {
  hack: Hack;
  onToggleLike: (hackId: number) => void;
  allTags: Tag[];
}

/**
 *
 * @param date time in milliseconds
 * @returns formatted date
 */
function dateToString(date: number): string {
  return new Date(date).toDateString();
}

function Card({ hack, onToggleLike, allTags }: Props) {
  return (
    <div className="group border-slate-800 hover:bg-slate-200 bg-slate-50 text-slate-800 hover:cursor-pointer min-w-[350px] sm:min-w-sm p-4 space-y-1 border rounded shadow">
      <div className="flex justify-between">
        <div className="text-lg font-bold">{hack.title}</div>
        <div className="flex space-x-1">
          <span data-testid="likes-count">{hack.likes || ""}</span>
          <ThumbUpIcon
            data-testid={"button-like"}
            onClick={() => onToggleLike(hack.id)}
            className={`${hack.likes !== 0 ? "text-red-600" : ""} w-5 h-5`}
          />
        </div>
      </div>
      <p className="text-ellipsis whitespace-nowrap overflow-hidden">
        {hack.description}
      </p>
      <div className="group-hover:opacity-100 flex justify-between text-sm transition duration-300 ease-in-out opacity-0">
        <span>
          <i>{dateToString(hack.createdAt)}</i>
        </span>
      </div>
      <div className="space-x-1 overflow-hidden">
        {allTags.length !== 0 &&
          hack.tags.map((id) => {
            const tag = allTags.find((tag) => tag.id === id);
            invariant(tag, "unknown tag");
            return <TagItem name={tag.name} key={id} />;
          })}
      </div>
    </div>
  );
}
function TagItem({ name }: { name: string }) {
  return (
    <span className="bg-slate-200 group-hover:bg-slate-50 whitespace-nowrap px-4 py-1 text-xs text-gray-600 rounded-md">
      {name}
    </span>
  );
}
export default Card;
