import { useEffect, useState } from "react";
import useUsers from "../../hooks/useUsers";
import Input from "./Input";
import { MagnifyingGlass, Plus, X } from "@phosphor-icons/react";
import { mergeClassNames } from "../../lib/utils/StyleHelper";
import { useDebouncedCallback } from "use-debounce";
import useSearchUser from "../../hooks/useSearchUser";
import SmallUserCard from "./SmallUserCard";
import { AnimatePresence, motion } from "motion/react";
import { User } from "../../lib/types/Types";

const dropIn = {
  hidden: {
    y: -20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 30,
      stiffness: 400,
    },
  },
};

export default function Members({
  onMembersChange,
  members,
}: {
  onMembersChange: (member: string) => void;
  members: string[];
}) {
  //members
  const { data: usersData } = useUsers(members);
  const [displayedMembers, setDisplayedMembers] = useState<User[] | []>(
    usersData || []
  );
  //modal
  const [modal, setModal] = useState(false);
  //debaunce and input
  const [inputValue, setInputValue] = useState("");
  const debounce = useDebouncedCallback((value) => {
    setSearchQuery(value);
  }, 500);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchData } = useSearchUser(searchQuery);
  const [searchResults, setSearchResults] = useState(searchData || []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    debounce(value);
    if (!value) {
      setSearchResults([]);
    }
  };

  const removeMember = (user: User) => {
    onMembersChange(user.userId);
    const index = displayedMembers.findIndex(
      (member) => member.userId === user.userId
    );
    setDisplayedMembers((prev) => {
      const membersCopy = [...prev];
      membersCopy.splice(index, 1);
      return membersCopy;
    });
    setInputValue("");
  };

  const handleAddMember = (user: User) => {
    if (members.includes(user.userId)) return;

    onMembersChange(user.userId);

    const filteredSearchResults = searchResults.filter(
      (result) => result.userId !== user.userId
    );
    setSearchResults(filteredSearchResults);
    setDisplayedMembers((prev) => [...prev, user]);
    setInputValue("");
  };

  useEffect(() => {
    if (searchQuery && searchData) {
      setSearchResults(searchData);
    }
  }, [searchQuery, searchData]);

  return (
    <>
      <div className="relative flex gap-1 h-fit">
        {displayedMembers?.map((user) => (
          <div
            className="h-9 w-9 rounded-full overflow-hidden"
            key={user.userId}
          >
            <img src={user.photoURL} className="w-full h-full object-cover" />
          </div>
        ))}
        <button
          className={mergeClassNames(
            "h-9 w-9 rounded-full flex items-center justify-center text-primary-700 bg-primary-200 hover:opacity-75 transition-all duration-300",
            modal && "ring-2 ring-primary-400"
          )}
          onClick={() => setModal(!modal)}
        >
          <Plus size={20} weight="bold" />
        </button>
        <AnimatePresence>
          {modal && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropIn}
              className="absolute z-20 top-full  mt-1 flex flex-col gap-1 bg-white shadow-lg border-2 border-neutral-200 p-4 pb-7 rounded-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <label className="text-md">Members</label>
                <span
                  className="rounded-full transition-all duration-300 p-1 hover:bg-neutral-200 hover:cursor-pointer"
                  onClick={() => setModal(false)}
                >
                  <X size={25} />
                </span>
              </div>
              <Input
                value={inputValue}
                onChange={handleSearch}
                placeholder="Add members by email"
                Icon={<MagnifyingGlass size={20} />}
                className="drop-shadow-none w-[300px] bg-white"
              />
              {searchResults && searchResults?.length > 0 ? (
                <div className="flex flex-col gap-2 pt-3 pl-1">
                  {searchResults.map((user) => (
                    <SmallUserCard
                      user={user}
                      handleClick={handleAddMember}
                      handleRemoveMember={removeMember}
                      isMember={members.includes(user.userId)}
                      key={user.userId}
                    />
                  ))}
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {modal && (
        <div
          className="fixed w-full h-screen"
          onClick={() => setModal(false)}
        ></div>
      )}
    </>
  );
}
