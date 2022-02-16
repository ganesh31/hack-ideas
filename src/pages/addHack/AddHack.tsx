import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import invariant from "tiny-invariant";
import { addHackAPI } from "../../api/hack/hack";
import { getAllTagsAPI } from "../../api/tag/tag";
import MDEditor from "../../components/mdEditor/MDEditor";
import Textfield from "../../components/textfield/Textfield";
import { Hack } from "../../types/hack";
import { Tag } from "../../types/tag";
import { User } from "../../types/user";

interface Props {
  user: User;
}

function AddHack(props: Props) {
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [questionContent, setQuestionContent] = useState<string>("");

  const errorHandler = useErrorHandler();

  useEffect(() => {
    async function fetch() {
      try {
        const tags = await getAllTagsAPI();
        invariant(tags, "no tags available");
        setTags(tags);
      } catch (error) {
        errorHandler(error);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggleTag = ({ id, name }: Tag) => {
    const tag = selectedTags.find((tag) => tag.id === id);
    if (tag === undefined) {
      setSelectedTags([...selectedTags, { id, name }]);
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag.id !== id));
    }
  };

  const onSubmit = async () => {
    const payload: Omit<Hack, "id"> = {
      title,
      description,
      authorId: props.user.id,
      question: questionContent,
      tags: selectedTags.map(({ id }) => id),
      createdAt: new Date().getTime(),
      likes: 0,
      likedBy: [],
    };

    try {
      const hack = await addHackAPI(payload);

      if (hack?.id) {
        navigate("/hacks");
      }
    } catch (error) {
      errorHandler(error);
    }
  };

  const onCancel = () => {
    navigate("/hacks");
  };

  const disableSubmit =
    title === "" ||
    description === "" ||
    selectedTags.length === 0 ||
    questionContent === "";

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold">Add New Hack</h1>
      </header>
      <div className="space-y-3">
        <Textfield
          autoFocus
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
          placeholder="Title"
        />
        <Textfield
          name="description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          placeholder="Description"
        />
        <ul className="scrollbar-hide flex space-x-2 overflow-x-scroll">
          {tags.map(({ name, id }) => {
            const isActive =
              selectedTags.findIndex((tag) => tag.id === id) !== -1;
            return (
              <button
                id={`tag-${id}`}
                tabIndex={0}
                className={`flex text-slate-900 focus:outline-slate-500 focus:ring-slate-500 justify-center items-center text-xs font-medium md:text-sm md:font-normal px-3 py-1 rounded-full space-x-1 whitespace-nowrap border bg-slate-50  hover:cursor-pointer ${
                  isActive
                    ? "border-2 border-slate-600 bg-slate-300 font-semibold"
                    : "border-slate-300 italic"
                } `}
                key={id}
                onClick={() => onToggleTag({ id, name })}
                onChange={() => onToggleTag({ id, name })}
              >
                <span>{name}</span>
                {isActive ? (
                  <MinusCircleIcon className="w-5 h-5" />
                ) : (
                  <PlusCircleIcon className="w-5 h-5" />
                )}
              </button>
            );
          })}
        </ul>
        <div className="h-3/6">
          <MDEditor
            label="Question"
            initialContent={questionContent}
            onChange={setQuestionContent}
          />
        </div>
      </div>
      <footer className="flex justify-between">
        <button
          onClick={onCancel}
          className="shadow-slate-400 md:w-1/6 text-slate-800 bg-slate-100 active:bg-slate-100 hover:bg-slate-300 w-2/6 py-2 border rounded shadow-sm"
        >
          Cancel
        </button>
        <button
          id="submit"
          className="shadow-slate-400 md:w-1/6 disabled:bg-slate-500 text-slate-50 active:bg-slate-800 hover:bg-slate-600 bg-slate-800 w-2/6 py-2 border rounded shadow-sm"
          onClick={onSubmit}
          disabled={disableSubmit}
        >
          Submit
        </button>
      </footer>
    </section>
  );
}
export default AddHack;
